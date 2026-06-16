const path = require('path')
const fs = require('fs-extra')
const { execSync } = require('child_process')

const {
  loadBaseSchema,
  addAllowAllComponentsDefToSchema,
} = require('@vtex/cli-plugin-content/build/modules/schemas')
const {
  sendToRegistry,
  fetchSchemaVersionsForSchema,
} = require('@vtex/cli-plugin-content/build/modules/registry')
const {
  suggestNextMinorVersion,
  buildVersionedSchemaId,
  parseStrictSemver,
  maxSemverFromTuples,
} = require('@vtex/cli-plugin-content/build/modules/versioning')

const BASE_PATH = process.cwd()
const COMPONENTS_PATH = path.join(BASE_PATH, 'cms', 'larplasticos', 'components')
const CONTENT_TYPES_PATH = path.join(BASE_PATH, 'cms', 'larplasticos', 'pages')
const BASE_SCHEMA_PATH = path.join(BASE_PATH, '.faststore', 'cms', 'faststore', 'schema.json')

function readJsonFiles(dir, regex) {
  const results = {}
  if (!fs.existsSync(dir)) return results

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isFile() && regex.test(entry.name)) {
      const filePath = path.join(dir, entry.name)
      const content = fs.readFileSync(filePath, 'utf8')
      try {
        const parsed = JSON.parse(content)
        const key = parsed.$componentKey
        if (key) {
          results[key] = parsed
        }
      } catch (e) {
        console.error(`Error parsing ${filePath}: ${e.message}`)
      }
    }
  }
  return results
}

async function main() {
  const token = execSync('vtex local token', { encoding: 'utf8' }).trim()
  const account = 'larplasticos'
  const storeId = 'larplasticosfs'

  if (!fs.existsSync(BASE_SCHEMA_PATH)) {
    console.error('Base schema not found. Run "yarn faststore cms-sync --dry-run" first.')
    process.exit(1)
  }

  console.log('Generating full schema...')

  const baseSchema = await loadBaseSchema(null, BASE_SCHEMA_PATH, { token })

  const customComponents = readJsonFiles(COMPONENTS_PATH, /^cms_component__.*\.json$/)
  const customContentTypes = readJsonFiles(CONTENT_TYPES_PATH, /^cms_content_type__.*\.json$/)

  console.log('Custom components:', Object.keys(customComponents))
  console.log('Custom content types:', Object.keys(customContentTypes))

  const mergedSchema = {
    ...baseSchema,
    components: {
      ...baseSchema.components,
      ...customComponents,
    },
    'content-types': {
      ...baseSchema['content-types'],
      ...customContentTypes,
    },
  }

  const schema = addAllowAllComponentsDefToSchema(mergedSchema)

  const schemaPath = path.join(BASE_PATH, 'cms_schema.json')
  fs.writeJsonSync(schemaPath, schema, { spaces: 2 })
  console.log('Schema saved to cms_schema.json')

  const baseSchemaId = `${account}.${storeId}`
  const versionsResult = await fetchSchemaVersionsForSchema(baseSchemaId, { token })

  let latestPublished
  if (versionsResult.ok) {
    const existingVersionTuples = versionsResult.versions.map((row) => ({
      major: row.major,
      minor: row.minor,
      patch: row.patch,
    }))
    latestPublished = maxSemverFromTuples(existingVersionTuples)
  }

  const suggestedVersion = suggestNextMinorVersion(latestPublished)
  const parsedChosen = parseStrictSemver(suggestedVersion)
  const chosenVersion = `${parsedChosen.major}.${parsedChosen.minor}.${parsedChosen.patch}`

  console.log(`Publishing version: ${chosenVersion}`)

  schema.$id = buildVersionedSchemaId(account, storeId, chosenVersion)

  await sendToRegistry(schema, { token, yes: true })
  console.log('Schema published successfully!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

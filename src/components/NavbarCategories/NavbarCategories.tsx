'use client'

import { useRouter } from 'next/router'
import Link from 'next/link'

interface CategoryLink {
  text: string
  url: string
}

interface NavbarCategoriesProps {
  title?: string
  categories: CategoryLink[]
}

function NavbarCategories({ title, categories }: NavbarCategoriesProps) {
  const router = useRouter()

  if (!categories || categories.length === 0) return null

  return (
    <section className="section section-navbar-categories" data-fs-navbar-categories>
      <div data-fs-navbar-links-wrapper data-fs-content="navbar">
        {title && (
          <h2
            style={{
              fontSize: 'var(--fs-text-size-3)',
              fontWeight: 'var(--fs-text-weight-bold)',
              color: 'var(--fs-color-text-light)',
              whiteSpace: 'nowrap',
              margin: 0,
            }}
          >
            {title}
          </h2>
        )}
        <ul data-fs-navbar-links-list>
          {categories.map(({ url, text }) => (
            <li key={text} data-fs-navbar-links-list-item>
              <Link
                href={router.asPath.includes(url) ? '#' : url}
                prefetch={false}
                style={{
                  display: 'block',
                  padding: 'var(--fs-spacing-1) var(--fs-spacing-2)',
                  color: 'var(--fs-color-link)',
                  textDecoration: 'none',
                  fontSize: 'var(--fs-text-size-2)',
                  fontWeight: 'var(--fs-text-weight-regular)',
                  whiteSpace: 'nowrap',
                  transition: 'color var(--fs-transition-timing) var(--fs-transition-function)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--fs-color-link-hover)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--fs-color-link)'
                }}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

NavbarCategories.displayName = 'NavbarCategories'
export default NavbarCategories

import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import type { ClientManyProductsQueryQueryVariables } from '@generated/graphql'
import ProductCard from 'src/components/product/ProductCard'
import ProductTilesSkeleton from 'src/components/skeletons/ProductTilesSkeleton'
import Tiles, { Tile } from 'src/components/ui/Tiles'
import { useViewItemListEvent } from 'src/sdk/analytics/hooks/useViewItemListEvent'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'

import Section from 'src/components/sections/Section'

import deepmerge from 'deepmerge'
import { useDeliveryPromiseGlobalFacets } from 'src/sdk/deliveryPromise/useDeliveryPromiseFacets'
import { toArray } from 'src/utils/utilities'
import styles from './ProductTiles.module.scss'

interface ProductTilesProps
  extends Partial<ClientManyProductsQueryQueryVariables> {
  title: string
  taxesConfiguration?: {
    usePriceWithTaxes?: boolean
    taxesLabel?: string
  }
}

// Adjust aspect ratios for the cards in our layout
const getRatio = (products: number, idx: number) => {
  if (idx === 0) {
    // Tall vertical card for the left column
    return 4 / 5
  }
  // Horizontal-ish aspect ratio for the right stacked cards
  return 4 / 3
}

// Adjust sizes for the cards
const getSizes = (products: number, idx: number) => {
  if (idx === 0) {
    return {
      width: 580,
      height: 725,
    }
  }
  return {
    width: 440,
    height: 330,
  }
}

const ProductTiles = ({
  title,
  taxesConfiguration,
  ...variables
}: ProductTilesProps) => {
  const viewedOnce = useRef(false)
  const { ref, inView } = useInView()
  const { globalDeliveryFacets } = useDeliveryPromiseGlobalFacets()

  const data = useProductsQuery({
    ...variables,
    selectedFacets: deepmerge(
      toArray(variables.selectedFacets),
      globalDeliveryFacets
    ),
  })
  const products = data?.search?.products
  const productEdges = products?.edges ?? []

  const { sendViewItemListEvent } = useViewItemListEvent({
    products: productEdges,
    title,
    page: 0,
    pageSize: 0,
  })

  useEffect(() => {
    if (inView && !viewedOnce.current && productEdges.length) {
      sendViewItemListEvent()
      viewedOnce.current = true
    }
  }, [inView, productEdges.length, sendViewItemListEvent])

  if (products?.edges.length === 0) {
    return null
  }

  return (
    <Section
      className={`${styles.section} section-product-tiles layout__section`}
      ref={ref}
    >
      <h2 className="text__title-section layout__content">{title}</h2>
      <ProductTilesSkeleton loading={!products}>
        <Tiles>
          {productEdges.map((product, idx) => (
            <Tile key={product.node.id}>
              <ProductCard
                data-testid="tile-card"
                product={product.node}
                index={idx + 1}
                variant="wide"
                aspectRatio={getRatio(productEdges.length, idx)}
                imgProps={getSizes(productEdges.length, idx)}
                taxesConfiguration={taxesConfiguration}
              />
            </Tile>
          ))}
        </Tiles>
      </ProductTilesSkeleton>
    </Section>
  )
}

ProductTiles.displayName = 'ProductTiles'

export default ProductTiles

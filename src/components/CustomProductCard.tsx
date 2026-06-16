import { memo, useState } from 'react'
import {
  Button as UIButton,
  Icon,
  ProductCard as UIProductCard,
  ProductCardContent as UIProductCardContent,
  ProductCardImage as UIProductCardImage,
  QuantitySelector,
} from '@faststore/ui'
import Image from 'next/image'
import NextLink from 'next/link'
import {
  useBuyButton_unstable,
  useFormattedPrice_unstable,
  useProductLink_unstable,
} from '@faststore/core/experimental'

import '@faststore/ui/src/components/molecules/QuantitySelector/styles.scss'

function CustomProductCard({ product, index, ...otherProps }: any) {
  const [quantity, setQuantity] = useState(1)

  const linkProps = {
    ...useProductLink_unstable({ product, selectedOffer: 0, index }),
    as: NextLink,
    passHref: true,
    legacyBehavior: false,
    prefetch: false,
  }

  const {
    id,
    sku,
    gtin,
    brand,
    isVariantOf,
    isVariantOf: { name },
    unitMultiplier,
    image,
    offers,
    additionalProperty,
  } = product

  const [img] = image
  const [offer] = offers.offers

  const buyProps = useBuyButton_unstable(
    {
      id,
      price: offer.price,
      priceWithTaxes: offer.priceWithTaxes,
      listPrice: offer.listPrice,
      listPriceWithTaxes: offer.listPriceWithTaxes,
      seller: offer.seller,
      quantity,
      itemOffered: {
        sku,
        name,
        gtin,
        image: [img],
        brand,
        isVariantOf,
        additionalProperty,
        unitMultiplier,
      },
    },
    true
  )

  const outOfStock = offer.availability !== 'https://schema.org/InStock'
  const spotPrice = offers.lowPrice
  const listPrice = offer.listPrice
  const hasDiscount = spotPrice <= listPrice

  return (
    <UIProductCard
      outOfStock={outOfStock}
      bordered={otherProps.bordered ?? true}
      variant="default"
      data-fs-product-card-sku={sku}
    >
      <UIProductCardImage aspectRatio={otherProps.aspectRatio ?? 1}>
        <Image
          src={img.url}
          alt={img.alternateName}
          width={otherProps.imgProps?.width ?? 360}
          height={Math.round(
            (Number(otherProps.imgProps?.height) || 360) /
              (otherProps.aspectRatio ?? 1)
          )}
          sizes={
            otherProps.imgProps?.sizes ??
            '(max-width: 768px) 40vw, 30vw'
          }
        />
      </UIProductCardImage>
      <UIProductCardContent
        title={name}
        price={{
          value: spotPrice,
          listPrice: listPrice,
          formatter: useFormattedPrice_unstable as any,
        }}
        outOfStock={outOfStock}
        linkProps={linkProps}
        showDiscountBadge={
          hasDiscount && (otherProps.showDiscountBadge ?? true)
        }
      />
      {!outOfStock && (
        <div data-fs-product-card-actions>
          <QuantitySelector
            min={1}
            initial={1}
            max={offer.quantity}
            onChange={(value) => setQuantity(value)}
          />
          <UIButton
            variant="primary"
            size="small"
            icon={<Icon name="ShoppingCart" />}
            iconPosition="left"
            onClick={(...args: any[]) => (buyProps.onClick as any)(...args)}
          >
            Comprar
          </UIButton>
        </div>
      )}
    </UIProductCard>
  )
}

export default memo(CustomProductCard)

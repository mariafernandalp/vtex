import { ProductShelfSection, getOverriddenSection } from '@faststore/core'
import CustomProductCard from '../CustomProductCard'

const ProductShelfWithButton = getOverriddenSection({
  Section: ProductShelfSection,
  components: {
    __experimentalProductCard: { Component: CustomProductCard },
  },
})

export default ProductShelfWithButton

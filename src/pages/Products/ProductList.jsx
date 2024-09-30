import React from 'react'
import ProductTable from '../../components/product/ProductList'
const isLargeScreen = window.innerWidth > 1024

function ProductList() {
  return (
    <>
      <ProductTable isLargeScreen={isLargeScreen}/>
    </>
  )
}

export default ProductList
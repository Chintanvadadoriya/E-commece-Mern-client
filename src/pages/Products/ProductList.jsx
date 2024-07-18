import React from 'react'
import ProductTable from '../../components/product/ProductList'
const isLargeScreen = window.innerWidth > 1024

function ProductList() {
  return (
    <div>
      <ProductTable isLargeScreen={isLargeScreen}/>
    </div>
  )
}

export default ProductList
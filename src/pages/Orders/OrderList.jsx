import React from 'react'
import OrderData from '../../components/order/OrderList'
const isLargeScreen = window.innerWidth > 1024

function OrderList() {
  return (
    <>
    <OrderData isLargeScreen={isLargeScreen}/>
    </>
  )
}

export default OrderList
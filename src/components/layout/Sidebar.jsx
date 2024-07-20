import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCloseCircle, AiOutlineDown } from "react-icons/ai"; // Import down arrow icon

const Sidebar = ({ toggleSidebar, isOpen, setIsOpen }) => {
    const [productsOpen, setProductsOpen] = useState(false);
    const [ordersOpen, setOrdersOpen] = useState(false);
    const [couponCodeOpen, setCouponCodeOpen] = useState(false);


    const toggleProducts = () => {
        setProductsOpen(!productsOpen);
        if (ordersOpen) setOrdersOpen(false);
        if(couponCodeOpen) setCouponCodeOpen(false)
    };

    const toggleOrders = () => {
        setOrdersOpen(!ordersOpen);
        if (productsOpen) setProductsOpen(false);
        if(couponCodeOpen) setCouponCodeOpen(false)

    };
    const toggleCouponCodeOpen = () => {
        setCouponCodeOpen(!couponCodeOpen);
        if (productsOpen) setProductsOpen(false);
        if (ordersOpen) setOrdersOpen(false);

    };


    return (
        <aside className={`bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-0'} fixed h-full top-0 left-0 overflow-y-auto transition-all duration-300 ease-in-out z-50`}>
          <div className='flex justify-end'>
            {isOpen && <AiFillCloseCircle className="w-8 h-8 inline-block ml-2 mt-2 cursor-pointer" onClick={toggleSidebar} />}
          </div>
            <div className="p-4 pt-11 pl-10">
                <Link to="/dashboard" className="block mb-4">Dashboard</Link>
                
                <div className="mb-4">
                    <div className="flex justify-between items-center cursor-pointer" onClick={toggleProducts}>
                        <span className="block">Products</span>
                        <AiOutlineDown className={`ml-1 ${productsOpen ? 'transform rotate-180' : ''}`} />
                    </div>
                    {productsOpen && (
                        <div className="mt-4 pl-4">
                            <Link to="/products-list" className="block mb-3">Products List</Link>
                            <Link to="/products-create" className="block mb-3">Product Create</Link>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <div className="flex justify-between items-center cursor-pointer" onClick={toggleOrders}>
                        <span className="block">Orders</span>
                        <AiOutlineDown className={`ml-1 ${ordersOpen ? 'transform rotate-180' : ''}`} />
                    </div>
                    {ordersOpen && (
                        <div className="mt-4 pl-4">
                            <Link to="/order-list" className="block mb-3">Order List</Link>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <div className="flex justify-between items-center cursor-pointer" onClick={toggleCouponCodeOpen}>
                        <span className="block">Coupon Code</span>
                        <AiOutlineDown className={`ml-1 ${ordersOpen ? 'transform rotate-180' : ''}`} />
                    </div>
                    {couponCodeOpen && (
                        <div className="mt-4 pl-4">
                            <Link to="/create-code" className="block mb-3">Create Coupon-code</Link>
                            <Link to="/coupon-list" className="block mb-3">Coupon-code List</Link>

                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

// import '../../index.css'
const SummaryCards = ({ totalSales, totalOrders, totalProducts, newCustomers }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card">
        <h2 className="card-header">Total Sales</h2>
        <p className="text-2xl">₹: {totalSales}</p>
      </div>
      <div className="card">
        <h2 className="card-header">Total Orders</h2>
        <p className="text-2xl">{totalOrders}</p>
      </div>
      <div className="card">
        <h2 className="card-header">Total Products</h2>
        <p className="text-2xl">{totalProducts}</p>
      </div>
      <div className="card">
        <h2 className="card-header">New Customers</h2>
        <p className="text-2xl">{newCustomers}</p>
      </div>
    </div>
  );
};

export default SummaryCards;

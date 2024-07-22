

export const CheckActiveOrNot = (data) => {
  let result
  result = data === 'true' ? <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Active</span> :
    <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">InActive</span>
  return result
}


export const CheckPaymentPaidOrNOtClass = (data) => {
  let result
  result = data === 'true' ? <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">True</span> :
    <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">False</span>
  return result
}

export function formatDate(timestamp) {
  const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const getStatusColor = (status) => {
  switch (status) {
    case 'ordered':
      return 'text-blue-500';
    case 'pending':
      return 'text-yellow-500';
    case 'processing':
      return 'text-indigo-500';
    case 'shipped':
      return 'text-purple-500';
    case 'delivered':
      return 'text-green-500';
    case 'canceled':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export const productdata = {
  "ratingsCount": {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0
  },
  "_id": "668cde8c0ee8dfe0c3630cfd",
  "email": "logisticworkit@gmail.com",
  "name": "Superfast Laptop",
  "description": "A high-performance laptop suitable for all your computing needs.",
  "price": 20000,
  "category": "Electronics",
  "subCategory": "Computers",
  "company": "TechCorp",
  "stock": 50,
  "images": "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/c/1/w/s151-laptop-ultimus-original-imagkv7pjzfdh8mc.jpeg?q=70",
  "tags": [
    "laptop",
    "high-performance",
    "tech"
  ],
  "specifications": [
    {
      "name": "Processor",
      "details": [
        "Intel i7",
        "3.5 GHz"
      ]
    },
    {
      "name": "RAM",
      "details": [
        "16GB",
        "DDR4"
      ]
    },
    {
      "name": "Storage",
      "details": [
        "512GB SSD"
      ]
    },
    {
      "name": "Battery",
      "details": [
        "10 hours"
      ]
    }
  ],
  "AvailableOffers": [
    "10% off on your first purchase",
    "Free shipping on orders over $500"
  ],
  "likesCount": 0,
  "dislikesCount": 0,
  "totalRating": 0,
  "numberOfReviews": 0,
  "averageRating": 0,
  "createdAt": "2024-07-09T06:54:04.278Z",
  "updatedAt": "2024-07-09T06:54:04.278Z",
  "__v": 0
}


export const BackButton = ({back}) => {
  return (
    <>
      <div onClick={back} className='cursor-pointer inline-flex items-center space-x-1 p-2 bg-black hover:bg-blue-500 rounded-lg'>
        <div>
          <svg className="text-white w-9 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
          </svg>
        </div>
        <p className="text-white text-gray-800 dark:text-white font-medium">Back</p>
      </div>
    </>
  )
}
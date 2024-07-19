

export const CheckActiveOrNot = (data) => {
    let result
    result = data === 'true' ? <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">True</span> :
        <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">False</span>
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


export function Edite({openModal}) {
    return (
        <button onClick={openModal} className="mr-2 inline-block px-3 py-1 text-sm leading-normal text-blue-600 dark:text-blue-500 bg-transparent border border-blue-600 dark:border-blue-500 rounded-md cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition duration-300 ease-in-out">Edit</button>
    )
}

export function EditeAdmin({openModal}) {
    return (
        <button onClick={openModal} className="mr-2 inline-block px-3 py-1 text-sm leading-normal text-blue-600 dark:text-blue-500 bg-transparent border border-blue-600 dark:border-blue-500 rounded-md cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition duration-300 ease-in-out">Edit</button>
    )
}

export function EditeProduct({updateProduct,id}) {
    return (
        <button onClick={()=>updateProduct(id)} className="mr-2 inline-block px-3 py-1 text-sm leading-normal text-blue-600 dark:text-blue-500 bg-transparent border border-blue-600 dark:border-blue-500 rounded-md cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition duration-300 ease-in-out">Edit</button>
    )
}

export function Delete({openModal,openDeleteModal}) {
    return (
        <button onClick={openModal || openDeleteModal} className="inline-block px-3 py-1 text-sm leading-normal text-red-600 dark:text-red-500 bg-transparent border border-red-600 dark:border-red-500 rounded-md cursor-pointer hover:bg-red-600 dark:hover:bg-red-500 hover:text-white dark:hover:text-white transition duration-300 ease-in-out">Remove</button>
    )
}

export function Cancel({close}) {
    return (
        <button onClick={close} id="closeModal" type="button" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">Cancel</button>
    )
}


export function Update({Update}) {
    return (
        <button type="button" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">{Update}</button>
    )
}
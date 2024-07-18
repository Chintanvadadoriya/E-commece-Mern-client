

export function Edite() {
    return (
        <a href="/" className="mr-2 inline-block px-3 py-1 text-sm leading-normal text-blue-600 dark:text-blue-500 bg-transparent border border-blue-600 dark:border-blue-500 rounded-md cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition duration-300 ease-in-out">Edit</a>
    )
}

export function Delete() {
    return (
        <a href="/" className="inline-block px-3 py-1 text-sm leading-normal text-red-600 dark:text-red-500 bg-transparent border border-red-600 dark:border-red-500 rounded-md cursor-pointer hover:bg-red-600 dark:hover:bg-red-500 hover:text-white dark:hover:text-white transition duration-300 ease-in-out">Remove</a>
    )
}
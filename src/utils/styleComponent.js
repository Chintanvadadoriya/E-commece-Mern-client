import { Message} from 'rsuite';

export const BackButton = ({ back }) => {
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

export const CheckPaymentPaidOrNOtClass = (data) => {
  let result
  result = data === 'true' ? <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">True</span> :
    <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">False</span>
  return result
}


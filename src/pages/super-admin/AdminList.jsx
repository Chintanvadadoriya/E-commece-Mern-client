import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchItem from '../../components/common/SearchItem';
import { CheckActiveOrNot, formatDate } from '../../utils/helpers';
import { Delete, EditeAdmin } from '../../components/common/Button';
import ModelAdminUpdate from '../../components/common/ModelAdminUpdate';
import DeleteModel from '../../components/common/DeleteModel';
import { AdminDetails, fetchAdmins } from '../../redux/adminSlice'; // Adjust the path
import { UserData } from '../../redux/authSlice';
import useDebounce from '../../hook/useDebounce';
import { adminUpdateApi } from '../../services/authService';
import { getAuthHeader } from '../../constant';
import useToast from '../../hook/useToaster';
import Loader from '../../components/Loader';

const AdminListTable = () => {
    const dispatch = useDispatch();
    const showToast = useToast();
    const { data, status, error, totalPages, totalCount, currentCount } = useSelector(AdminDetails);
    const { token } = useSelector(UserData);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5); // Default limit set to 10
    const [name, setName] = useState('');


    const debouncedSearchQuery = useDebounce(searchQuery, 500);


    useEffect(() => {
        dispatch(fetchAdmins({ searchQuery: debouncedSearchQuery, page, limit, name, token }));
    }, [dispatch, page, limit, name, token, debouncedSearchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        console.log('Search Admin', e.target.value)
        setPage(1); // Reset to first page on new search
    };

    const handleLimitChange = (e) => {
        setLimit(parseInt(e.target.value));
        setPage(1); // Reset to first page on new limit
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const isLargeScreen = window.innerWidth > 1024;
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [adminId, setAdminId] = useState();


    const openModal = (admin) => {
        setAdminId(admin);
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);


    const handleUpdateAdmin = async (AdminData) => {
        try {
            let { data, status } = await adminUpdateApi(AdminData, getAuthHeader(token))
            if (status === 200) {
                showToast('success', `${data}`);
                dispatch(fetchAdmins({ searchQuery: debouncedSearchQuery, page, limit, name, token }))
                closeModal()
            } else {
                showToast('error', `${data}`);
            }
        } catch (error) {
            showToast('error', `something went wrong!`);
            console.log('error', error)
        }
    };

    return (
        <div className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}>
            <h1 className="text-2xl font-semibold mb-6 flex justify-center mb-10">Admin List</h1>
            <div className='mb-4 flex justify-between'>
                <SearchItem handleSearch={handleSearch} />
                <div>
                    <label htmlFor="limit" className="mb-1 block text-sm font-medium text-gray-700">
                        Items per page:
                    </label>
                    <select
                        id="limit"
                        name="limit"
                        value={limit}
                        onChange={handleLimitChange}
                        className="block w-[100%] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>

            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Is Verified
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Is Active / Is Blocked
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Credet Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length === 0 && status !== 'loading' &&(
                            <tr>
                                <td colSpan="6" className="text-center p-5 text-sm text-gray-500">No Data Found!</td>
                            </tr>
                        )}
                        {status === 'loading' && (
                            <tr>
                                <td colSpan="6" className="text-center p-5 text-sm text-gray-500"><Loader/></td>
                            </tr>
                        )}
                        {status === 'failed' && (
                            <tr>
                                <td colSpan="6" className="text-center p-5 text-sm text-red-500">Error: {error}</td>
                            </tr>
                        )}
                        {status === 'succeeded' && data.map((admin, index) => (
                            <tr key={admin?._id + index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {admin.name}
                                </th>
                                <td className="px-6 py-4">
                                    {admin.email}
                                </td>
                                <td className={`px-6 py-4 ${admin.isVerified ? "text-green-500" : "text-rose-600"} `}>
                                    {admin.isVerified ? 'Yes' : 'No'}
                                </td>
                                <td className={`px-6 py-4 ${!admin.isBlock ? "text-green-500" : "text-rose-600"} `}>
                                    {admin.isBlock ? 'in Active' : 'Active'}
                                </td>
                                <td className={`px-6 py-4 ${admin.totalPaidAmount > 0 ? "text-green-500" : "text-rose-600"} `}>
                                    {admin.totalPaidAmount}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex">
                                        <EditeAdmin openModal={() => openModal(admin)} />
                                        <Delete openDeleteModal={openDeleteModal} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">{(page - 1) * limit + 1}-{Math.min(page * limit, currentCount)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{currentCount}</span>
                    </span>
                    <span>Total Admin :  <strong>{totalCount}</strong> </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`flex items-center justify-center px-3 h-8 leading-tight ${page === index + 1 ? 'text-blue-600 border border-gray-300 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <ModelAdminUpdate isOpen={isModalOpen} close={closeModal} adminId={adminId} onUpdate={handleUpdateAdmin} />
            <DeleteModel type='adminModel' isOpen={isDeleteModalOpen} close={closeDeleteModal} />
        </div>
    );
};

export default AdminListTable;

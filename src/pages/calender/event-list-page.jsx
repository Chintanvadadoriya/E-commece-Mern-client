import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getAllEventDataService,
  deleteEventDataService,
} from '../../services/authService'; // Assuming these services are defined
import { UserData } from '../../redux/authSlice';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import useToast from '../../hook/useToaster';
const isLargeScreen = window.innerWidth > 1024;

const EventListPage = () => {
  const { user } = useSelector(UserData);
  const showToast = useToast();

  const [data, setData] = useState([]); // Store the fetched data
  const [page, setPage] = useState(1); // Start with page 0
  const [hasMore, setHasMore] = useState(true); // Set whether more data is available
  const [loading, setLoading] = useState(false); // Prevent multiple fetches at once
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering



// Refactored function to fetch data on page 0 after deletion
    const fetchInitialData = async () => {
      setLoading(true); // Set loading to true to prevent multiple requests

      try {
        const payload = {
          email: user?.email,
          searchTerm: searchTerm, // Include searchTerm in the payload
        };

        const response = await getAllEventDataService(payload, 0, 5); // Fetch first page
        const newItems = response.data;

        // Set new data
        setData(newItems);

        // If there are fewer items than expected, set hasMore to false
        if (newItems.length < 5) {
          setHasMore(false);
        } else {
          setHasMore(true); // There may be more data to load
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setHasMore(false); // Stop fetching more data on error
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };


  // Fetch data function based on the page number and searchTerm
 const fetchMoreData = async () => {
 
    if (loading) return; // Prevent fetching if already loading data

    setLoading(true); // Set loading to true while data is being fetched

    try {
      const payload = {
        email: user?.email,
        searchTerm: searchTerm, // Include searchTerm in the payload
      };

      // Call your service function to get data
      const response = await getAllEventDataService(payload, page, 5);
      const newItems = response.data;

      // Append the new items to the data array
      setData((prevData) => [...prevData, ...newItems]);

      // If no more items, stop loading more
      if (newItems.length === 0 || newItems.length < 5) {
        setHasMore(false);
      }
      setPage((prevPage) => prevPage + 1);
     
    } catch (error) {
      console.error('Error fetching data:', error);
      setHasMore(false);
    }

    setLoading(false); // Reset loading state after data is fetched
  };

  // Handle search input with debounce to avoid too many API calls while typing
  const handleSearch = debounce((value) => {
    setSearchTerm(value);
    setPage(0); // Reset pagination when searching
    setData([]); // Clear existing data
    setHasMore(true); // Allow loading of more data
    fetchMoreData(); // Fetch the first page of filtered results
  }, 500); // Adjust debounce delay as needed (500ms here)

  // Edit event (placeholder logic)
  const handleEdit = (event) => {
    console.log('Edit event:', event);

  };

  // Delete event (placeholder logic)
  const handleDelete = async (eventId) => {
    try {
    let { msg ,status} = await deleteEventDataService({ id: eventId });
    if(status===200){
      showToast('success', `${msg}`);
      // Reset page and data, and refetch from the first page
      setData([]); // Clear existing data
      setPage(1);
      setHasMore(true); // Allow loading of more data
      fetchInitialData(); // Fetch the first page of data
    }
    } catch (error) {
      console.error('Error deleting event:', error);
       showToast('error', `${error.message}`);
    }
  };

  // Call fetchMoreData initially to load the first page of data
  useEffect(() => {
    fetchInitialData(); // Load the first page when the component mounts
  }, [searchTerm]); // Empty dependency array ensures this runs only once on component mount

  return (
    <div
      className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}
    >
      {/* Search Bar */}
      <div className="flex justify-start">
        <input
          type="text"
          placeholder="Search events..."
          onChange={(e) => handleSearch(e.target.value)} // Debounced search handler
          className="p-4 mb-10 w-72 text-sm rounded-md border border-gray-300"
        />
      </div>

      {/* Scrollable Div for Infinite Scroll */}
      <div id="scrollableDiv" style={{ height: '500px', overflowY: 'auto' }}>
        <InfiniteScroll
          dataLength={data.length} // The current length of the data loaded
          next={fetchMoreData} // The function to call when loading more data
          hasMore={hasMore} // Whether more data is available to load
          loader={<h4 className="flex justify-center"> Loading...</h4>} // Loader component shown during loading
          endMessage={
            <p className="flex justify-center">No more data to load.</p>
          } // Message when all data is loaded
          scrollableTarget="scrollableDiv" // Ensure scroll event is attached to this div
        >
          {data.map((item, index) => (
            <div
              key={index}
              className={`border border-gray-300 mb-2 p-4 rounded-lg shadow-md flex flex-col gap-3 mx-auto w-full`}
              style={{
                backgroundColor: item.backgroundColor || '#f0f4f8', // Dynamic background color
                color: item.textColor || 'black', // Dynamic text color
              }}
            >
              {/* Content */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold truncate">{item.title}</h3>
                <div className="bg-white text-black rounded-full px-2 py-1 shadow-sm text-xs">
                  {new Date(item.start).toLocaleDateString()}
                </div>
              </div>
              <p className="text-sm mb-1 truncate">{item.description}</p>
              <div className="flex justify-start gap-2 text-sm font-semibold">
                <div>
                  <strong>Start:</strong>{' '}
                  {new Date(item.start).toLocaleDateString()}
                </div>
                <div>
                  <strong>End:</strong>{' '}
                  {new Date(item.end).toLocaleDateString()}
                </div>
              </div>
              {/* Edit and Delete Buttons */}
              <div className="flex justify-end mt-4 gap-1">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default EventListPage;

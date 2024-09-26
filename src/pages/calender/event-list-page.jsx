import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getAllEventDataService,
  deleteEventService,
  editEventService,
} from '../../services/authService'; // Assuming these services are defined
import { UserData } from '../../redux/authSlice';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
const isLargeScreen = window.innerWidth > 1024;

const EventListPage = () => {
  const { user } = useSelector(UserData);

  const [data, setData] = useState([]); // Store the fetched data
  const [page, setPage] = useState(0); // Start with page 0
  const [hasMore, setHasMore] = useState(true); // Set whether more data is available
  const [loading, setLoading] = useState(false); // Prevent multiple fetches at once
  const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering

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

      // Increment the page number for the next call
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
    // Add your edit logic here, for example:
    // editEventService(event.id, updatedData)
  };

  // Delete event (placeholder logic)
  const handleDelete = async (eventId) => {
    try {
    
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Call fetchMoreData initially to load the first page of data
  useEffect(() => {
    fetchMoreData(); // Load the first page when the component mounts
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div>
      {/* Search Bar */}
      <div style={{ padding: '10px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search events..."
          onChange={(e) => handleSearch(e.target.value)} // Debounced search handler
          style={{
            padding: '8px',
            width: '300px',
            fontSize: '14px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* Scrollable Div for Infinite Scroll */}
      <div
        id="scrollableDiv"
        style={{ height: '500px', overflowY: 'auto' }}
        className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}
      >
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
              style={{
                border: '1px solid #ccc',
                margin: '10px',
                padding: '15px',
                backgroundColor: item.backgroundColor || 'lightyellow', // Set background color from item
                color: item.textColor || 'black', // Set text color from item
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add subtle shadow for better card design
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginLeft: 'auto',
                marginRight: 'auto', // Center card horizontally
              }}
            >
              <h3
                style={{
                  marginBottom: '5px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontStyle: 'italic',
                  fontSize: '14px',
                  marginBottom: '5px',
                }}
              >
                {item.description}
              </p>
              <div style={{ fontSize: '14px', marginBottom: '5px' }}>
                <strong>Start Date:</strong>{' '}
                {new Date(item.start).toLocaleDateString()}
              </div>
              <div style={{ fontSize: '14px', marginBottom: '5px' }}>
                <strong>End Date:</strong>{' '}
                {new Date(item.end).toLocaleDateString()}
              </div>

              {/* Edit and Delete Buttons */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '10px',
                }}
              >
                <button
                  onClick={() => handleEdit(item)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '14px',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id.$oid)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '14px',
                  }}
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

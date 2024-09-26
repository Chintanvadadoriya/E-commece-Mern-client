import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // Import FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Basic views
import timeGridPlugin from '@fullcalendar/timegrid'; // Time grid for day/week views
import interactionPlugin from '@fullcalendar/interaction'; // To handle user interactions (e.g., click, drag)
import EventAdd from './common/EventAdd';
import useToast from '../hook/useToaster';
import { getAllEventDataService } from '../services/authService';
import { useSelector } from 'react-redux';
import { UserData } from '../redux/authSlice';
import { Tooltip as ReactTooltip } from 'react-tooltip';


// const dummyEvents = [
//   {
//     id: '1',
//     title: 'Team Meeting',
//     start: '2024-09-25',
//     description: 'Discuss quarterly goals with the team.',
//     backgroundColor: '#f87171', // Red
//     textColor: '#fff',          // White text
//   },
//   {
//     id: '2',
//     title: 'Marketing Strategy Session',
//     start: '2024-09-28',
//     end: '2024-09-29',
//     description: 'Brainstorming session for upcoming marketing campaigns.',
//     backgroundColor: '#60a5fa', // Blue
//     textColor: '#fff',          // White text
//   },
//   {
//     id: '3',
//     title: 'Project Deadline',
//     start: '2024-10-03',
//     description: 'Final deadline for the project submission.',
//     backgroundColor: '#34d399', // Green
//     textColor: '#fff',          // White text
//   },
//    {
//     id: '4',
//     title: 'Project setup',
//     start: '2024-10-04',
//     description: 'Final deadline for the project submission.',
//     backgroundColor: '#34d399', // Green
//     textColor: 'black',          // White text
//   },
//   {
//     id: '5',
//     title: 'Pyment invoice',
//     start: '2024-10-01',
//     end:"2024-10-05",
//     description: 'Final deadline for the project submission.',
//     backgroundColor: 'orange', // Green
//     textColor: 'black',          // White text
//   },
//     {
//     id: '6',
//     title: 'setup metting new project ',
//     start: '2024-10-16',
//     end:"2024-10-18",
//     description: 'disucess with client and undestend businesss logic',
//     backgroundColor: 'grey', // Green
//     textColor: 'white',          // White text
//   },
// ];


const CalendarComponent = () => {
  const { user } = useSelector(UserData);
const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const showToast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [seectedDate,setSelectedDate]=useState()

 async function getAllEvent(){
      try {

      let { data, status } = await getAllEventDataService({email:user?.email},1,3000);
      if(status === 200){
        setEvents(() => [ ...data]);
      }
    
    } catch (error) {
      console.error('Failed togetAllEvent', error);
      showToast('error', `${error.message}`);
    } 
  }

 useEffect(()=>{
  getAllEvent()
 },[showModal])

 // Function to remove an event by ID

  const handleDateClick = (info) => {
   console.log('info?.dateStr', info?.dateStr)
    setSelectedDate(info?.dateStr)
    setShowModal(true);
  };

  const closeModel=()=>{
    setShowModal(false)
  }

    // Function to assign classes to specific days of the week
  const dayCellDidMount = (info) => {
    const day = info.date.getDay(); // 0 = Sunday, 6 = Saturday
    if (day === 0 || day === 6) {
      // Apply red text for Saturday and Sunday
      info.el.style.color = '#EF4444'; // Tailwind's text-red-500 equivalent
    } else {
      // Apply blue text for weekdays
      info.el.style.color = '#3B82F6'; // Tailwind's text-blue-500 equivalent
    }
  };

  return (
    <>
        <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        selectable={true} // Enables date range selection
        dateClick={handleDateClick}
        dayCellDidMount={dayCellDidMount} // Hook to apply colors based on the day
        eventMouseEnter={(info) => {
          const content = `
            <div class="p-2 bg-grey-100">
              <strong class="text-lg font-semibold">${info.event.title}</strong><br>
              <span class="text-sm text-white-600">${info.event.extendedProps.description || 'No description available'}</span><br>
              <small class="text-sm text-white-700">Start: ${new Date(info.event.start).toLocaleDateString()}</small><br>
              ${info.event.end ? `<small class="text-sm text-white-700">End: ${new Date(info.event.end).toLocaleDateString()}</small>` : ''}
            </div>
          `;

          info.el.setAttribute('data-tooltip-id', 'event-tooltip');
          info.el.setAttribute('data-tooltip-html', content);
        }}
        eventMouseLeave={(info) => {
          info.el.removeAttribute('data-tooltip-html');
        }}
      />
       <ReactTooltip
        id="event-tooltip"
        place="top"
        effect="solid"
        html={true}
        className="bg-white text-gray-800 shadow-md rounded-lg p-4 max-w-xs" // Tailwind classes for cleaner design
        arrowColor="white" // Tooltip arrow color matching the background
        style={{ zIndex: 50 }} 

      />
     <EventAdd isOpen={showModal} close={closeModel} seectedDate={seectedDate}/>
    </>
  );
};

export default CalendarComponent;

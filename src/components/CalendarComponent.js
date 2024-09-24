import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // Import FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Basic views
import timeGridPlugin from '@fullcalendar/timegrid'; // Time grid for day/week views
import interactionPlugin from '@fullcalendar/interaction'; // To handle user interactions (e.g., click, drag)
import EventAdd from './common/EventAdd';
import useToast from '../hook/useToaster';
import { getAllEventDataService } from '../services/authService';
import { useSelector } from 'react-redux';
import { UserData } from '../redux/authSlice';

const CalendarComponent = () => {
  const { user } = useSelector(UserData);

  const [events, setEvents] = useState([]);
  const showToast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [seectedDate,setSelectedDate]=useState()

 async function getAllEvent(){
      try {

      let { data, status } = await getAllEventDataService({email:user?.email});
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

  const handleDateClick = (info) => {
    console.log('info', info)
    setSelectedDate(info?.dateStr)
    setShowModal(true);
  };

  const closeModel=()=>{
    setShowModal(false)
  }
console.log('events', events)
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
     <EventAdd isOpen={showModal} close={closeModel} seectedDate={seectedDate}/>
    </>
  );
};

export default CalendarComponent;

import React from 'react'
import CalendarComponent from '../../components/CalendarComponent';
const isLargeScreen = window.innerWidth > 1024;

function Calender() {
  return (
     <div className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}>
      <CalendarComponent />
    </div>
  );
}

export default Calender;
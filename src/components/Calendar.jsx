import { useState } from 'react';

export default function Calendar() {
  const [currentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === currentDate.getDate();
    days.push(
      <div key={i} className={`calendar-day ${isToday ? 'today' : ''}`}>
        {i}
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
      </div>
      <div className="calendar-grid">
        <div className="calendar-weekday">Su</div>
        <div className="calendar-weekday">Mo</div>
        <div className="calendar-weekday">Tu</div>
        <div className="calendar-weekday">We</div>
        <div className="calendar-weekday">Th</div>
        <div className="calendar-weekday">Fr</div>
        <div className="calendar-weekday">Sa</div>
        {days}
      </div>
    </div>
  );
}

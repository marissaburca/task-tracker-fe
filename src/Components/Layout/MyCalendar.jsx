import "../CSS/MyCalendar.css";
import React, { useState } from "react";
import Calendar from "react-calendar";

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => setDate(newDate);

  return (
    <div className="d-flex justify-content-end">
      <Calendar onChange={onChange} value={date} />
    </div>
  );
}

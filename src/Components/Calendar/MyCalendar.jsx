import "./MyCalendar.css";
import React, { useState } from "react";
import Calendar from "react-calendar";

export default function MyCalendar({ selectedDate }) {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
    selectedDate(newDate);
  };

  return (
      <Calendar onChange={onChange} value={date} />
  );
}

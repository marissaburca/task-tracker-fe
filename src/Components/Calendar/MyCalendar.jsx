import "./MyCalendar.css";
import { useTheme } from "../../ThemeContext/ThemeProvider";
import React, { useState } from "react";
import Calendar from "react-calendar";

export default function MyCalendar({ selectedDate }) {
  const [date, setDate] = useState(new Date());
  const { theme } = useTheme()

  const onChange = (newDate) => {
    setDate(newDate);
    selectedDate(newDate);
  };
  const formatMonthYear = (locale, date) => {
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
      <Calendar onChange={onChange} value={date} formatMonthYear={formatMonthYear} className={theme === 'dark' ? 'react-calendar--dark' : 'react-calendar--light'}/>
  );
}

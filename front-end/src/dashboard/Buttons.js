import React from 'react'
import { today, previous, next } from '../utils/date-time'
import { useHistory } from "react-router-dom";

const Buttons = ({ date, setDate }) => {
  
  const prevDay = previous(date)
  const day = today()
  const nextDay = next(date)
  const history = useHistory();

  return (
    <div className="mt-4 mb-4 d-flex justify-content-center">
      <button 
        className="btn btn-xs btn-dark btn-outline-light mx-3 px-3"
        type="button"
        name="previous"
        onClick={() => {
          setDate(prevDay);
          history.push(`/dashboard?date=${prevDay}`);
        }}
      >
        Previous
      </button>
      <button 
        className="btn btn-xs btn-dark btn-outline-light mx-3 px-3"
        type="button"
        name="previous"
        onClick={() => {
          setDate(day);
          history.push(`/dashboard?date=${day}`);
        }}
      >
        Today
      </button>
      <button 
        className="btn btn-xs btn-dark btn-outline-light mx-3 px-3"
        type="button"
        name="previous"
        onClick={() => {
          setDate(nextDay);
          history.push(`/dashboard?date=${nextDay}`);
        }}
      >
        Next
      </button>
    </div>
  )
}

export default Buttons;
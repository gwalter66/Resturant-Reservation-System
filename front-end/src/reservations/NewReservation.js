import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";
import { validateDate, validateFields }from "./validateDate";
import ReservationForm from "./ReservationForm";



// Displays a Reservation Form used to create or edit a reservation
const NewReservation = ({ loadDashboard }) => {

  const history = useHistory();

  // const [errors, setErrors] = useState([]);
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState(null);
  


  function handleSubmit(sumbmittedFormData) {
    const abortController = new AbortController();
    const foundErrors = [];

    if (validateDate(sumbmittedFormData, foundErrors) && validateFields(sumbmittedFormData, foundErrors)) {

        createReservation(sumbmittedFormData, abortController.signal)
          .then(loadDashboard)
          .then(() =>
            history.push(`/dashboard?date=${sumbmittedFormData.reservation_date}`)
          )
          .catch(setApiError);
    }
    setErrors(foundErrors);
    return () => abortController.abort();
  };



  const errorsJSX = () => {
    return errors.map((error, idx) => <ErrorAlert key={idx} error={error} />);
  };




  return (
    <main>
        <h1 className='text-center py-4'>New Reservation</h1>

        {errorsJSX()}
        <ErrorAlert error={apiError} />

        <ReservationForm handleSubmit={handleSubmit} />
    </main>
  )

}


export default NewReservation;
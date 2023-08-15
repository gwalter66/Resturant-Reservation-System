import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { updateReservation, readReservation } from "../utils/api";
import { validateDate, validateFields }from "./validateDate";
import ReservationForm from "./ReservationForm";



// Displays a Reservation Form used to create or edit a reservation
const EditReservation = ({ loadDashboard }) => {

  const history = useHistory();
  const { reservation_id } = useParams();

  const [reservation, setReservation] = useState({});

  // const [errors, setErrors] = useState([]);
  const [reservationError, setReservationError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState(null);
  



  useEffect(() => {
    const abortController = new AbortController();
    setReservationError(null);
    readReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);
    return () => abortController.abort();
  }, [reservation_id]);



  function handleSubmit(sumbmittedFormData) {
    const abortController = new AbortController();
    const foundErrors = [];

    if (validateDate(sumbmittedFormData, foundErrors) && validateFields(sumbmittedFormData, foundErrors)) {

        updateReservation(reservation_id, sumbmittedFormData, abortController.signal)
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


  const child = reservation.reservation_id ? (
    <ReservationForm
      initialState={{ ...reservation }}
      handleSubmit={handleSubmit}
    />
  ) : (
    <p>Loading...</p>
  );



  return (
    <main>
        <h1 className='text-center py-4'>Edit Reservation</h1>

        {errorsJSX()}
        <ErrorAlert error={apiError} />
        <ErrorAlert error={reservationError} />

        {child}

    </main>
  )

}


export default EditReservation;
import React, { useState } from "react";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "1",
    status: "booked",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [errorAlert, setErrorAlert] = useState(false);

  //Handlers
  const changeHandler = ({ target }) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const response = await createReservation(
        formData,
        abortController.signal
      );
      history.push(
        `/dashboard/?date=${response.reservation_date.slice(0, 10)}`
      );
    } catch (error) {
      setErrorAlert(error);
    }
  };
  return (
    <div>
      <div>
        <h1>New Reservation</h1>
      </div>
      <div>
        <ErrorAlert error={errorAlert} />
        <ReservationForm
          formData={formData}
          changeHandler={changeHandler}
          submitHandler={submitHandler}
        />
      </div>
    </div>
  );
}

export default NewReservation;
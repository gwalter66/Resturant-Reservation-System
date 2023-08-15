import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { searchByMobileNumber } from "../utils/api";
import SearchForm from "./SearchForm";
import ListReservations from "../dashboard/ListReservations";

function Search() {
  //inital form
  const initialFormState = {
    mobile_number: " ",
  };

  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({ ...initialFormState });
  const [searchError, setSearchError] = useState([]);
  const [submitted, setSubmitted] = useState(false);



  //change handlers

  const changeHandler = ({ target }) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [target.name]: target.value,
    }));
  };

  console.log("formData", formData);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const mobile_number = formData.mobile_number;
      const foundReservations = await searchByMobileNumber(mobile_number);
      setReservations(foundReservations);
      setSubmitted(true);
    } catch (error) {
      setSearchError(error);
    }
  };

  return (
    <main>
      <div>
        <h1>Search by Mobile Number</h1>
      </div>
      <div>
        <SearchForm
          changeHandler={changeHandler}
          submitHandler={submitHandler}
          formData={formData}
        />

        {searchError.length > 0 && <ErrorAlert error={searchError} />}

        {reservations.length > 0 && (
          <ListReservations reservations={reservations} />
        )}

        {submitted &&
          reservations.length <= 0 &&
          `No reservations found for mobile number: ${formData.mobile_number}`}
      </div>
    </main>
  );
}

export default Search;
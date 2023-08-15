import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import DisplayReservation from "../reservations/DisplayReservation";

/**
 * Search component allows the user to search for a specific reservation
 * by entering in a phone number into the search field and display all
 * reservation(s) under the give phone number
 */
export default function Search() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();

  /**
   * updates the state of mobileNumber when the user makes any changes to it
   */
  function handleChange({ target }) {
    setMobileNumber(target.value);
  }

  /** makes a get request to list all reservations under the given mobileNumber when the "submit" button is clicked */
  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    setError(null);

    listReservations({ mobile_number: mobileNumber }, abortController.signal)
      .then(setReservations)
      .catch(setError);

    return () => abortController.abort();
  }

  /** returns all reservation(s), if any */
  const searchResultsJSX = () => {
    return reservations.map((reservation) => (
      <DisplayReservation
        key={reservation.reservation_id}
        reservation={reservation}
        // date={date}
      />
    ))
  };

  return (
    <div className='row justify-content-center'>
      <h1 className='text-center py-4'>Search Reservations</h1>

      <form className='col-lg-10'>
        <ErrorAlert error={error} />
        <div className='form-group'>
          <input
            className='form-control'
            name="mobile_number"
            id="mobile_number"
            type="tel"
            placeholder="Enter a customer's phone number"
            onChange={handleChange}
            value={FormData.mobile_number}
            required
          />
          <button
            className="btn btn-xs btn-dark btn-outline-light mt-4 w-10"
            type="submit"
            onClick={handleSubmit}
          >
            Find
          </button>
          <button
            className="btn btn-xs btn-cancel text-dark btn-outline-light mt-4 mx-2 w-10"
            type="button"
            onClick={history.goBack}
          >
                    Cancel
          </button>
        </div>
      
        <div>{searchResultsJSX()}</div>
        <div className="text-center">
            {reservations.length === 0 && (
              <h5 className='text-white mt-3'>No reservations found</h5>
            )}
          </div>
        </form>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { getDisplayDate, getDisplayTime } from "../utils/date-time";
import formatReservationTime from "../utils/format-reservation-time";
import { updateReservationStatus } from "../utils/api";



// Displays an individual reservation
const DisplayReservation = ({ reservation, loadDashboard }) => {

    if (!reservation || reservation.status === "finished") return null;

    reservation = formatReservationTime(reservation);
    
    const {
        reservation_id,
        first_name,
        last_name,
        mobile_number,
        people,
        reservation_date,
        reservation_time,
        status
    } = reservation

    // display date and time formatted as Friday, January 1, and 3:30pm
    const displayDate = getDisplayDate(reservation_date.substr(0, 10));
    const displayTime = getDisplayTime(reservation_time);


    // Handles if the user wants to cancel a reservation
    function handleCancel() {
        /** updates reservation status if user confirms */
        if (
          window.confirm(
            "Do you want to cancel this reservation? This cannot be undone."
          )
        ) {
          const abortController = new AbortController();
    
          updateReservationStatus(
            reservation.reservation_id,
            "cancelled",
            abortController.status
          ).then(loadDashboard);
    
          return () => abortController.abort();
        }
      } 




    return (
        
    <>
        <div className={`card card-bg text-white row flex-column flex-md-row rounded-lg mx-1 my-3 px-2 py-2`} >
            
            {/* Name & Phone */}
            <div className={`col align-self-center`}>
                <h3 className="mb-1">{`${first_name} ${last_name}`}</h3>
                <p className="mb-0">{mobile_number}</p>
            </div>
            {/* Party & Date/Time */}
            <div className={`col align-self-center`}>
                <h5 className="mb-1">{`Party of ${people}`}</h5>
                <p className="mb-0">{`${displayDate} @ ${displayTime}`}</p>
            </div>
            {/* Reservation Status */}
            <div className={`col align-self-center`}>
                <h5 className="my-2 mb-3" data-reservation-id-status={reservation_id}>Status: {status}</h5>
            </div>
            {/* Buttons */}
            <div className="col text-center">
                {status === 'booked' && (
                <div className={`col text-center align-self-center`}>
                    <div className="d-flex justify-content-center">
                        <div className="mb-2 mr-1 w-100">
                            <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                                <button
                                    className="btn btn-xs btn-dark btn-outline-light w-100"
                                    type="button"
                                    name="Edit"
                                >Edit</button>
                            </Link>
                        </div>
                        <div className="mb-2 ml-1 w-100">
                            <a href={`/reservations/${reservation.reservation_id}/seat`}>
                                <button
                                    className="btn btn-xs btn-dark btn-outline-light w-100"
                                    type="button"
                                    name="Seat"
                                >Seat</button>
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            className="btn btn-xs btn-cancel text-dark btn-outline-light d-block d-md-inline w-100"
                            type="button"
                            name="Cancel"
                            onClick={handleCancel}
                            data-reservation-id-cancel={reservation.reservation_id}
                        >Cancel</button>  
                    </div>
                </div>
                )}
            </div>   
        </div>
    </>
    )
}

export default DisplayReservation;
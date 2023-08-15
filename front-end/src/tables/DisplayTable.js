import React, { useEffect, useState } from 'react';
import { finishTable } from "../utils/api";
import { readReservation } from '../utils/api';




const DisplayTable = ({ table, loadDashboard }) => {


    const [reservation, setReservation] = useState([]);
    const { table_id, table_name, capacity, reservation_id } = table;


    useEffect(() => {
        const abortController = new AbortController();
        
        reservation_id && readReservation(reservation_id).then(setReservation);
        
        return () => abortController.abort();

      }, [table, reservation_id])


    /** handles finishing a seated table */
    function handleFinish() {
        if (
            window.confirm(
            "Is this table ready to seat new guests? This cannot be undone."
        )
        ) {
        const abortController = new AbortController();
        finishTable(table.table_id, abortController.signal).then(loadDashboard);
        return () => abortController.abort();
        }
    }

    let badgeColor, badgeName

    if (reservation_id === null) {
      badgeColor = 'success'
      badgeName = 'free'
    } else {
      badgeColor = 'danger'
      badgeName = 'occupied'
    }

//.............///...........///////////////.......

    return (
        <>
            <div className={`card card-bg text-white container-flex rounded-lg mx-1 my-3 px-2 py-2`} >
                {/* Table Name */}
                <div className='row'>
                    <div className='col-lg-5 ml-3 my-auto'>
                        <div>
                            <h4>{table_name}</h4>
                        </div>
                        {/* Capacity */}
                        <div>
                            <h5>Capacity: {capacity}</h5>
                        </div>
                        {/* Status */}
                        <div data-table-id-status={table_id}>
                            <h5>Status: {' '} <span className={`text-center ml-1 badge-pill badge-${badgeColor}`}> {badgeName}</span></h5>        
                        </div>
                    </div>
                
                    {/* Guest info & finish button (only if reservation is booked for) */}
                    <div className='col-auto mx-auto text-center my-auto'>
                        <div>
                            <h5 className="mb-2 w-100">
                                {reservation_id && `${reservation.last_name}, ${reservation.first_name} | ${reservation.mobile_number}`}
                            </h5>
                        </div>
                        <div>
                            {reservation_id && (
                                <button
                                    onClick={handleFinish}
                                    className="btn btn-xs btn-dark btn-outline-light px-5"
                                    data-table-id-finish={table_id}
                                    type="button"
                                >
                                    Finish
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayTable;
import React from "react";
import { getDisplayDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import Buttons from "./Buttons";
import DisplayReservation from "../reservations/DisplayReservation";
import DisplayTable from "../tables/DisplayTable";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

// {JSON.stringify(reservations)}

function Dashboard({ date, setDate, reservations, reservationsError, tables, tablesError, loadDashboard }) {
  
  // display date formatted as Friday, January 1, 2021
  const displayDate = getDisplayDate(date);

  // iterates each reservation and calls 'DisplayReservation' to display a single reservation
  const reservationsJSX = () => {
    return reservations.map((reservation) => (
      <DisplayReservation
        key={reservation.reservation_id}
        reservation={reservation}
        loadDashboard={loadDashboard}
      />
    ))
  };


  const tablesJSX = () => {
    return tables.map((table) => (
      <DisplayTable
        key={table.table_id}
        table={table}
        loadDashboard={loadDashboard}
      />
    ))
  };



  return (
    <main>
      <h1 className="text-center">Dashboard</h1>

      <div className="text-center">
        <h3 className="text-center">{displayDate}</h3>
      </div>

      <div className="text-center">
          <Buttons date={date} setDate={setDate} />
      </div>

      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      
      <div>
        <h3>Reservations:</h3>
        <div>
          <div>{reservationsJSX()}</div>
          <div className="text-center">
            {reservations.length === 0 && (
              <h5 className="text-center row flex-column bg-light border rounded-lg mx-1 my-3 px-2 py-2">There are no reservations for today</h5>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3>Tables:</h3>
        <div>{tablesJSX()}</div>
      </div>
      
    </main>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import {
  listReservations,
  listTables,
  finishTable,
  changeReservationStatus,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "./ListReservations";
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time";
import { previous, next } from "../utils/date-time";
import { Link, useHistory } from "react-router-dom";
import ListTables from "./ListTables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState([]);
  const [cancelError, setCancelError] = useState(null);

  //If date is not given, should preform get request with today's date.
  let date = today();
  const query = useQuery().get("date");
  if (query) {
    date = query;
  }

  useEffect(loadDashboard, [date]);

  //load reservations and tables

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  //handler for finish button

  async function finishHandler({ table_id, reservation_id }) {
    const confirmationWindow = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (confirmationWindow) {
      try {
        await finishTable(table_id);
        await changeReservationStatus(reservation_id, "finished");
      } catch (error) {
        setTablesError([error]);
      }

      history.push("/");
    }
  }

  async function cancelHandler({ reservation_id }) {
    const confirmationWindow = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirmationWindow) {
      try {
        await changeReservationStatus(reservation_id, "cancelled");
      } catch (error) {

        setCancelError([error]);
      }

      history.push("/");
    }
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div className="container">
        <Link
          to={`/dashboard/?date=${previous(date)}`}
          className="btn btn-dark"
        >
          Previous
        </Link>
        <Link to={`/dashboard`} className="btn btn-light">
          Today
        </Link>
        <Link to={`/dashboard/?date=${next(date)}`} className="btn btn-dark">
          Next
        </Link>
      </div>
      <br />
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={cancelError} />
      <ListReservations
        reservations={reservations}
        date={date}
        cancelHandler={cancelHandler}
      />
      <br />
      <ListTables tables={tables} finishHandler={finishHandler} />
    </main>
  );
}

export default Dashboard;
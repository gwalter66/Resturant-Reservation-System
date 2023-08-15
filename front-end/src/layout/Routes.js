import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from '../utils/useQuery'
import { listReservations, listTables } from "../utils/api";
import NewTable from "../tables/NewTable";
import SeatReservation from "../reservations/SeatReservation";
import Search from "../search/Search";
import NewReservation from "../reservations/NewReservation";
import EditReservation from "../reservations/EditReservation";

/**
 * Defines all the routes for the application.
 * @returns {JSX.Element}
 */

function Routes() {

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  
  const query = useQuery();
  const [date, setDate] = useState("")
  const history = useHistory();
  const location = useLocation();

  // If a date is found in the query, set date to the found query date, else set date to current date using today() function.
  useEffect(() => {
    setDate("");
    if (query.get("date")) {
      setDate(query.get("date"));
    } else {
      if (location.pathname === "/dashboard")
        history.push(`/dashboard?date=${today()}`);
    }
  }, [query, location.pathname, history]);
 
  
  // Use useEffect hook to call loadDashboard function whenever date changes.
  useEffect(loadDashboard, [date]);


  // Makes an api call to retrieve reservations to display on dashboard
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);

    // Uses provided listReservations() to retrieve all reservations for a given date on the dashboard
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    // Uses provide listTables() to retrieve all tables with id's in numberical order on the dashboard
    listTables(abortController.signal)
      .then((tables) => {
        return tables
      })
      .then(setTables)
      .catch(setTablesError);
      
    return () => abortController.abort();
  }



  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path="/dashboard">
        <Dashboard
          date={date}
          setDate={setDate}
          reservations={reservations}
          reservationsError={reservationsError}
          tables={tables}
          tablesError={tablesError}
          loadDashboard={loadDashboard}
        />
      </Route>

      <Route path="/reservations/new">
        <NewReservation loadDashboard={loadDashboard} />
      </Route>

      <Route path="/reservations/:reservation_id/edit">
        <EditReservation loadDashboard={loadDashboard} />
      </Route>

      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation tables={tables} setTables={setTables} loadDashboard={loadDashboard} />
      </Route>

      <Route path="/tables/new">
        <NewTable loadDashboard={loadDashboard} />
      </Route>

      <Route path="/search">
        <Search date={date}/>
      </Route>

      <Route>
        <NotFound />
      </Route>

    </Switch>
  );
}

export default Routes;
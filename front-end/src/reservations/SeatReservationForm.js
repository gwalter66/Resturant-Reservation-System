import React from "react";
import { useHistory } from "react-router-dom";

function SeatReservationForm({ tables, submitHandler, changeHandler }) {
  const history = useHistory();
  return (
    <div>
      <form>
        <label>Select Table:</label>
        <select name="table_id" onChange={changeHandler}>
          <option value="">Table Name - Capacity</option>
          {tables.map((table) => (
            <option
              key={table.table_id}
              value={JSON.stringify(table)}
              required={true}
            >
              {table.table_name} - {table.capacity}
            </option>
          ))}
        </select>
        <div>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={(event) => submitHandler(event)}
          >
            Submit
          </button>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SeatReservationForm;
import React from "react";
import { useHistory } from "react-router-dom";

function TableForm({
  formData,
  changeHandlerName,
  changeHandlerCapacity,
  submitHandler,
}) {
  const history = useHistory();

  return (
    <div>
      <form>
        <label htmlFor="table_name">
          Table Name:
          <input className="form-control"
            type="text"
            name="table_name"
            id="table_name"
            value={formData.table_name}
            onChange={changeHandlerName}
            required
          />
        </label>
        <br />
        <label htmlFor="capacity">
          Capacity Size:
          <input className="form-control"
            type="number"
            name="capacity"
            id="capacity"
            min="1"
            value={formData.capacity}
            onChange={changeHandlerCapacity}
            required
          />
        </label>
        <br />
        <button
          className="btn btn-outline-danger btn-sm mr-1"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-outline-primary btn-sm"
          onClick={(event) => submitHandler(event)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default TableForm;
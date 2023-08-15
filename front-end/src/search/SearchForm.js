import React from "react";
import { useHistory } from "react-router";

function SearchForm({ changeHandler, formData, submitHandler }) {
  const history = useHistory();

  return (
    <>
      <form>
        <label htmlFor="mobile_number">Mobile Number</label>
        <div>
          <input className="form-control"
            type="text"
            name="mobile_number"
            id="mobile_number"
            placeholder="Enter a customer's mobile number"
            onChange={changeHandler}
            required="required"
            value={formData.mobile_number}
          />
        </div>
        <br />
        <div>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={(event) => submitHandler(event)}
          >
            Find
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
    </>
  );
}

export default SearchForm;
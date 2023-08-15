import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import formatPhoneNumber from "../utils/phoneNumberFormatter";




// Displays a Reservation Form used to create or edit a reservation
const ReservationForm = ({
  handleSubmit, 
  initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  }
}) => {
  
  
  const history = useHistory();


  // Set formData default state to initialState variable
  const [formData, setFormData] = useState(initialState);



  // Updates the state of the form whenever the user makes changes to it
  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]:
        target.name === "people" ? Number(target.value) : target.value,
    });
  }  


  let phoneNumberFormatter = ({ target }) => {
    const formattedInputValue = formatPhoneNumber(target.value);
    setFormData({
      ...formData,
      mobile_number: formattedInputValue,
    });
  };




  return (
    <div className='row justify-content-center'>
      <form
        className='col-lg-10'
        onSubmit={ (e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}>

        
        <div className='form-group'>
          <label>First Name</label>
          <input
            className='form-control'
            id="first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            placeholder="Enter your first name"
            required={true}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label>Last Name</label>
          <input
            className='form-control'
            id="last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            placeholder="Enter your last name"
            required={true}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label>Mobile Number</label>
          <input
            className='form-control'
            id="mobile_number"
            name="mobile_number"
            type="tel"
            value={formData.mobile_number}
            placeholder="xxx-xxx-xxxx"
            pattern="([0-9]{3}-)?[0-9]{3}-[0-9]{4}"
            required={true}
            onChange={phoneNumberFormatter}
          />
        </div>

        <div className='form-group'>
          <label>Reservation Date</label>
          <input
            className='form-control'
            id="reservation_date"
            name="reservation_date"
            type="date"
            pattern="\d{4}-\d{2}-\d{2}"
            value={formData.reservation_date}
            required={true}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label>Reservation Time</label>
          <input
            className='form-control'
            id="reservation_time"
            name="reservation_time"
            type="time"
            pattern="[0-9]{2}:[0-9]{2}"
            value={formData.reservation_time}
            required={true}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label>Party Size</label>
          <input
            className='form-control'
            id="people"
            name="people"
            type="text"
            value={formData.people}
            placeholder="Please enter your party's size"
            required={true}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <button
            className="btn btn-xs btn-dark btn-outline-light w-10"
            type="submit"
          >
            Submit
          </button>

          <button
            className="btn btn-xs btn-cancel text-dark btn-outline-light mx-2 w-10"
            type="button"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  )

}


export default ReservationForm;
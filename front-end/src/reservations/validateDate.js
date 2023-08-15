/** checks if user has filled out each field in the form */
export function validateFields(formData, foundErrors) {
    for (const field in formData) {
      if (formData[field] === "") {
        foundErrors.push({
          message: `${field.split("_").join(" ")} cannot be left blank.`,
        });
      }
    }
  
    return foundErrors.length === 0;
  }
  
  
  
  /** checks that the user has entered a date & time that the restaurant is available */
  export function validateDate(formData, foundErrors) {
    const reservationDateTime = new Date(
      `${formData.reservation_date}T${formData.reservation_time}:00.000`
    );
    const todaysDate = new Date();
    if (reservationDateTime.getDay() === 2) {
      foundErrors.push({
        message: "Invalid Date: Restaurant is closed on Tuesdays.",
      });
    }
  
    if (reservationDateTime < todaysDate) {
      foundErrors.push({
        message: "invalid Date: Only reservations for future dates can be made.",
      });
    }
  
    if (
      reservationDateTime.getHours() < 10 ||
      (reservationDateTime.getHours() === 10 &&
        reservationDateTime.getMinutes() < 30)
    ) {
      foundErrors.push({
        message: "Invalid Time: Restaurant does not open until 10:30am.",
      });
    } else if (
      reservationDateTime.getHours() > 22 ||
      (reservationDateTime.getHours() === 22 &&
        reservationDateTime.getMinutes() >= 30)
    ) {
      foundErrors.push({
        message: "Invalid Time: Restaurant closes at 10:30pm.",
      });
    } else if (
      reservationDateTime.getHours() > 21 ||
      (reservationDateTime.getHours() === 21 &&
        reservationDateTime.getMinutes() > 30)
    ) {
      foundErrors.push({
        message:
          "Invalid Time: Reservation must be made at least an hour before closing.",
      });
    }
    return foundErrors.length === 0;
  }
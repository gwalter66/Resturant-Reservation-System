Requires Node.js v16.20.
# Restaurant Reservation System
> This is a full stack application to allow a resturant to make, update, and delete reservations
> The front end of this repo is hosted at https://reservation-frontend-v0bx.onrender.com
> The back end is hosted at https://reservation-backend-63rq.onrender.com
> **Render spins down sites so you may have to vist the backend url first in order to allow the front end to make its api calls**

# Dashboard

![Alt text](<images/Screenshot (48).png>)

The `/dashboard` page will
   - list all reservations for one date only. The date is defaulted to today, and the reservations are sorted by time.
   - display next, previous, and today buttons that allow the user to see reservations on other dates
   - display any error messages returned from the API
 

   - each reservation in the list will:
     - Display a "Seat" button on each reservation.

    ![Alt text](<images/Screenshot (49).png>)

   - display a list of all tables, sorted by `table_name`, in another area of the dashboard
     - Each table will display "Free" or "Occupied" depending on whether a reservation is seated at the table. 

     1. The `/dashboard` page will
   - Display a "Finish" button on each _occupied_ table.

   - ![Alt text](<images/Screenshot (50).png>)
   - Clicking the "Finish" button will display the following confirmation: "Is this table ready to seat new guests? This cannot be undone." tables to show that the table is now available.
   - Clicking the "Cancel" makes no changes.

   1. The `/dashboard` page will
   - display the status of the reservation. The default status is "booked"
   - display the Seat button only when the reservation status is "booked".
   - clicking the Seat button changes the status to "seated" and hides the Seat button.
   - clicking the Finish button associated with the table changes the reservation status to "finished" and removes the reservation from the dashboard.


# New Reservation
![Alt text](<images/Screenshot (43).png>)

1. The `/reservations/new` page will
   - have the following required and not-nullable fields:
     - First name: 
     - Last name: 
     - Mobile number: 
     - Date of reservation: 
     - Time of reservation: 
     - Number of people in the party, which must be at least 1 person. 
   - display a `Submit` button that, when clicked, saves the new reservation, then displays the `/dashboard` page for the date of the new reservation
   - display a `Cancel` button that, when clicked, returns the user to the previous page
   - display any error messages returned from the API

![Alt text](<images/Screenshot (45).png>)
1. The `/reservations/new` page will display an error message if any of the following constraints are violated:
   - The reservation date is a Tuesday as the restaurant is closed on Tuesdays.
   - The reservation date is in the past. Only future reservations are allowed.

![Alt text](<images/Screenshot (46).png>)
1. The `/reservations/new` page will display an error message, if any of the following additional constraints are violated:
   - The reservation time is before 10:30 AM.
   - The reservation time is after 9:30 PM, because the restaurant closes at 10:30 PM and the customer needs to have time to enjoy their meal.
   - The reservation date and time combination is in the past. Only future reservations are allowed. E.g., if it is noon, only allow reservations starting _after_ noon today.

# New Table
![Alt text](<images/Screenshot (47).png>)

1. The `/tables/new` page will
   - have the following required and not-nullable fields:
     - Table name: `<input name="table_name" />`, which must be at least 2 characters long.
     - Capacity: `<input name="capacity" />`, this is the number of people that can be seated at the table, which must be at least 1 person.
   - display a `Submit` button that, when clicked, saves the new table then displays the `/dashboard` page
   - display a `Cancel` button that, when clicked, returns the user to the previous page

# Seat Reservation
![Alt text](<images/Screenshot (51).png>)
1. The `/reservations/:reservation_id/seat` page will
   - have the following required and not-nullable fields:
     - Table number: `<select name="table_id" />`. The text of each option must be `{table.table_name} - {table.capacity}` so the tests can find the options.
   - do not seat a reservation with more people than the capacity of the table
   - display a `Submit` button that, when clicked, assigns the table to the reservation then displays the `/dashboard` page
   - PUT to `/tables/:table_id/seat/` in order to save the table assignment.
   - display a `Cancel` button that, when clicked, returns the user to the previous page


# Search for a reservation by phone number
![Alt text](<images/Screenshot (52).png>)
. The `/search` page will
   - Display a search box `<input name="mobile_number" />` that displays the placeholder text: "Enter a customer's phone number"
   - Display a "Find" button next to the search box.
   - Clicking on the "Find" button will submit a request to the server.
     - then the system will look for the reservation(s) in the database and display all matched records on the `/search` page using the same reservations list component as the `/dashboard` page.
     - the search page will display all reservations matching the phone number, regardless of status.
   - display `No reservations found` if there are no records found after clicking the Find button.

# Edit a reservation   
![Alt text](<images/Screenshot (53).png>)
1. The `/reservations/:reservation_id/edit` page will display the reservation form with the existing reservation data filled in
   - Only reservations with a status of "booked" can be edited.
   - Clicking the "Submit" button will save the reservation, then displays the previous page.
   - Clicking "Cancel" makes no changes, then display the previous page.

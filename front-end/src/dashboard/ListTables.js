function ListTables({ tables, finishHandler }) {
    const displayTables = tables.map((table, index) => {
      if (table.occupied || table.reservation_id) {
        return (
          <tr key={index}>
            <td>{table.table_id}</td>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td>{table.reservation_id}</td>
            <td>
              <p data-table-id-status={table.table_id}>Occupied</p>
            </td>
            <td>
              <button
                data-table-id-finish={table.table_id}
                className="btn btn-outline-primary"
                type=""
                onClick={() => finishHandler(table)}
              >
                Finish
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={index}>
            <td>{table.table_id}</td>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td>{table.reservation_id}</td>
            <td>
              <p className="col" data-table-id-status={table.table_id}>
                Free
              </p>
            </td>
            <td></td>
          </tr>
        );
      }
    });
  
    return (
      <div>
        <div>
          <table className="table table-striped table-bordered">
            <thead className="thread-dark">
              <tr>
                <th>Table ID</th>
                <th>Table Name</th>
                <th>Capacity</th>
                <th>Reservation ID</th>
                <th>Occupied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{displayTables}</tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default ListTables;
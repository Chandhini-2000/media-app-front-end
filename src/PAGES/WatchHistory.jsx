import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { deleteWatchHistoryAPI, getWatchHistoryAPI } from '../Services/allAPIs';

function WatchHistory() {
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    const result = await getWatchHistoryAPI();
    console.log(result);
    setHistory(result.data);
  };

  const handleDelete = async (id) => {
    const result = await deleteWatchHistoryAPI(id);
    console.log(result);
    window.location.reload();
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Slno</th>
          <th>Caption</th>
          <th>Url</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {history.length > 0 ? (
          history.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.caption}</td>
              <td>{item.url}</td>
              <td>{item.timestamp}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No watch history available</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default WatchHistory;

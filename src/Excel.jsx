import React, { useState } from "react";
import Navbar from "../src/Navbar";

function Excel() {
  const [data, setData] = useState([
    {
      id: 1,
      activityName: "Lead Creation",
      activityDate: "",
      time: "",
      businessDay: 1,
      eodDate: "",
      aedDate: "",
    },
    {
      id: 2,
      activityName: "Pre-Design Quote",
      activityDate: "",
      time: "",
      businessDay: 1,
      eodDate: "",
      aedDate: "",
    },
    {
      id: 3,
      activityName: "Client Approval",
      activityDate: "",
      time: "",
      businessDay: 1,
      eodDate: "",
      aedDate: "",
    },
    {
      id: 4,
      activityName: "Client Incorporation",
      activityDate: "",
      time: "",
      businessDay: 1,
      eodDate: "",
      aedDate: "",
    },
    {
      id: 5,
      activityName: "Client Approval + 1",
      activityDate: "",
      time: "",
      businessDay: 1,
      eodDate: "",
      aedDate: "",
    },
    {
      id: 6,
      activityName: "Token",
      activityDate: "",
      time: "",
      businessDay: 1,
      eodDate: "",
      aedDate: "",
    },
  ]);

  const handleOkButtonClick = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = currentDate.toLocaleTimeString(); // Get the current time
    let newData = [...data];
    newData.forEach((row) => {
      row.activityDate = formattedDate;
      row.time = formattedTime; // Set the same time for each row
      row.eodDate = calculateEOD(formattedDate, row.businessDay);
    });
    setData(newData);
  };

  const calculateEOD = (activityDate, businessDay) => {
    const [day, month, year] = activityDate.split("/");
    const parsedDate = new Date(`${month}/${day}/${year}`);
    const eodDateTime = new Date(
      parsedDate.getTime() + businessDay * 24 * 60 * 60 * 1000
    );
    const formattedEOD = eodDateTime.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedEOD;
  };

  const handleBusinessDayChange = (index, value) => {
    let newData = [...data];
    newData[index].businessDay = parseInt(value, 10);
    newData[index].eodDate = calculateEOD(
      newData[index].activityDate,
      newData[index].businessDay
    );
    setData(newData);
  };

  const handleCalculateEOD = () => {
    let newData = [...data];
    newData.forEach((row, index) => {
      if (index > 0) {
        const prevRow = newData[index - 1];
        row.activityDate = prevRow.eodDate; // Map EOD of previous row to activity date of current row
        row.eodDate = calculateEOD(row.activityDate, row.businessDay);
      }
    });
    setData(newData);
  };

  return (
    <div>
      <Navbar />
      <div className="prequote">
        <button className="button-15" onClick={handleOkButtonClick}>
          Map Date & Time
        </button>
        <button onClick={handleCalculateEOD}>Calculate EOD</button>{" "}
        {/* Add this button */}
      </div>
      <div className="table-wrapper ml-[30px]">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Activity Name</th>
              <th>Activity Date</th>
              <th>Time</th>
              <th>Business Day</th>
              <th>Expected End Date (EOD)</th>
              <th>Actual End Date (AED)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id}>
                <td>{row.activityName}</td>
                <td>{row.activityDate}</td>
                <td>{row.time}</td>
                <td>
                  <input
                    type="number"
                    value={row.businessDay}
                    onChange={(e) =>
                      handleBusinessDayChange(index, e.target.value)
                    }
                  />
                </td>
                <td>{row.eodDate || "-"}</td>
                <td>{row.aedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Excel;

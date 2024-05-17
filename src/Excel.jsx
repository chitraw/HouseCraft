import React, { useState } from "react";
import Navbar from "../src/Navbar";

function Excel() {
  const [EmailTrigger, setEmailTrigger] = useState(false);
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
    setEmailTrigger(true);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = currentDate.toLocaleTimeString();
    let newData = [...data];
    newData.forEach((row) => {
      row.activityDate = formattedDate;
      row.time = formattedTime;
      row.eodDate = calculateEOD(formattedDate, row.businessDay);
    });
    setData(newData);
  };

  const calculateEOD = (activityDate, businessDay) => {
    const [day, month, year] = activityDate.split("/");
    const parsedDate = new Date(`${month}/${day}/${year}`);
    let eodDateTime = new Date(
      parsedDate.getTime() + businessDay * 24 * 60 * 60 * 1000
    );

    // Skip Sundays
    while (eodDateTime.getDay() === 0) {
      eodDateTime = new Date(eodDateTime.getTime() + 24 * 60 * 60 * 1000);
    }

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
        row.activityDate = prevRow.eodDate;
        row.eodDate = calculateEOD(row.activityDate, row.businessDay);
      }
    });
    setData(newData);
  };

  const handleTriggerMailClick = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = currentDate.toLocaleTimeString();
    let newData = [...data];
    if (newData.length > 1) {
      newData[1].activityDate = formattedDate;
      newData[1].time = formattedTime;
      newData[1].eodDate = calculateEOD(formattedDate, newData[1].businessDay);
    }
    setData(newData);

    // Here you would trigger the email with the pre-request quote content
    // You can use an API or any method you have for sending the email
    console.log("Trigger email with pre-request quote content");
  };

  const handleReceiveMailClick = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = currentDate.toLocaleTimeString();
    let newData = [...data];
    if (newData.length > 2) {
      newData[2].activityDate = formattedDate;
      newData[2].time = formattedTime;
      newData[2].eodDate = calculateEOD(formattedDate, newData[2].businessDay);
    }
    setData(newData);

    // Here you would trigger any additional logic needed when receiving the email
    console.log("Receive email and update the third row");
  };

  const calculateTotalBusinessDays = () => {
    return data.reduce((total, row) => total + row.businessDay, 0);
  };

  return (
    <div>
      <Navbar />
      <div className="prequote flex gap-2">
        <button className="button-15" onClick={handleOkButtonClick}>
          Create Lead
        </button>

        {EmailTrigger && (
          <button className="button-15" onClick={handleTriggerMailClick}>
            Trigger Mail
          </button>
        )}
        {EmailTrigger && (
          <button className="button-15" onClick={handleReceiveMailClick}>
            Receive Mail
          </button>
        )}
        {EmailTrigger && (
          <button className="button-15" onClick={handleCalculateEOD}>
            Calculate EOD
          </button>
        )}
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
                {EmailTrigger && (
                  <td>
                    <input
                      type="number"
                      value={row.businessDay}
                      onChange={(e) =>
                        handleBusinessDayChange(index, e.target.value)
                      }
                    />
                  </td>
                )}
                <td>{row.eodDate || "-"}</td>
                <td>{row.aedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {EmailTrigger && (
          <div className="total-business-days">
            <strong>Total Business Days: </strong>{" "}
            <span className="text-red-600">{calculateTotalBusinessDays()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Excel;

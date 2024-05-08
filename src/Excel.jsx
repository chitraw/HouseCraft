import React, { useState } from "react";
import * as XLSX from "xlsx";

import "./App.css";

function Excel() {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newRow, setNewRow] = useState({
    Column1: "",
    Column2: "",
    Column3: "",
    Column4: "",
    Column5: "",
    Column6: "",
    Column7: "",
    Column8: "",
  });
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleSaveClick = () => {
    setEditingIndex(null);
    // You can update the data in your state or perform other actions here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  const handleAddRow = () => {
    const newDataRow = {
      Column1: newRow.Column1,
      Column2: newRow.Column2,
      Column3: formattedDate, // Assign formattedDate directly
      Column4: formattedTime, // Assign formattedTime directly
      Column5: newRow.Column5,
      Column6: newRow.Column6,
      Column7: newRow.Column7,
      // Column8: newRow.Column8,
    };

    setData((prevData) => [...prevData, newDataRow]);
    setNewRow({
      Column1: "",
      Column2: "",
      Column3: "",
      Column4: "",
      Column5: "",
      Column6: "",
      Column7: "",
      Column8: "",
    });
  };
  const EmailnewRow = {
    name: "John Doe", // Example name
    phone: "123-456-7890", // Example phone number
    email: "johndoe@example.com", // Example email
    message: "Hello, I am interested in a pre-request quote.", // Example message
  };

  const handleSendEmail = () => {
    const subject = "Pre-Request Quote";
    const body = `Name: ${EmailnewRow.name}%0D%0APhone: ${EmailnewRow.phone}%0D%0AEmail: ${EmailnewRow.email}%0D%0AMessage: ${EmailnewRow.message}`;

    const mailtoLink = `mailto:recipient-email@example.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };
  return (
    <div className="Excel">
      <p className="flex justify-end items-center">
        <label htmlFor="fileUpload" className="text-sm">
          Upload Excel File:
        </label>
        <input
          id="fileUpload"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
        <button onClick={handleAddRow}>Add Row</button>
      </p>
      {data.length > 0 && (
        <table className="table" id="customers">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Edit</th>
            </tr>
          </thead>
          <tbody className="input_field_">
            {data.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((key) => (
                  <td key={key}>
                    {editingIndex === index ? (
                      <input
                        className="input_field"
                        type="text"
                        name={key}
                        value={row[key]}
                        onChange={(e) => {
                          const updatedData = [...data];
                          updatedData[index][key] = e.target.value;
                          setData(updatedData);
                        }}
                      />
                    ) : (
                      row[key]
                    )}
                  </td>
                ))}
                <td>
                  {editingIndex !== index ? (
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                  ) : (
                    <button onClick={handleSaveClick}>Save</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ width: "fit-content" }} className="mx-auto shadow-lg p-2">
        <h1 class="text-3xl font-bold text-center mb-8">Pre-Request Quote</h1>
        <div class="max-w-lg mx-auto flex gap-2">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700">
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div class="max-w-lg mx-auto  gap-2">
          <div class="mb-4">
            <label
              for="message"
              class="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
          </div>
        </div>
        <div class="max-w-lg flex justify-end">
          <button
            onClick={handleSendEmail}
            type="button"
            class=" bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Excel;

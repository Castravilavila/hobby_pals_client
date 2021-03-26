import React from "react";

export default function Datatable({ data }) {
  const columns = data[0] && Object.keys(data[0]);

  return (
    <div>
      {data.map((row) => (
        <ul>
          {columns.map((column) => (
            <li>
              <p>{row[column.groupTitle]}</p>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

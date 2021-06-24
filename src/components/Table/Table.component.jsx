import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./table.css";

export default function TableComponent(props) {
  return (
    <div style={{ height: 600, width: "100%", marginBottom: "100px" }}>
      <DataGrid rows={props.rows} columns={props.columns} pageSize={20} />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

export default function TableComponent(props) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={props.rows} columns={props.columns} pageSize={9} />
    </div>
  );
}

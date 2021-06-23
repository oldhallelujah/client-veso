import React, { useState, useEffect } from "react";
import TableComponent from "../../../../components/Table/Table.component";
import getAllCustomer from "../../../../api/adminAPI";

export default function CustomerManager(props) {
  const [storeID, setStoreID] = useState("");
  useEffect(async () => {}, [storeID]);
}

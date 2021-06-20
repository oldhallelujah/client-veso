import React, { useState, useEffect } from "react";
import TableComponent from "../../../../components/Table/Table.component";
import { getStaff } from "../../../../api/adminAPI";
import Chip from "@material-ui/core/Chip";
import slug from "../../../../resources/slug";
import { useHistory } from "react-router-dom";

export default function StaffManager(props) {
  const history = useHistory();
  const [staff, setStaff] = useState([]);
  useEffect(async () => {
    props.handleLoading(true);

    await getStaff().then((res) => {
      setStaff(res.data);
      props.handleLoading(false);
    });
  }, []);

  const handleClick = (id) => {
    history.push({ pathname: slug.detailsStaff, search: `?id=${id}` });
  };
  const columns = [
    { field: "id", headerName: "STT", width: 110 },
    {
      field: "fullName",
      headerName: "Họ tên",
      width: 150,
      renderCell: (fullName) => {
        return (
          <span
            style={{ color: "blue" }}
            onClick={() => {
              handleClick(fullName.row._id);
            }}
          >
            {fullName.row.fullName}
          </span>
        );
      },
    },
    { field: "phoneNumber", headerName: "Số điện thoại", width: 170 },
    { field: "store", headerName: "Cửa hàng", width: 150 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (status) => {
        if (!status.row.status) {
          return (
            <Chip
              variant="outlined"
              size="small"
              style={{ color: "green" }}
              label="Hoạt động"
            />
          );
        } else {
          return (
            <Chip
              variant="outlined"
              size="small"
              color="secondary"
              label="Ngưng hoạt động"
            />
          );
        }
      },
    },
  ];

  const rows = staff.map((e, index) => {
    return {
      id: index + 1,
      _id: e.staff._id,
      fullName: e.staff.fullName,
      phoneNumber: e.staff.phoneNumber,
      store: e.store.storeName,
      block: e.staff.block,
    };
  });
  return (
    <div>
      <div style={{ width: "95%", margin: "0 auto", marginTop: "20px" }}>
        <h3 className="mb-3">Quản lý nhân viên: </h3>

        <TableComponent rows={rows} columns={columns} />
      </div>
    </div>
  );
}

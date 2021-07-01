import React, { useState, useEffect } from "react";
import TableComponent from "../../../../components/Table/Table.component";
import { getStaff } from "../../../../api/adminAPI";
import Chip from "@material-ui/core/Chip";
import slug from "../../../../resources/slug";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteStaff } from "../../../../api/adminAPI";
import ConfirmDelete from "../../../../components/Confirm Delete/ConfirmDelete";

export default function StaffManager(props) {
  const history = useHistory();
  const [staff, setStaff] = useState([]);
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setID] = useState("");
  useEffect(async () => {
    props.handleLoading(true);

    await getStaff().then((res) => {
      setStaff(
        res.data.sort((a, b) => {
          return new Date(b.staff.createAt) - new Date(a.staff.createAt);
        })
      );
      props.handleLoading(false);
    });
  }, [reload]);

  const handleClick = (id) => {
    history.push({ pathname: slug.detailsStaff, search: `?id=${id}` });
  };
  const handleClickDelete = async () => {
    const data = {
      staffID: id,
    };
    setOpen(false);
    props.handleLoading(true);
    await deleteStaff(data).then((res) => {
      setReload(!reload);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickModal = (id) => {
    setID(id);
    setOpen(true);
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
      renderCell: (block) => {
        if (!block.row.block) {
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
    {
      field: "action",
      headerName: "Chức năng",
      width: 145,
      renderCell: (action) => {
        return (
          <DeleteIcon
            style={{ color: "red" }}
            onClick={() => handleClickModal(action.row.action)}
          />
        );
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
      action: e.staff._id,
    };
  });
  return (
    <div>
      <div style={{ width: "95%", margin: "0 auto", marginTop: "20px" }}>
        <h3 className="mb-3">Quản lý nhân viên: </h3>

        <TableComponent rows={rows} columns={columns} />
      </div>
      <ConfirmDelete
        open={open}
        id={id}
        handleClose={handleClose}
        handleClickDelete={handleClickDelete}
      />
    </div>
  );
}

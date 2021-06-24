import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { getConfig, updateConfigPoint } from "../../../../api/adminAPI";

export default function ConfigPoint(props) {
  const [point, setPoint] = useState();
  const [money, setMoney] = useState();
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getConfig().then((res) => {
      setPoint(res.data.pointConfig.point);
      setMoney(res.data.pointConfig.money);

      props.handleLoading(false);
    });
  }, [reload]);

  const handleChange = (event) => {
    if (event.target.name === "money") {
      setMoney(event.target.value);
    } else {
      setPoint(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      point: point,
      money: money,
    };
    console.log(data);
    await updateConfigPoint(data).then((res) => {
      console.log(res);
      setReload(!reload);
    });
  };
  console.log(money);
  return (
    <Grid container spacing={1} className="mt-3" style={{ padding: "15px" }}>
      <div className="title-header">
        <span>Cấu hình tích điểm:</span>
      </div>
      <div className="mt-3" style={{ width: "100%" }}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <p>Số tiền: </p>
            <input
              type="text"
              class="form-control"
              name="money"
              defaultValue={money}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className="mt-4">
            <p>Điểm tích: </p>
            <input
              type="text"
              class="form-control"
              name="point"
              defaultValue={point}
              required
              onChange={handleChange}
            />
          </Grid>
          <div style={{ width: "40%", margin: "0 auto" }} className="mt-4">
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%", padding: "10px" }}
              type="submit"
            >
              Cấu hình
            </Button>
          </div>
        </form>
      </div>
    </Grid>
  );
}

import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { getConfig, updateConfigGift } from "../../../../api/adminAPI";

export default function ConfigGift(props) {
  const [gift, setGift] = useState();
  const [point, setPoint] = useState();
  const [reload, setReload] = useState(false);
  useEffect(async () => {
    props.handleLoading(true);
    await getConfig().then((res) => {
      setGift(res.data.giftConfig.gift);
      setPoint(res.data.giftConfig.point);

      props.handleLoading(false);
    });
  }, [reload]);

  const handleChange = (event) => {
    if (event.target.name === "gift") {
      setGift(event.target.value);
    } else {
      setPoint(event.target.value);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      point: point,
      gift: gift,
    };
    await updateConfigGift(data).then((res) => {
      console.log(data);
      setReload(!reload);
    });
  };
  return (
    <Grid container spacing={1} className="mt-3" style={{ padding: "15px" }}>
      <div className="title-header">
        <span>Cấu hình đổi quà:</span>
      </div>
      <div className="mt-3" style={{ width: "100%" }}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <p>Số điểm: </p>
            <input
              type="text"
              class="form-control"
              name="point"
              defaultValue={point}
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className="mt-4">
            <p>Quà tặng (số vé): </p>
            <input
              type="text"
              class="form-control"
              name="gift"
              defaultValue={gift}
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

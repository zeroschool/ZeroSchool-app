import React, { useState } from "react";
import {
  Typography,
  Button,
  LinearProgress,
  FormControl,
  InputAdornment,
  OutlinedInput
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
export default function Feature(props) {
  const [amount, setAmount] = useState(0.1);
  const [progress, setProgress] = useState(2.18);
  const title = props.title;
  const description = props.description;
  const target = props.target;
  const address = props.address;
  const completed = props.completed;

  const handleChangeAmount = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };
  return (
    <div style={{ marginBottom: "32px", opacity: completed ? "0.5" : "1" }}>
      <div style={{ display: "flex" }}>
        <Typography
          variant="body1"
          style={{
            color: "#000000",
            fontSize: "20px",
            lineHeight: "24px",
            fontWeight: "bold"
          }}
        >
          {title}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        {completed || progress >= 100 ? (
          <LockOpenIcon
            style={{
              color: "#000000",
              width: "24px",
              height: "24px"
            }}
          />
        ) : (
          <LockIcon
            style={{
              color: "#000000",
              width: "24px",
              height: "24px"
            }}
          />
        )}
      </div>
      <Typography
        variant="body1"
        style={{
          color: "#000000",
          fontSize: "16px",
          lineHeight: "20px"
        }}
      >
        {description}
      </Typography>
      <div style={{ display: "flex", marginTop: "16px" }}>
        <Typography
          variant="body1"
          style={{
            color: "#000000",
            fontSize: "16px",
            lineHeight: "20px"
          }}
        >
          Progress
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Typography
          variant="body1"
          style={{
            color: "#000000",
            fontSize: "16px",
            lineHeight: "20px"
          }}
        >
          0/{target} BSV
        </Typography>
      </div>
      <LinearProgress
        color="primary"
        variant="determinate"
        style={{ height: "10px", marginTop: "12px" }}
        value={completed ? 100 : progress}
      ></LinearProgress>
      <div style={{ display: "flex" }}>
        <FormControl
          margin="dense"
          type="submit"
          style={{
            color: "#000000",
            borderRadius: "6px",
            backgroundColor: "#F5F5F5"
          }}
        >
          <OutlinedInput
            type="number"
            min={0}
            style={{
              color: "#000000",
              borderRadius: "6px",
              backgroundColor: "#F5F5F5"
            }}
            id="standard-search"
            variant="outlined"
            value={amount}
            onChange={handleChangeAmount}
            required
            endAdornment={
              <InputAdornment position="end">
                <Typography variant="body1">BSV</Typography>
              </InputAdornment>
            }
            aria-describedby="standard-amount-box"
            inputProps={{
              "aria-label": "amount"
            }}
          />
        </FormControl>
        <div style={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          color="primary"
          style={{
            height: "32px",
            marginTop: "10px",
            marginLeft: "16px",
            textTransform: "none"
          }}
        >
          Pay
        </Button>
      </div>
    </div>
  );
}

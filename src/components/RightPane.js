import React from "react";

export default function RightPane() {
  return (
    <div
      style={{
        top: "0px",
        flex: "1 1 0px",
        height: "100vh",
        position: "sticky",
        maxWidth: "380px",
        minWidth: "300px"
      }}
    >
      <div
        style={{
          top: "0px",
          zIndex: 1000,
          position: "sticky",
          paddingTop: "16px",
          marginBottom: "8px",
          paddingBottom: "16px",
          backgroundColor: "#F5F5F5"
        }}
      >
        <span style={{ height: "60px", width: "319px" }} />
      </div>
      <div
        style={{
          borderRadius: "6px",
          marginBottom: "24px",
          backgroundColor: "#F5F5F5"
        }}
      >
        <span style={{ height: "508px", width: "319px" }} />
      </div>
      <div
        style={{
          borderRadius: "6px",
          marginBottom: "24px",
          backgroundColor: "#F5F5F5"
        }}
      >
        <span style={{ height: "319px", width: "319px" }} />
      </div>
    </div>
  );
}

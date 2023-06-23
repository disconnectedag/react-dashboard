import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

export default ({ capability, environments }) => {
  const envCells = environments.map((envName, idx) => {
    return (
      <TableCell
        key={idx}
        style={{
          minWidth: 100,
          width: "fit-content",
          borderBottom: "none",
          padding: "10px",
          borderTop: "1px solid #8c8989",
          borderBottom: "1px solid #8c8989",
          fontWeight: "bold",
          color: "white",
          backgroundColor: "grey",
        }}
      >
        {" "}
      </TableCell>
    );
  });
  return (
    <TableRow>
    <TableCell
        style={{
        minWidth: 150,
        padding: "10px",
        borderTop: "1px solid #8c8989",
        borderBottom: "1px solid #8c8989",
        borderLeft: "1px solid #8c8989",
        color: "white",
        backgroundColor: "grey",
        }}
    >
        {capability}
    </TableCell>
    {envCells}
    </TableRow>
  );
};

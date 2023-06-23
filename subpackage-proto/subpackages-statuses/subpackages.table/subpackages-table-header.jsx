import React from "react";
import { TableRow, TableCell, TableHead } from "@material-ui/core";

export default ({ packages }) => {
  const envCells = Object.keys(packages).map((pkgName, idx) => {
    return (
      <TableCell
        key={idx}
        style={{
          minWidth: 100,
          whiteSpace: "nowrap",
          width: "fit-content",
          borderBottom: "none",
          padding: "10px",
          border: "1px solid #8c8989",
          fontWeight: "bold",
        }}
      >
        {pkgName}
      </TableCell>
    );
  });
  return (
      <TableRow>
        <TableCell
          style={{
            minWidth: 150,
            padding: "10px",
            border: "1px solid #8c8989",
          }}
        >
          Microservices
        </TableCell>
        {envCells}
      </TableRow>
  );
};

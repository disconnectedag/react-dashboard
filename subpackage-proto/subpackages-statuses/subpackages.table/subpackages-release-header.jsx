import React from "react";
import { TableRow, TableCell, TableHead } from "@material-ui/core";

export default ({ packages }) => {
  const releaseCells = Object.keys(packages).map((pkgName, idx) => {
    return (
      <TableCell
        key={idx}
        style={{
          minWidth: 100,
          width: "fit-content",
          borderBottom: "none",
          padding: "10px",
          border: "1px solid #8c8989",
          fontWeight: "bold",
          textAlign: "center",
          background: "lightgrey"
        }}
      >
        {pkgName.length + ".0.0"}
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
            fontWeight: "bold",
            background: "lightgrey"
          }}
        >
        Latest Release
        </TableCell>
        {releaseCells}
      </TableRow>
  );
};

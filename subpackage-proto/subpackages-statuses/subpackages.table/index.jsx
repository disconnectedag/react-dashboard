import React, { Fragment } from "react";
import { Paper, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import StatusTableHeader from "./subpackages-table-header";
import TrunksTableRows from "./subpackages-table-rows";
import StatusTableSubHeader from "./subpackages-table-subheader";

const styles = {
  tableContainer: {
    overflowX: "scroll",
    marginTop: "64px",
  },
};

export default ({ packages, environments, togglePackageModal, }) => {
 
  return (
    <Paper style={styles.tableContainer} square={true}>
      <Table padding="default">
        <TableBody>
          {Object.keys(packages).map((capabilityKey) => (
            <Fragment key={capabilityKey}>
              <StatusTableSubHeader capability={capabilityKey} environments={environments} />
              <StatusTableHeader packages={packages[capabilityKey]["by-service"]} />
              {Object.keys(packages[capabilityKey]['by-environment']).length > 0 ? Object.keys(packages[capabilityKey]['by-environment']).map((envKey, index) => (
                  <TrunksTableRows
                  key={crypto.randomUUID()}
                  environmentKey={envKey}
                  serviceList={Object.keys(packages[capabilityKey]["by-service"])}
                  capabilityKey={capabilityKey}
                  serviceEnvironments={packages[capabilityKey]['by-environment'][envKey]}
                  ogServiceEnvironments={packages[capabilityKey]['by-service']}
                  environments={environments}
                  togglePackageModal={togglePackageModal}
                  />
              )) : <TableRow key={capabilityKey}><TableCell>No subpackages for {capabilityKey} capability</TableCell>{Object.keys(environments).map((environment) => (<TableCell key={environment}>{" "}</TableCell>))}</TableRow>}
            </Fragment>
            )
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

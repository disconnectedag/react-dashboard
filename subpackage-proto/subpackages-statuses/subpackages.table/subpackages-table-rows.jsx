import React from "react";
import { TableRow, TableCell, Typography } from "@material-ui/core";
import PackagesRowCells from "./subpackages-table-row-cells";

export default ({ capabilityKey, environmentKey, serviceEnvironments, environments, togglePackageModal, ogServiceEnvironments, packages, serviceList }) => {
  // sort service environments by mapping over service List and pass sortedServiceEnvironments to PackageRowCells
  const sortedServiceEnvironments = serviceList.map(service => {
    let addPackage
    serviceEnvironments.packages.forEach(pkg => {
      const splittedPackage = pkg.combinedCapPackEnvTimestamp.split("#");
      const serviceFromPackage = splittedPackage[1];
      if(serviceFromPackage === service){
        addPackage = pkg;
        return
      }
    })
    return addPackage;
  })

  return (
    <TableRow>
      <TableCell>{environmentKey}</TableCell>
      <PackagesRowCells
        key={serviceEnvironments.packages[0].timestamp}
        serviceEnvironments={serviceEnvironments}
        sortedServiceEnvironments={sortedServiceEnvironments}
        environments={environments}
        togglePackageModal={togglePackageModal}
        ogServiceEnvironments={ogServiceEnvironments}
      />
    </TableRow>
  );
};

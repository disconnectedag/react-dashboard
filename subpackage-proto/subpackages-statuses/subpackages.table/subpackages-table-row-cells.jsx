import React from "react";
import { TableCell, Typography } from "@material-ui/core";
import moment from "moment";
import semver from "semver";
import { connect } from "react-redux";
import ConfigVersion from "./subpackages-configVersion"
import clsx from 'clsx'

const styles = {
  tableCell: {
    backgroundColor: "#dedede",
    border: "1px solid #8c8989",
    cursor: "pointer",
    position: "relative",
    padding: 0,
  },
  emptyCell: {
    backgroundColor: "#fafafa",
    border: "1px solid #8c8989",
  },
  canaryStage: {
    fontSize: "14px",
    display: "flex",
    justifyContent: "space-around",
  },
  packageDate: {
    opacity: 0.7,
    fontSize: "14px",
    display: "flex",
    justifyContent: "space-around",
  },
  packageNumber: {
    fontSize: "20px",
    display: "flex",
    justifyContent: "space-around",
    fontWeight: "bold",
  },
  configVersion: {
    fontSize: "14px",
    display: "block",
    textAlign: "center",
    paddingTop: "2px"
  },
};

const exctractEnvPackages = (_envPackages) => {
  let latestPackageInfo = {
    packageNumber: 0,
    timestamp: 0,
  };
  let envPackages = _envPackages["packages"].map((envPackage) => {
    const splittedPackage = envPackage.combinedCapPackEnvTimestamp.split("#");
    const _packageNumber = semver.valid(semver.coerce(splittedPackage[2]));
    const capability = splittedPackage[0];
    const service = splittedPackage[1];
    const environment = splittedPackage[3];
    const timestamp = splittedPackage[4];
    const endTimestamp = envPackage.endTimestamp;
    const canaryStage = envPackage.canaryStage;
    const aggregateDuration = _envPackages["aggregateTimestamps"][_packageNumber];
    const packageInfo = {
      packageNumber: _packageNumber,
      capability,
      service,
      environment,
      timestamp,
      aggregateDuration,
      endTimestamp,
      canaryStage,
    };

    if (latestPackageInfo.timestamp < timestamp) {
      latestPackageInfo = packageInfo;
    }
    return packageInfo;
  });
  return envPackages;
}


const extractPackagesInfo = (_package) => {
  
  const splittedPackage = _package.combinedCapPackEnvTimestamp.split("#");
  const _packageNumber = semver.valid(semver.coerce(splittedPackage[2]));
  const capability = splittedPackage[0];
  const service = splittedPackage[1];
  const environment = splittedPackage[3];
  const timestamp = splittedPackage[4];
  const endTimestamp = _package.endTimestamp;
  const canaryStage = _package.canaryStage;
  const aggregateDuration = _package["deploymentTimestamp"];
  const packageInfo = {
    packageNumber: _packageNumber,
    capability,
    service,
    environment,
    timestamp,
    aggregateDuration,
    endTimestamp,
    canaryStage,
  };

  
  return { packageInfo };
};

export default connect((state) => ({canaryStageName: state.subpackage.canaryStageName}), {})(({
  sortedServiceEnvironments,
  environments,
  togglePackageModal,
  canaryStageName,
  serviceEnvironments,
  ogServiceEnvironments,
}) => {
  return sortedServiceEnvironments.map((envName, index) => {
    let packageStatus;
    const _package = envName;
    const keyId = crypto.randomUUID()
    if (!!_package) {
      const packages = extractPackagesInfo(_package);
      const { packageInfo } = packages;
      const _envPackages = ogServiceEnvironments[packageInfo.service][packageInfo.environment]
      const envPackages = exctractEnvPackages(_envPackages)
      envPackages.sort((a , b) => {
        return parseInt(b.packageNumber) - parseInt(a.packageNumber)
      })
      const packageNumIndex = envPackages.findIndex(pn => pn.packageNumber === packageInfo.packageNumber)
      if(packageNumIndex === 0) {
        packageStatus = 'current'
      } else if(packageNumIndex === 1){
        packageStatus = 'current'
      } else if(packageNumIndex === 2){
        packageStatus = 'twoBehind'
      } else if(packageNumIndex >= 3) {
        packageStatus = 'threeBehind'
      } else if(packageNumIndex === -1){
        packageStatus = 'threeBehind'
      }

      const STYLES = {
        current: {
          backgroundColor: "#1AE352",
          border: "1px solid #8c8989",
          cursor: "pointer",
          position: "relative",
          padding: "2px",
          minWidth: "150px",
        },
        twoBehind: {
          backgroundColor: "#18ACFF",
          border: "1px solid #8c8989",
          cursor: "pointer",
          position: "relative",
          padding: "2px",
          minWidth: "150px",
        },
        threeBehind: {
          backgroundColor: "#FF9649",
          border: "1px solid #8c8989",
          cursor: "pointer",
          position: "relative",
          padding: "2px",
          minWidth: "150px",
        },
        noColor: {
          backgroundColor: "#dedede",
          border: "1px solid #8c8989",
          cursor: "pointer",
          position: "relative",
          padding: "2px",
          minWidth: "150px",
        }
      }

      const condStyles = STYLES[packageStatus]
      
      if (canaryStageName && (canaryStageName === "all" || (packageInfo.canaryStage && canaryStageName.replace(/\s+/g, '') === packageInfo.canaryStage.toLowerCase()))) {
        return (
          <TableCell
            key={keyId}
            style={condStyles}
            onClick={() =>
              togglePackageModal(true, envPackages, packageInfo)
            }
          >
            <span style={styles.packageNumber}>
              PN: {packageInfo.packageNumber}
            </span>
            {<ConfigVersion packageInfo={packageInfo}/> &&
            <Typography style={styles.configVersion}>
            Config Version: {<ConfigVersion packageInfo={packageInfo}/>}
            </Typography>
            }
  
            {packageInfo.canaryStage && <Typography align="center" style={styles.canaryStage}>
              Canary: {packageInfo.canaryStage}
            </Typography>}
            <span style={styles.packageDate}>
              {moment(packageInfo.timestamp * 1000).fromNow()}
            </span>
          </TableCell>
        );
      } else {
        return (
          <TableCell key={keyId} style={styles.emptyCell}>
            {" "}
          </TableCell>
        )
      }
    } else {
      return (
        <TableCell key={keyId} style={styles.emptyCell}>
          {" "}
        </TableCell>
      );
    }
  });
});

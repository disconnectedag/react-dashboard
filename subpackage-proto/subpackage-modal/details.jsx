import React, { Fragment } from "react";
import _ from "lodash";
import { Button, Grid, Paper, Typography, Box, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import JsonToTableComponent from "../../common/jsonToTableComponent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { red, green, yellow, grey } from "@material-ui/core/colors";
import MenuIcon from "@material-ui/icons/Menu";
import { calculateCellStatus } from "../status-styles/status-styles.helpers";
import { uniqArray, sorting } from "../../common/common";
import moment from "moment";
import semver from "semver";

const useStyles = makeStyles(() => ({
  detailsContainer: {
    position: "absolute",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    padding: 20,
    overflowY: "auto",
    maxHeight: "calc(100% - 50px)",
    maxWidth: "calc(100% - 50px)",
    width: "650px",
  },
  latestPackagesContainer: {
    flexBasic: "auto",
    marginBottom: "20px",
    justifyContent: "center",
    display: "flex",
  },
  latestPackages: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "10px",
    justifyContent: "flex-start",
  },
  lateBuildItem: {
    margin: "0 5px",
  },
}));

const styles = {
  prevBuildContainer: {
    textAlign: "center",
  },
  buildsLoader: {
    display: "flex",
    justifyContent: "center",
  },
};

const resultChipStyle = (result, applyChanges = true) => {
  if (!applyChanges) {
    const bgColor =
      result === "OPTIMAL"
        ? "rgb(165, 214, 167)"
        : result === "AT RISK"
        ? "rgb(251, 255, 0)"
        : result === "ERROR"
        ? "rgb(117, 117, 117)"
        : "rgb(229, 115, 115)";
    const color = result === "ERROR" ? "white" : "black";
    return {
      background:
        "repeating-linear-gradient(30deg, " +
        bgColor +
        ", " +
        bgColor +
        " 20px, rgb(200, 200, 200) 20px, rgb(200, 200, 200) 30px)",
      color,
      borderRadius: "4px",
    };
  } else {
    let backgroundColor = red[200];
    if (result === "OPTIMAL") backgroundColor = green[200];
    else if (result === "AT RISK") backgroundColor = yellow[200];
    else if (result === "ERROR") backgroundColor = grey[600];
    const color = result === "ERROR" ? "white" : "black";
    return {
      backgroundColor,
      color,
      lineHeight: 1,
      borderRadius: "4px",
    };
  }
};

const durationToString = ({startTimestamp, endTimestamp, duration}) => {
  if (duration === undefined) {
    const diff = moment(endTimestamp).diff(moment(startTimestamp));
    duration = moment.duration(diff);
  } else {
    duration = moment.duration(duration);
  }
  let formatSpecifier = "";
  if (duration.hours() > 0) {
    formatSpecifier += duration.hours() + " [hours] ";
  }
  if (duration.hours() > 0 || duration.minutes() > 0) {
    formatSpecifier += duration.minutes() + " [minutes] ";
  }
  formatSpecifier += duration.seconds() + " [seconds]";
  return moment.utc(duration.asMilliseconds()).format(formatSpecifier);
};

export default React.forwardRef(
  (
    {
      envPackages,
      latestPackageInfo,
      packageLatestBuild,
      packageSelectedBuild,
      isLoading,
      togglePackageDeploymentsModal,
      togglePackageModal,
      getPackageSelectedBuild,
    },
    ref
  ) => {
    const classes = useStyles();
    const { packageNumber, capability, service, timestamp } = latestPackageInfo;
    packageSelectedBuild.configVersion = packageSelectedBuild.configVersion
    delete packageLatestBuild.params;
    delete packageSelectedBuild.params;
    const [_packageNumber, setPackageNumber] = React.useState(packageNumber);
    const [_timestamp, setTimestamp] = React.useState(timestamp);

    const _latestPackages = JSON.parse(JSON.stringify(envPackages)).sort(sorting("timestamp"));
    console.log(_latestPackages)

    const handleButtonClick = (packageNumber, timestamp) => {
      setPackageNumber(packageNumber);
      setTimestamp(timestamp);
      const selectedPackageInfo = _.find(_latestPackages, {packageNumber, timestamp});
      getPackageSelectedBuild(selectedPackageInfo);
    };

    return (
      <Paper className={classes.detailsContainer}>
        <Box direction="column">
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">Package</Typography>
            <Box
              style={{ display: "inline-flex", cursor: "pointer" }}
              onClick={() => {
                togglePackageModal(false);
                togglePackageDeploymentsModal(true, packageSelectedBuild);
              }}
            >
              <Typography variant="h6" component="h1">
                Deployments{" "}
              </Typography>
              <MenuIcon style={{ fontSize: "34px" }} />
            </Box>
          </Box>
          <Fragment>
          <Grid item xs={12}>
              <Typography variant="h6">Deployments:</Typography>
            </Grid>
            <Grid className={classes.latestPackages} item xs={12}>
              {_latestPackages.slice(0, 5).map((latePackage, idx) => {
                // console.log(latePackage)
                if (latePackage.packageNumber) {
                  return (
                    <Grid
                      key={idx}
                      className={classes.lateBuildItem}
                      style={{
                        borderBottom:
                          (semver.eq(latePackage.packageNumber, _packageNumber)
                            && latePackage.timestamp === _timestamp)
                            ? "4px solid blue"
                            : "",
                        paddingBottom: "4px",
                      }}
                    >
                      <Tooltip title={moment(latePackage.timestamp * 1000).format('L LTS')} arrow>
                        <Button
                          onClick={() => handleButtonClick(latePackage.packageNumber, latePackage.timestamp)}
                          style={{
                            ...styles.prevBuildContainer,
                            ...resultChipStyle(
                              calculateCellStatus(latePackage).displayResult,
                              _.get(latePackage, "params.ApplyChanges", true)
                            ),
                            height: "40px",
                          }}
                        >
                          PN: {latePackage.packageNumber}
                        </Button>
                      </Tooltip>
                    </Grid>
                  );
                }
                return null;
              })}
            </Grid>
          </Fragment>
          <Divider style={{ marginBottom: 10 }} />
          <Grid
            container
            display="flex"
            direction="row"
            justifyContent="space-between"
          >
            <Typography>Capability: {capability}</Typography>
            <Typography>Service: {service}</Typography>
            <Typography>Package Number: {_packageNumber}</Typography>
            <Typography>Duration: {durationToString({startTimestamp: packageSelectedBuild.deploymentTimestamp, endTimestamp: packageSelectedBuild.endTimestamp})}</Typography>
            <Typography>Aggregate Duration: {durationToString({duration: packageSelectedBuild.aggregateDuration})}</Typography>
          </Grid>
        </Box>
        <Box
          style={{
            padding: "10px",
            marginTop: "0px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {!isLoading ? (
            Object.keys(packageSelectedBuild).length > 0 ? (
              <JsonToTableComponent data={packageSelectedBuild} />
            ) : (
              <Typography variant="h4">No data to display.</Typography>
            )
          ) : (
            <CircularProgress
              style={{
                width: "100px",
                height: "100px",
              }}
              color="secondary"
            />
          )}
        </Box>
      </Paper>
    );
  }
);

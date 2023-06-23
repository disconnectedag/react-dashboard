import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import MenuIcon from "@material-ui/icons/Menu";
import { sorting } from "../../common/common";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
    cursor: "pointer",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
const extractPackagesInfo = (_package) => {
  return _package.packages.map((envPackage) => {
    const splittedPackage = envPackage.combinedCapPackEnvTimestamp.split("#");
    const _packageNumber = splittedPackage[1];
    const capability = splittedPackage[0];
    const environment = splittedPackage[2];
    return {
      packageNumber: _packageNumber,
      capability,
      environment,
      deploymentTimestamp: envPackage.deploymentTimestamp,
    };
  });
};

export default ({
  packages,
  togglePackageModal,
  params,
  togglePackageDeploymentsModal,
}) => {
  const classes = useStyles();
  const { environment, capability } = params;
  const packagesInfo =
    packages[capability] && packages[capability][environment]
      ? extractPackagesInfo(packages[capability][environment]).sort(
          sorting("deploymentTimestamp")
        )
      : [];
  return (
    <Grid
      style={{
        width: "calc(80vw - 47px)",
        marginTop: "60px",
      }}
    >
      <Container>
        <Timeline align="alternate">
          {packagesInfo.map((packageInfo) => {
            return (
              <TimelineItem
                key={packageInfo.deploymentTimestamp}
                style={{ marginBottom: "20px" }}
              >
                <TimelineOppositeContent>
                  <Typography variant="h6" component="h1">
                    {moment(packageInfo.deploymentTimestamp).fromNow()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {moment(packageInfo.deploymentTimestamp).format(
                      "MMM DD YYYY"
                    )}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {moment(packageInfo.deploymentTimestamp).format("HH:mm zz")}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot></TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper
                    elevation={3}
                    className={classes.paper}
                    onClick={() => {
                      togglePackageModal(true, packages, packageInfo);
                    }}
                  >
                    <Typography variant="h6" component="h1">
                      <span style={{ opacity: 0.7 }}>Capability:</span>{" "}
                      {packageInfo.capability}
                    </Typography>
                    <Typography variant="h6" component="h1">
                      <span style={{ opacity: 0.7 }}>Environment:</span>{" "}
                      {packageInfo.environment}
                    </Typography>
                    <Typography variant="h6" component="h1">
                      <span style={{ opacity: 0.7 }}>Package Number:</span>{" "}
                      {packageInfo.packageNumber}
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={3}
                    style={{ marginTop: 10 }}
                    className={classes.paper}
                    onClick={() => {
                      togglePackageDeploymentsModal(true, packageInfo);
                    }}
                  >
                    <Box style={{ display: "inline-flex" }}>
                      <Typography variant="h6" component="h1">
                        Deployments{" "}
                      </Typography>
                      <MenuIcon style={{ fontSize: "34px" }} />
                    </Box>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Container>
    </Grid>
  );
};

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
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
import { connect } from "react-redux";
import {
  getSummaryByCapability,
  getSummaryByCapabilityAndService,
  getSummaryByCapabilityAndServiceAndEnvPackageCreatedFrom,
} from "../../redux/actions/subpackage.actions";
import { Link, useParams } from "react-router-dom";
import AppBar from "../../side.drawer/app.bar";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default connect(
  (state) => {
    return {
      packageSummary: state.subpackage.packageSummary,
    };
  },
  { getSummaryByCapability, getSummaryByCapabilityAndService, getSummaryByCapabilityAndServiceAndEnvPackageCreatedFrom }
)(
  ({
    match,
    getSummaryByCapability,
    getSummaryByCapabilityAndService,
    getSummaryByCapabilityAndServiceAndEnvPackageCreatedFrom,
    packageSummary,
  }) => {
    let { capability, service, envPackageCreatedFrom } = useParams();
    const classes = useStyles();
    useEffect(() => {
      if (!!capability && !!service && !!envPackageCreatedFrom) {
        getSummaryByCapabilityAndServiceAndEnvPackageCreatedFrom(
          capability,
          service,
          envPackageCreatedFrom
        );
      } else if (!!capability && !!service) {
        getSummaryByCapabilityAndService(
          capability,
          service
        );
      } else {
        getSummaryByCapability(capability);
      }
    }, [match]);
    return (
      <Grid style={{ width: "-webkit-fill-available" }}>
        <AppBar>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <Typography variant="h5">Subpackages Created</Typography>
            {packageSummary.environment && (
              <Typography variant="h5">
                Environment: {packageSummary.environment}
              </Typography>
            )}
            {envPackageCreatedFrom && (
              <Typography variant="h5">
                Env Subpackage Created From: {envPackageCreatedFrom}
              </Typography>
            )}
            {capability && (
              <Typography variant="h5">Capability: {capability}</Typography>
            )}
            <Typography variant="h5">Count: {packageSummary.Count}</Typography>
          </Box>
        </AppBar>
        <Container style={{ marginTop: "60px" }}>
          <Timeline align="alternate">
            {packageSummary.Count > 0 &&
              packageSummary.Items.filter((summary) => (
                (summary.combinedPackageId.match(/#/g) || []).length === 2
              )).map((summary) => {
                const extractedCombinedPackageId = summary.combinedPackageId.split(
                  "#"
                );
                return (
                  <TimelineItem
                    key={summary.createdTimestamp}
                    style={{ marginBottom: "20px" }}
                  >
                    <TimelineOppositeContent>
                      <Typography
                        variant="h6"
                        component="h1"
                        color="textSecondary"
                      >
                        {moment(summary.createdTimestamp).format("MMM DD YYYY")}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {moment(summary.createdTimestamp).format("HH:mm zz")}
                      </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot></TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Paper elevation={3} className={classes.paper}>
                        <Link
                          to={`/subpackages/created-from/${packageSummary.capability}/${extractedCombinedPackageId[1]}/${extractedCombinedPackageId[2]}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography variant="h6" component="h1">
                            {summary.envPackageCreatedFrom}
                          </Typography>
                          <Typography>{summary.combinedPackageId}</Typography>
                          <Typography>{summary.configVersion}</Typography>
                        </Link>
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
          </Timeline>
        </Container>
      </Grid>
    );
  }
);

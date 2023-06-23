import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getDetailByCapabilityAndServiceAndPackageVersion } from "../../redux/actions/subpackage.actions";
import AppBar from "../../side.drawer/app.bar";
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
    width: "80%",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default connect(
  (state) => {
    return {
      packageDetail: state.subpackage.packageDetail,
    };
  },
  { getDetailByCapabilityAndServiceAndPackageVersion }
)(({ match, getDetailByCapabilityAndServiceAndPackageVersion, packageDetail }) => {
  const classes = useStyles();
  const { capability, service, packageVersion } = useParams();
  useEffect(() => {
    if (!!capability && !!service && !!packageVersion) {
      getDetailByCapabilityAndServiceAndPackageVersion(capability, service, packageVersion);
    }
  }, [match]);

  const approvedFor =
    packageDetail.approval &&
    packageDetail.approval.length > 0 &&
    packageDetail.approval
      .map((envs) => {
        if (envs.ApprovalStatus === "approve" && !!envs.Environment) {
          return envs.Environment;
        }
        return "";
      })
      .join(", ");

  const unapprovedFor =
    packageDetail.approval &&
    packageDetail.approval.length > 0 &&
    packageDetail.approval
      .map((envs) => {
        if (envs.ApprovalStatus === "unapprove" && !!envs.Environment) {
          return envs.Environment;
        }
        return "";
      })
      .join(", ");

  return (
    <Grid style={{ width: "-webkit-fill-available" }}>
      <AppBar>
        {capability && (
          <Typography variant="h5">Capability: {capability}</Typography>
        )}
        {packageDetail.Count > 0 && (
          <Typography variant="h5">
            Environment: {packageDetail.Items[0].envPackageCreatedFrom}
          </Typography>
        )}
        {packageVersion && (
          <center>
            <Typography variant="h5">
              Package Version: {packageVersion}
            </Typography>
          </center>
        )}
        <Typography variant="h5">Count: {packageDetail.Count}</Typography>
        {!!approvedFor && approvedFor.length > 2 && (
          <Typography variant="h6">Approved for: {approvedFor}</Typography>
        )}
        {!!unapprovedFor && unapprovedFor.length > 2 && (
          <Typography variant="h6">Unapproved for: {unapprovedFor}</Typography>
        )}
      </AppBar>
      <Container style={{ marginTop: "60px" }}>
        <List>
          {packageDetail.Count > 0 &&
            packageDetail.Items.map((detail) => {
              return (
                <ListItem
                  key={detail.createdTimestamp}
                  style={{ minWidth: "100%", padding: "10px 0" }}
                >
                  <Paper elevation={3} className={classes.paper}>
                    {detail.applicationName && (
                      <Typography variant="h5" component="h1">
                        {detail.applicationName}
                      </Typography>
                    )}
                    {detail.combinedPackageId && (
                      <Typography>
                        <strong>Combined Package Id: </strong>
                        {detail.combinedPackageId}
                      </Typography>
                    )}
                    {detail.configVersion && (
                      <Typography>
                        <strong>Config Version: </strong>
                        {detail.configVersion}
                      </Typography>
                    )}
                    {detail.applicationVersion && (
                      <Typography>
                        <strong>Application Version: </strong>
                        {detail.applicationVersion}
                      </Typography>
                    )}
                    {detail.infrastructureVersion && (
                      <Typography>
                        <strong>Infrastructure Version: </strong>
                        {detail.infrastructureVersion}
                      </Typography>
                    )}
                    {detail.openTestVersion && (
                      <Typography>
                        <strong>Open Test Version: </strong>
                        {detail.openTestVersion}
                      </Typography>
                    )}
                    {detail.tfConfigVersion && (
                      <Typography>
                        <strong>tf Config Version: </strong>
                        {detail.tfConfigVersion}
                      </Typography>
                    )}
                  </Paper>
                </ListItem>
              );
            })}
        </List>
      </Container>
    </Grid>
  );
});

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
    width: "100%",
  },
  list: {
    padding: "0",
    width: "100%",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
const generateBackgroundColor = (deploymentStatus) => {
  switch (deploymentStatus) {
    case "SUCCESS":
      return "#beecbf";
    case "UNSTABLE":
      return "#fff9c4";
    case "SKIPPED":
      return "#c8e6c9";
    case "FAILURE":
      return "#ffcdd3";
    default:
      return "";
  }
};
export default ({ packageDeployments }) => {
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const filteredPackageDeployments = packageDeployments.filter(
    (deployment) =>
      !selectedValue || deployment.deploymentStatus === selectedValue
  );
  return (
    <div style={{ width: "100%" }}>
      <Divider />
      <FormGroup row>
        <FormControlLabel
          control={
            <Radio
              checked={selectedValue === ""}
              onChange={handleChange}
              value=""
              color="primary"
            />
          }
          label="ALL"
        />
        <FormControlLabel
          control={
            <Radio
              checked={selectedValue === "SUCCESS"}
              onChange={handleChange}
              value="SUCCESS"
              color="primary"
            />
          }
          label="SUCCESS"
        />
        <FormControlLabel
          control={
            <Radio
              checked={selectedValue === "UNSTABLE"}
              onChange={handleChange}
              value="UNSTABLE"
              color="primary"
            />
          }
          label="UNSTABLE"
        />
        <FormControlLabel
          control={
            <Radio
              checked={selectedValue === "SKIPPED"}
              onChange={handleChange}
              value="SKIPPED"
              color="primary"
            />
          }
          label="SKIPPED"
        />
        <FormControlLabel
          control={
            <Radio
              checked={selectedValue === "FAILURE"}
              onChange={handleChange}
              value="FAILURE"
              color="primary"
            />
          }
          label="FAILURE"
        />
      </FormGroup>
      <List className={classes.list}>
        {filteredPackageDeployments.length ? filteredPackageDeployments.map((deployment) => {
          const {
            applicationName,
            applicationVersion,
            combinedBuildId,
            combinedCapPackEnvAppId,
            configVersion,
            deployedBy,
            deploymentStatus,
            deploymentTimestamp,
            infrastructureVersion,
            openTestVersion,
            tfConfigVersion,
          } = deployment;
          return (
            <ListItem
              key={deployment.deploymentTimestamp}
              style={{
                width: "100%",
                padding: "10px 0",
              }}
            >
              <Paper
                elevation={3}
                className={classes.paper}
                style={{
                  backgroundColor: generateBackgroundColor(deploymentStatus),
                }}
              >
                {applicationName && (
                  <Typography variant="h6" component="h4">
                    <span style={{ fontWeight: "bold" }}>
                      Application Name:
                    </span>{" "}
                    {applicationName}
                  </Typography>
                )}
                {applicationVersion && (
                  <Typography variant="h6" component="h4">
                    <span style={{ fontWeight: "bold" }}>
                      Application Version:{" "}
                    </span>
                    {applicationVersion}
                  </Typography>
                )}
                {combinedBuildId && (
                  <Typography variant="h6" component="h4">
                    <span style={{ fontWeight: "bold" }}>
                      Combined Build Id:{" "}
                    </span>
                    {combinedBuildId}
                  </Typography>
                )}
                {combinedBuildId && (
                  <Typography variant="h6" component="h4">
                    <span style={{ fontWeight: "bold" }}>
                      Combined Build Id:{" "}
                    </span>
                    {combinedBuildId}
                  </Typography>
                )}
                {combinedCapPackEnvAppId && (
                  <Typography variant="h6" component="h4">
                    <span style={{ fontWeight: "bold" }}>
                      Combined CapPackEnvApp Id:
                    </span>{" "}
                    {combinedCapPackEnvAppId}
                  </Typography>
                )}
                {configVersion && (
                  <Typography variant="h6" component="h4">
                    <span style={{ fontWeight: "bold" }}>Config Version:</span>{" "}
                    {configVersion}
                  </Typography>
                )}
                {deployedBy && (
                  <Typography variant="h6" component="h4">
                    <span style={{ fontWeight: "bold" }}>Deployed By:</span>{" "}
                    {deployedBy}
                  </Typography>
                )}
                {deploymentStatus && (
                  <Typography variant="h6" component="h4">
                    <span style={{ fontWeight: "bold" }}>
                      Deployment Status:
                    </span>{" "}
                    {deploymentStatus}
                  </Typography>
                )}
                {deploymentTimestamp && (
                  <Typography variant="h6" component="h4">
                    <span style={{ fontWeight: "bold" }}>
                      Deployment Timestamp:
                    </span>{" "}
                    {moment(deploymentTimestamp).format(
                      "dddd, MMMM Do YYYY, h:mm:ss a"
                    )}
                  </Typography>
                )}
                {infrastructureVersion && (
                  <Typography variant="h6" component="h4">
                    <span style={{ fontWeight: "bold" }}>
                      Infrastructure Version:
                    </span>{" "}
                    {infrastructureVersion}
                  </Typography>
                )}
                {openTestVersion && (
                  <Typography variant="h6" component="h4">
                    <span style={{ fontWeight: "bold" }}>Open Test Version:</span>{" "}
                    {openTestVersion}
                  </Typography>
                )}
                {tfConfigVersion && (
                  <Typography variant="h6" component="h4">
                    <span style={{ fontWeight: "bold" }}>TF Config Version:</span>{" "}
                    {tfConfigVersion}
                  </Typography>
                )}
              </Paper>
            </ListItem>
          );
        }) : (
          <Paper
            elevation={3}
            className={classes.paper}
          >
            <Typography variant="body1" align="center">
              No deployments exist for this package with state {selectedValue}.
            </Typography>
          </Paper>
        )}
      </List>
    </div>
  );
};

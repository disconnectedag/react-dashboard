import React from "react";
import { Grid, Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import PackageDeploymentsComponent from "../subpackage-deployments/subpackage.deployments";

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
    width: "1000px",
  },
}));

export default React.forwardRef(
  ({ packageInfo, packageDeployments, isLoading }, ref) => {
    const classes = useStyles();
    const { packageVersion, capability, environmentDeployedTo, combinedCapPackEnvTimestamp } = packageInfo;
    const timestamp = combinedCapPackEnvTimestamp.split('#')[3];
    ;
    const { Count } = packageDeployments;
    return (
      <Paper className={classes.detailsContainer}>
        <Box direction="column">
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">Package Deployments</Typography>
            <Typography variant="h6">
              <a
                href={`/subpackage/deployments/${capability}/${capability}/${environmentDeployedTo}/${packageVersion}/${timestamp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View In a New Page
              </a>
            </Typography>
          </Box>
          <Divider style={{ marginBottom: 10 }} />
          <Grid
            container
            display="flex"
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="h6" component="h4">
              <span style={{ fontWeight: "bold" }}>Capability: </span>
              {capability}
            </Typography>
            <Typography variant="h6" component="h4">
              <span style={{ fontWeight: "bold" }}>
                Environment Deployed To:{" "}
              </span>
              {environmentDeployedTo}
            </Typography>
            <Typography variant="h6" component="h4">
              <span style={{ fontWeight: "bold" }}>Package Number: </span>
              {packageVersion}
            </Typography>
            <Typography variant="h6" component="h4">
              <span style={{ fontWeight: "bold" }}>Count: </span>
              {Count}
            </Typography>
          </Grid>
        </Box>
        <Box
          style={{
            marginTop: "0px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {!isLoading ? (
            packageDeployments.Count > 0 ? (
              <PackageDeploymentsComponent
                packageDeployments={packageDeployments.packageDeployments}
              />
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

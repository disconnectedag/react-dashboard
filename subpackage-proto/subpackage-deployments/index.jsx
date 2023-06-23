import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Grid, Typography, Box } from "@material-ui/core";
import PackageDeploymentsComponent from "./package.deployments";
import { connect } from "react-redux";
import { getPackageDeployments } from "../../redux/actions/package.actions";
import AppBar from "../../side.drawer/app.bar";
import { useParams } from "react-router-dom";

export default connect(
  (state) => {
    return {
      packageDeployments: state.package.packageDeployments || { Count: 0 },
      isLoading: state.actionController.isLoading,
    };
  },
  { getPackageDeployments }
)(({ match, getPackageDeployments, packageDeployments, isLoading }) => {
  useEffect(() => {
    const { capability, environmentDeployedTo, packageVersion, deploymentTimestamp } = useParams();
    getPackageDeployments({
      packageVersion,
      capability,
      environment: environmentDeployedTo,
      timestamp: deploymentTimestamp,
      combinedCapPackEnvTimestamp: capability + '#' + packageVersion + '#' + environmentDeployedTo + '#' + deploymentTimestamp,
    });
  }, [match]);
  
  const { Count, environmentDeployedTo, packageVersion, capability } = packageDeployments;
  return (
    <Grid style={{ width: "-webkit-fill-available" }}>
      <AppBar>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h6" component="h4">
            <span>Capability: </span>
            {capability}
          </Typography>
          <Typography variant="h6" component="h4">
            <span>Environment Deployed To: </span>
            {environmentDeployedTo}
          </Typography>
          <Typography variant="h6" component="h4">
            <span>Package Number: </span>
            {packageVersion}
          </Typography>
          <Typography variant="h6" component="h4">
            <span>Count: </span>
            {Count}
          </Typography>
        </Box>
      </AppBar>
      <Container style={{ marginTop: "70px" }}>
        {!isLoading &&
          (packageDeployments.Count > 0 ? (
            <PackageDeploymentsComponent
              packageDeployments={packageDeployments.packageDeployments}
            />
          ) : (
            <Box
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Typography variant="h4">No data to display.</Typography>
            </Box>
          ))}
      </Container>
    </Grid>
  );
});

import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import KeysHeader from "../subpackages.table/subpackages-keys-header"

const useStyles = makeStyles(() => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    width: `100%`,
    position: "fixed",
  },
  flexGrow: {
    display: "flex",
    padding: 5,
    justifyContent: "space-between",
    flexWrap: "wrap",
    whiteSpace: "nowrap"
  },
}));
export default () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Box className={classes.flexGrow} >
        <Typography className={classes.title} variant="h5" color="inherit">
          Packages Deployed
        </Typography>
      </Box>
      <KeysHeader />
    </Fragment>
  );
};

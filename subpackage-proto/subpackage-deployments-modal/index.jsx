import React from "react";
import { Modal } from "@material-ui/core";
import Details from "./details";

export default ({
  isOpen,
  togglePackageDeploymentsModal,
  packageDeployments,
  packageInfo,
  isLoading,
}) => {
  return isOpen ? (
    <Modal open={isOpen} onClose={() => togglePackageDeploymentsModal(false)}>
      <Details
        packageDeployments={packageDeployments}
        isLoading={isLoading}
        packageInfo={packageInfo}
      />
    </Modal>
  ) : null;
};

import React from "react";
import { Modal } from "@material-ui/core";
import Details from "./details";

export default ({
  isOpen,
  togglePackageModal,
  envPackages,
  latestPackageInfo,
  packageLatestBuild,
  packageSelectedBuild,
  isLoading,
  togglePackageDeploymentsModal,
  getPackageSelectedBuild,
}) => {
  return isOpen ? (
    <Modal open={isOpen} onClose={() => togglePackageModal(false)}>
      <Details
        envPackages={envPackages}
        latestPackageInfo={latestPackageInfo}
        packageLatestBuild={packageLatestBuild}
        packageSelectedBuild={packageSelectedBuild}
        isLoading={isLoading}
        togglePackageDeploymentsModal={togglePackageDeploymentsModal}
        togglePackageModal={togglePackageModal}
        getPackageSelectedBuild={getPackageSelectedBuild}
      />
    </Modal>
  ) : null;
};

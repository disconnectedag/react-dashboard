import React, { useEffect } from "react";
import Header from "./header";
import AppBar from "../../side.drawer/app.bar";
import { connect } from "react-redux";
import {
  getPackages,
  togglePackageModal,
  searchPackages,
  togglePackageDeploymentsModal,
  getPackageSelectedBuild,
} from "../../redux/actions/subpackage.actions";
import PackagesTable from "./subpackages.table";
import PackageModalComponent from "../subpackage-modal";
import EnvPackages from "./env.subpackages";
import PackageDeploymentsModal from "../subpackage-deployments-modal";
import { useParams } from "react-router-dom";

function mapStateToProps(state) {
  return {
    packages: state.package.searchPackagesResults || {},
    environments: state.package.searchEnvironmentsResults || [],
    isLoading: state.actionController.isLoading,
    packageModal: state.packageModal,
    packageLatestBuild: state.package.packageLatestBuild || {},
    packageSelectedBuild: state.package.packageSelectedBuild || {},
    packageDeployments: state.package.packageDeployments || { Count: 0 },
    packageDeploymentsModal: state.packageDeploymentsModal,
  };
}

export default connect(mapStateToProps, {
  getPackages,
  togglePackageModal,
  searchPackages,
  togglePackageDeploymentsModal,
  getPackageSelectedBuild,
})(
  ({
    isLoading,
    packages,
    environments,
    getPackages,
    togglePackageModal,
    packageModal,
    packageLatestBuild,
    packageSelectedBuild,
    match,
    searchPackages,
    packageDeploymentsModal,
    packageDeployments,
    togglePackageDeploymentsModal,
    getPackageSelectedBuild,
  }) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const params = useParams();
    useEffect(() => {
      getPackages(params);
      setIsLoaded(true);
    }, [isLoaded]);

    useEffect(() => {
      searchPackages(params);
    }, [params]);
    const { environment } = params;
    return (
      <div>
        <AppBar>
          <Header />
        </AppBar>
        {environments.length > 0 && !environment ? (
          <PackagesTable
            packages={packages}
            environments={environments}
            isLoading={isLoading}
            togglePackageModal={togglePackageModal}
            packageSelectedBuild={packageSelectedBuild}
            getPackageSelectedBuild={getPackageSelectedBuild}
          />
        ) : (
          <EnvPackages
            packages={packages}
            togglePackageModal={togglePackageModal}
            togglePackageDeploymentsModal={togglePackageDeploymentsModal}
            params={params}
          />
        )}

        <PackageModalComponent
          isOpen={packageModal.isOpen}
          envPackages={packageModal.envPackages}
          latestPackageInfo={packageModal.latestPackageInfo}
          togglePackageModal={togglePackageModal}
          packageLatestBuild={packageLatestBuild}
          packageSelectedBuild={packageSelectedBuild}
          togglePackageDeploymentsModal={togglePackageDeploymentsModal}
          getPackageSelectedBuild={getPackageSelectedBuild}
          isLoading={isLoading}
        />
        <PackageDeploymentsModal
          isOpen={packageDeploymentsModal.isOpen}
          packageInfo={packageDeploymentsModal.packageInfo}
          togglePackageDeploymentsModal={togglePackageDeploymentsModal}
          packageDeployments={packageDeployments}
          isLoading={isLoading}
        />
      </div>
    );
  }
);

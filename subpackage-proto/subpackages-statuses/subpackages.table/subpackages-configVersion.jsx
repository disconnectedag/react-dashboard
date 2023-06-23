import React from 'react';
import { httpClient3 } from "../../../common/http.client";
import { config } from 'process';

const getConfigVersion = async (packageInfo) => {
    try{
      const packageDetail = await httpClient3.get(`/subpackage/combined-cap-pack-env/${packageInfo.capability}/${packageInfo.service}/${packageInfo.environment}/${packageInfo.packageNumber}/${packageInfo.timestamp}`)
      return packageDetail
    }
    catch(error){
      console.error(error)
    }
  }

export default ({packageInfo}) => {
  const [configVersion, setConfigVersion] = React.useState('')
  React.useMemo(() => {
    let isMounted = true;

    if(!!packageInfo){
      const packageDetail = getConfigVersion(packageInfo)
      packageDetail.then(data => {
      if(isMounted){
        if(!!data){
          setConfigVersion(data?.data?.configVersion)
        } 
      }
        })
      }

      return () => {
        isMounted = false;
      }

    }, [packageInfo])
    

      return `${configVersion ?? 'Empty'}`
}
import _ from 'lodash';
import {
    CheckCircle as SuccessIcon,
    Cancel as FailureIcon,
    Error as WarningIcon,
    Block as ErrorIcon
} from '@material-ui/icons';
import { grey, green, red, yellow } from '@material-ui/core/colors';
//import { getOpenTestStatus } from '../deploy-statuses.helpers';
//import {deployment} from "./deployment-thresholds.rules";

//const statusRules = deployment.tests.phase1;

export const calculateCellStatus = (deployment) => {
    const {
        result,
        lastBuildResult,
        progressStatus,
    } = deployment || {};
    let statusColor = green[100];
    let cellTextColor = grey[800];
    let iconColor = grey[800];
    let StatusIcon = () => null;
    let displayResult = result || lastBuildResult;
    const cellClass = progressStatus === 'RUNNING' ? 'in_progress' : '';
    const testStatus = false; //getOpenTestStatus(deployment);

    if (testStatus) {
        /*const testPassRatio = testStatus.testTotalCount > 0 ? testStatus.testPassCount / testStatus.testTotalCount : 1;
        if (displayResult !== "FAILURE") {
            displayResult = 'OPTIMAL';
            _.find(statusRules.testCount, testCase => {
                if (testStatus.testTotalCount < testCase.threshold) {
                    displayResult = testCase.status;
                    return true;
                }
            });
            _.find(statusRules.testPass, testCase => {
                if (testPassRatio < testCase.threshold) {
                    displayResult = testCase.status;
                    return true;
                }
            });
        } else if (displayResult === 'FAILURE' && testStatus.testPassCount >= testStatus.testTotalCount) {
            displayResult = 'ERROR';
        } else {
            displayResult = 'FAILING';
        }*/
    } else if (displayResult === 'UNSTABLE' || displayResult === 'SUCCESS') {
        displayResult = 'AT RISK';
    } else {
        displayResult = 'ERROR';
    }

    if (displayResult === 'OPTIMAL') {
        statusColor = green[100];
        StatusIcon = SuccessIcon;
    } else if (displayResult === 'AT RISK') {
        statusColor = yellow[100];
        StatusIcon = WarningIcon;
    } else if (displayResult === 'FAILING') {
        statusColor = red[100];
        StatusIcon = FailureIcon;
    } else if (displayResult === 'ERROR') {
        statusColor = grey[600];
        cellTextColor = 'white';
        iconColor = 'white';
        StatusIcon = ErrorIcon;
    }

    return {
        displayResult,
        StatusIcon,
        cellStyle: {
            color: cellTextColor,
            backgroundColor: statusColor,
            cursor: !!result ? 'pointer': 'auto',
        },
        iconStyle: {
            color: iconColor
        },
        cellClass
    }
};

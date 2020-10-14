import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { message as notify } from "antd";
import StepWizard from "react-step-wizard";

// Styles
import styles from "./styles/addJob.module.scss";

// Components
import HeaderDark from "~components/common/HeaderDark";
import { Nav } from "~components/wizard";
import { Step1, Step2, Step3, Step4 } from "./addJobSteps";

// Actions
import getJobTypes from "./actions/getJobTypes";
import createJob from "./actions/createJob";

class AddJob extends Component {
  render() {

    const { history, addJobData, userData } = this.props;
    const isForApplicaiton = addJobData?.type === "easy";
    const hasUserPro = userData?.Company?.plan;
    return (
      <div>
        <HeaderDark />
        <div className={styles.head}>{/* <h1>Add Job</h1> */}</div>

        <div className={styles.step_container}>
          {/* <StepWizard
            isHashEnabled={true}
            // onStepChange={this.onStepChange}
            initialStep={0}
            nav={
              <Nav setTitle={["Post details", "General post settings", "Job quizz"]} />
            }
            instance={instance => {
              this.setState({
                wizardRef: instance
              });
            }}> */}
            {/* <Step1 hashKey='step1' /> */}
            <Step2 history={history}/>
            {/* {isForApplicaiton && !hasUserPro && <Step3 hashKey='step3' />} */}
            {/* {isForApplicaiton && <Step4 hashKey='step4' history={history} />} */}
          {/* </StepWizard> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  userData: store.auth.user,
  createJobLoading: store.jobs.createJobLoading,
  jobTypesLoading: store.jobs.jobTypesLoading,
  jobTypesList: store.jobs.jobTypesList,
  addJobData: store.jobs.addJobData
});

const mapDispatchToProps = dispatch => ({
  jobActions: bindActionCreators({ getJobTypes, createJob }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);

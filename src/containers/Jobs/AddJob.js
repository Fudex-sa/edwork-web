import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { message as notify } from "antd";
import StepWizard from "react-step-wizard";
import setJobDetailData from "./actions/setJobDetailData";
// Styles
import styles from "./styles/addJob.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import HeaderDark from "~components/common/HeaderDark";
import { Nav } from "~components/wizard";
import { Step1, Step2, Step3, Step4 } from "./addJobSteps";

// Actions
import getJobTypes from "./actions/getJobTypes";
import createJob from "./actions/createJob";
import getPostDetails from "./actions/getPostDetails";
class AddJob extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  async componentDidMount() {
    const { match, postActions } = this.props;
    console.log("xxxxxxxxxxxxxxxxxxxxx", match);
    if (match?.params?.id) {
      const data = await postActions.getPostDetails(match?.params?.id);
      this.setState({ data });
    }
  }
  // componentDidMount(){
  //   if(this.props.location?.state?.id){
  //    this.props.postActions.getPostDetails(this.props.location.state.id).then(res=>{})
  //   //  .then(res=>this.setState({
  //   //    data:res.data
  //   //  })

  //   //  )
  //   //  alert('data',this.state.data)
  //    console.log('id',this.props.location.state.id)
  //   }
  // }
  render() {
    const { history, addJobData, userData } = this.props;
    const isForApplicaiton = addJobData?.type === "easy";
    const hasUserPro = userData?.Company?.plan;

    return (
      <div>
        <HeaderDark />
        <div className={styles.jobpostingcontent}>
          <Link to="/dashboard" className={styles.backlink}>
            <div className={styles.jobpostingiconcontain}>
              <FontAwesomeIcon icon={["fas", "chevron-left"]} />
              <span>Back</span>
            </div>
          </Link>
          <div className={styles.jobpostinghead}>
            <h1>Job posting</h1>
          </div>
        </div>

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
          <Step2 history={history} jobDetails={this.state.data} />
          {/* {isForApplicaiton && !hasUserPro && <Step3 hashKey='step3' />} */}
          {/* {isForApplicaiton && <Step4 hashKey='step4' history={history} />} */}
          {/* </StepWizard> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
  createJobLoading: store.jobs.createJobLoading,
  jobTypesLoading: store.jobs.jobTypesLoading,
  jobTypesList: store.jobs.jobTypesList,
  addJobData: store.jobs.addJobData,
  jobDetailData: store.jobs.jobDetailData,
});

const mapDispatchToProps = (dispatch) => ({
  jobActions: bindActionCreators({ getJobTypes, createJob }, dispatch),
  postActions: bindActionCreators({ getPostDetails }, dispatch),
  jobsDetails: bindActionCreators({ setJobDetailData }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);

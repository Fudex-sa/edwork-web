import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { show } from "redux-modal";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Input } from 'reactstrap';
// import { Button, FormGroup, Label,  FormText } from 'reactstrap';
// import Dropdown from "react-bootstrap/Dropdown";
import { Row, Col, message as notifi } from "antd";
import {
  message as notify,
  Checkbox as CheckboxAd,
  Form,
  Radio,
} from "antd";
import "antd/dist/antd.css";

import { withNamespaces } from "react-i18next";
import classnames from "classnames";
// import { Dropdown } from "react-bootstrap";
import { Button } from "~components/forms";
import BodyImg from "../../../assets/imgs/Body.png";
// Styles
import styles from "../styles/addJob.module.scss";

// Components
import {
  InputAddJob,
  RadioAddJob,
  DatePickerAddJob,
  LocationList,
  RichEditor,
  SelectAddJob,
  Toggle,
} from "~components/forms";
import Feature from "~components/jobs/Feature";
import LoadingWrapper from "~components/common/LoadingWrapper";

// Actions
import getJobTypes from "../actions/getJobTypes";
import createJob from "../actions/createJob";
import editJob from "../actions/editJob";
import getPostDetails from "../actions/getPostDetails";
import getDegree from "../actions/getDegree";
import WizardNavigation from "~components/wizard/WizardNavigation";
import AddAddressModal from "../../Registration/AddAddressModal";
import getCompanyAddress from "../actions/getCompanyAddress";
import setJobAddData from "../actions/setJobAddData";
import getJobCategory from "../actions/getJobCategory";

const initialState = {
  jobType: "",
  email: "",
  link: "",
  title: "",
  salary: "",
  hiringDate: undefined,
  supportHRDF: undefined,
  location: [],
  jobId: null,
  showTextBox: false,
  toggelExperience:false,
  toggelEducation:false,
  education:"",
  experience:"",
  isResumRequierd:false,
};

const experienceTypes = ["Fresh Graduate", "1-2 years", "3-5 years", "6-10 years", "+10 years"]
class Step2 extends Component {
  // state = {
  //   isChecked: false
  // };
  constructor() {
    super();
    this.state = { ...initialState };
    // this.handleChecked = this.handleChecked.bind(this);  set this, because you need get methods from CheckBox
  }
  // handleChecked () {
  //   this.setState({isChecked: !this.state.isChecked});
  // }
  showAddAddressModal = () => {
    const { modalActions } = this.props;
    modalActions.show("addAddressCompany");
  };

  handleChangeValue = (name, value) => {
    const { jobActions, addJobData } = this.props;
    jobActions.setJobAddData({
      [name]: value,
    });
  };

  async componentDidMount() {
    const { jobActions, jobDetails, match } = this.props;
    jobActions.getJobTypes();
    jobActions.getDegree();
    jobActions.getCompanyAddress();
    jobActions.getJobCategory();
    if (match?.params?.id) {
      await this.getJobsData(match, jobDetails);
      //
    }
  }

  getJobsData = async (match, jobDetails) => {
    await jobDetails.getPostDetails(match?.params?.id, {
      success: (response) => {
        const { title, TypeId, salary, description, id } = response.data;
        this.handleChangeValue("title", title);
        this.handleChangeValue("jobType", TypeId);
        this.handleChangeValue("salary", salary);
        this.handleChangeValue("description", description);
        this.setState({
          jobType: TypeId,
          title,
          salary,
          description,
          jobId: id,
        });
      },
      fail: (response) => {
        console.log(response);
      },
    });
  };

  // getJobTypes = async () => {
  //   const { jobsActions } = this.props;
  //   await jobsActions.getJobTypes(this.state, {
  //     success: (response) => {
  //       const { message, data } = response;
  //     },
  //     fail: (response) => {
  //       const { message } = response;
  //       notifi.error(message);
  //     },
  //   });
  // };

  //  getJobTypes = async () => {
  //     const { jobsActions } = this.props;
  //     await jobsActions.getJobTypes(this.state, {
  //       success: (response) => {
  //         const { message, data } = response;
  //       },
  //       fail: (response) => {
  //         const { message } = response;
  //         notifi.error(message);
  //       },
  //     });
  //   };


  handleOnChange = async ({target})=> {
    await this.setState({ [target.name]: target.value });
  }

  onSubmit = () => {
    const { quizzOptions, jobActions, addJobData, history, t } = this.props;
    const {education, experience, isResumRequierd} = this.state
    const {
      category,
      description,
      postingType,
      features,
      jobType,
      email,
      link,
      title,
      salary,
      hiringDate,
      supportHRDF,
      location,
    } = addJobData;
    // if (jobType === undefined) {
    //   notify.error('Please fill all field');
    //   return;
    // }
    if (!title) {
      notify.error("Please fill the title field");
      return;
    }
    if (!salary) {
      notify.error("Please fill the salary field");
      return;
    }
    if (!location) {
      notify.error("Please fill the location field");
      return;
    }
    if (!education) {
      notify.error("Please fill the education field");
      return;
    }
    if (!experience) {
      notify.error("Please fill the education field");
      return;
    }

    // if (supportHRDF === undefined) {
    //   notify.error('Please fill all field');
    //   return;
    // }

    // jobActions.setJobAddData({ ...this.state });

    const data = {
      general_type: "easy",
      title,
      category_id: category,
      email: email,
      link: link,
      expected_hiring_date: moment(hiringDate).format("YYYY-MM-DD"),
      hrdf: supportHRDF,
      salary: salary,
      description,
      address: location.map((item) => item.id),
      // questions,
      type: jobType,
      education, experience, isResumRequierd
    };

    jobActions.createJob(data, {
      success: (response) => {
        const { message } = response;
        notify.success(message);
        jobActions.setJobAddData(null);
        history.push("/dashboard");
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });

    // if (addJobData?.type !== 'easy') {
    //   alert('Add job'); //TODO: make request for other type
    // } else {
    //   nextStep();
    // }
  };

  editJob = () => {
    const { quizzOptions, jobActions, addJobData, history, t } = this.props;
    const { jobId, education, experience, isResumRequierd } = this.state;
    // const {jobType, email, link, title, salary, hiringDate, supportHRDF, location} = this.state
    const { description, jobType, title, salary, location } = addJobData;
    const data = {
      title,
      salary,
      description,
      jobType,
      id: jobId,
      education,
      experience,
      isResumRequierd,
    };
    if (location) data.location = location.map((item) => item.id);

    jobActions.editJob(data, {
      success: (response) => {
        const { message } = response;
        notify.success(message);
        jobActions.setJobAddData(null);
        history.push("/dashboard");
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  handelToggleEdcation = ()=>{
    const toggelEducation = !this.state.toggelEducation;    
    this.setState({toggelEducation})
  }

  handelToggleExperience = ()=>{
    const toggelExperience = !this.state.toggelExperience;    
    this.setState({toggelExperience})
  }
  handelSelectEdcation = ({target}) =>{
    console.log("12313123");
  }

  render() {
    const {
      location,
      jobType,
      email,
      link,
      title,
      salary,
      hiringDate,
      supportHRDF,
      toggelEducation,
      toggelExperience,
      isResumRequierd,
      education,
      experience,
    } = this.state;
    const {
      addJobData = {},
      jobTypesList,
      degreesList,
      companyAddressLoading,
      companyAddressList,
      isLoadingjobCategories,
      jobCategories,
      t,
      lang,
      isLoadingSubmit,
      match,
    } = this.props;

    const jobTypesOptions = jobTypesList.map((item) => ({
      label: item.name[lang],
      value: item.id,
    }));
    // const  degreesOptions = DegreesList.map((item) => ({
    //   label: item.name[lang],
    //   value: item.id,
    // }));



    const supportHRDFOptions = ["Yes", "No"].map((item, index) => ({
      label: item,
      value: index,
    }));

    const companyAdressessOptions = companyAddressList.map((item) => ({
      id: item.id,
      label: item.address_line,
    }));

    const categoryOptions = jobCategories.map((item) => ({
      id: item.id,
      name: item.name[lang],
      value: item.id,
    }));
    return (
      <div>
              <div className={styles.container}>
        <LoadingWrapper
          isLoading={companyAddressLoading || isLoadingjobCategories}
        >
          <div className={classnames(styles.content_small_center)}>
            <div className={styles.input_container}>
              {addJobData.postingType?.id === 1 && (
                <InputAddJob
                  value={addJobData.email}
                  label={t("input.add_job.email_title")}
                  subLabel={t("input.add_job.email_subtitle")}
                  onChange={({ target }) => {
                    this.handleChangeValue("email", target.value);
                  }}
                />
              )}

              {addJobData.postingType?.id === 2 && (
                <InputAddJob
                  value={addJobData.link}
                  label={t("input.add_job.link_title")}
                  subLabel={t("input.add_job.link_subtitle")}
                  onChange={({ target }) => {
                    this.handleChangeValue("link", target.value);
                  }}
                />
              )}
            </div>

            <div className={styles.input_container}>
              <InputAddJob
                value={addJobData.title}
                label={t("input.add_job.job_title")}
                subLabel={t("input.add_job.job_subtitle")}
                onChange={({ target }) => {
                  this.handleChangeValue("title", target.value);
                }}
              />
            </div>
            {/* <div className={styles.input_container}>
              <SelectAddJob
                label={t('input.add_job.job_category')}
                options={categoryOptions}
                value={addJobData.category}
                // placeholder="Select category"
                onChange={(value) => {
                  this.handleChangeValue('category', value);
                }}
              />
            </div> */}
            {/* <div className={styles.input_container}>
              <DatePickerAddJob
                value={addJobData.hiringDate}
                label={t('input.add_job.job_hiring_date')}
                subLabel={t('input.add_job.job_hiring_date_subtitle')}
                onChange={(value) => {
                  this.handleChangeValue('hiringDate', value);
                }}
              />
            </div> */}
            <div className={styles.input_container}>
              <RadioAddJob
                value={addJobData.jobType}
                label={t("input.add_job.job_type")}
                options={jobTypesOptions}
                onChange={({ target }) => {
                  this.handleChangeValue("jobType", target.value);
                }}
              />
            </div>
            <div className={styles.dropdowncontainer}>
              <div className="dropdownwithspan">
                <div className={styles.dropdownwithspan}>
                  <span className={styles.experiencspan}>Minimum Experiencs</span>
                
                  <Input 
                   style={{
                    backgroundColor: "#fff",
                    borderColor: "#fff",
                    width: "195px",
                  }}
                  type="select"
                  name="experience"
                  value={experience}
                  onChange={this.handleOnChange}
                  >
                { experienceTypes.map((experience,index) => <option value={experience} key={index}  >{experience}</option>) }
                </Input>
                </div>{" "}
              </div>
              <div className={styles.dropdownwithspan}>
                <span className={styles.educationspan}>Minimum Education</span>
                <Input 
                style={{
                    backgroundColor: "#fff",
                    borderColor: "#fff",
                    width: "195px",
                  }}
                  type="select"
                  name="education"
                  value={education}
                  onChange={this.handleOnChange}
                  >

                 <option  value={null} >Select education</option>
                { degreesList?.map(({id,name}) => <option value={id} key={id} >{name[lang]}</option>) }
                </Input>
              </div>
            </div>

            {/* <div className={styles.input_container}>
              <RadioAddJob
                value={addJobData.supportHRDF}
                label={t('input.add_job.job_hrdf_support')}
                options={supportHRDFOptions}
                onChange={({ target }) => {
                  this.handleChangeValue('supportHRDF', target.value);
                }}
              />
            </div> */}
            <div className={styles.input_container}>
              <InputAddJob
                value={addJobData.salary}
                label={t("input.add_job.job_salary")}
                subLabel={t("input.add_job.job_salary_subtitle")}
                onChange={({ target }) => {
                  this.handleChangeValue("salary", target.value);
                }}
              />
            </div>

            {/* <div className={styles.input_container}>
              <Toggle
                label={t('input.add_job.online_job.label')}
                checked={addJobData.online}
                onChange={(checked) => {
                  this.handleChangeValue('online', checked);
                  if (checked) {
                    this.handleChangeValue('location', []);
                  }
                }}
              />
            </div> */}

            {/* {!addJobData.online && ( */}
            <div className={styles.input_container}>
              <LocationList
                options={companyAdressessOptions}
                value={
                  addJobData.location
                    ? addJobData.location.map((item) => item.label)
                    : []
                }
                addAddress={this.showAddAddressModal}
                onChange={(value) => {
                  this.handleChangeValue("location", value);
                }}
                onCheckAll={(value) => {
                  this.handleChangeValue("location", value);
                }}
              />
            </div>
            {/* )} */}

            <div className={styles.input_container} dir="ltr">
              <RichEditor
                value={addJobData.description}
                onChange={(value) => {
                  this.handleChangeValue("description", value);
                }}
              />
            </div>
          </div>
          <div className={styles.terms}>
            <input
              id="field_terms"
              name='isResumRequierd'
              type="checkbox"
              required={true}
              name="terms"
              value={isResumRequierd}
              className={styles.termsCheckbox}
              onChange={this.handleOnChange}
            />
            <span> Applicants must submit a cover letter </span>
          </div>
          <AddAddressModal
            submitCb={() => {
              const { jobActions } = this.props;
              jobActions.getCompanyAddress();
            }}
          />
      
        </LoadingWrapper>
        {/* <img
          src={BodyImg}
          alt="body"
          className={styles.publishImage}
        /> */}
      </div>
      <div className={styles.add_job}>
            {match?.params?.id && match.path.includes("edit") ? (
              <WizardNavigation
                finishBtnText={t("button.edit_job")}
                options={this.props}
                onSubmit={this.editJob}
              />
            ) : match?.params?.id && match.path.includes("repost") ? (
              <WizardNavigation
                finishBtnText={t("button.repost_job")}
                options={this.props}
                onSubmit={this.onSubmit}
              />
            ) : (
                  <WizardNavigation
                    finishBtnText={t("button.add_job")}
                    options={this.props}
                    onSubmit={this.onSubmit}
                  />
                )}
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
  degreesList: store.jobs.degreesList,
  addJobData: store.jobs.addJobData,
  jobDetailData: store.jobs.jobDetailData,
  companyAddressLoading: store.jobs.companyAddressLoading,
  companyAddressList: store.jobs.companyAddressList,
  isLoadingjobCategories: store.jobs.isLoadingjobCategories,
  jobCategories: store.jobs.jobCategories,
  lang: store.locale.lang,
});

const mapDispatchToProps = (dispatch) => ({
  jobActions: bindActionCreators(
    {
      getJobTypes,
      createJob,
      getCompanyAddress,
      setJobAddData,
      getJobCategory,
      editJob,
      getDegree
    },
    dispatch
  ),
  jobDetails: bindActionCreators({ getPostDetails }, dispatch),
  modalActions: bindActionCreators({ show }, dispatch), //TODO: move to separate func
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Step2));

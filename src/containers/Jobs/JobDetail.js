import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";
import { message as notify, Popover, Radio } from "antd";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { withNamespaces } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";
import getPostDetails from "../Jobs/actions/getPostDetails";
import getNationalityList from "../Jobs/actions/getNationalityList";
import getJobApplicants from "../Jobs/actions/getJobApplicants";
import getYears from "../Jobs/actions/getYears";
import FilterTitle from "../../components/jobs/filterTitle";
import FilterLabel from "../../components/jobs/fiterLabel";
import FilterDropDown from "../../components/jobs/FilterDropDown";
// import {} from 'semantic-ui-react'
// Styles
import styles from "./styles/job-detail.module.scss";

// Components
import HeaderJobDetail from "~components/common/HeaderJobDetail";
import Categories from "~components/jobs/Categories";
import DetailHeader from "~components/jobs/DetailHeader";
import CandidateItem from "~components/jobs/CandidateItem";
import LoadingWrapper from "~components/common/LoadingWrapper";
import JobDetailContentUser from "~components/jobs/JobDetailContentUser";
import Comments from "~components/jobs/Comments";

// Actions
import getJobCandidate from "./actions/getJobCandidate";
import setJobDetailData from "./actions/setJobDetailData";
import getCandidateDetail from "./actions/getCandidateDetail";
import addComment from "./actions/addComment";
import getCandidateComments from "./actions/getCandidateComments";
import getJobsList from "./actions/getJobsList";
import AddCustomCategory from "./AddCustomCategory";
import getCustomCategories from "./actions/getCustomCategories";
import createCustomCategory from "./actions/createCustomCategory";
import stopPost from "./actions/stopPost";
import userMoveToCategory from "./actions/userMoveToCategory";
const queryString = require("query-string");

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
let menu;
class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      search: "",
      data: {},
      type: "",
      PostUserId: null,
      working_status: false,
      NationalityId: "",
      gender: "", //male or famel
      experience: "", //number or ""
      between: "", //number or ""
      and: "", //number or ""
      graduationBetween: "", // number of year
      graduationAnd: "", // number of year
      education: "",
    };
  }

  handleChange = ({ target }, isFilter) => {
    console.log(target.name);
    this.setState({
      [target.name]: target.value,
    });
    if (!isFilter) this.handleGetCandidate(target.value);
  };

  toggleDropdown = () => {
    if (this.state.showDropdown) {
      this.setState({ showDropdown: false });
    } else {
      this.setState({ showDropdown: true });
    }
  };

  handAddComment = (body) => {
    const { jobDetailActions } = this.props;
    const { PostUserId } = this.state;
    jobDetailActions.addComment({
      body,
      PostUserId,
    });
  };

  /* handle select one candidate under a job and fetches his data */
  handleSelecteCandidate = (candidate) => {
    const { jobDetailActions, jobDetailData, match } = this.props;
    this.setState({
      PostUserId: candidate.id,
    });
    jobDetailActions.getCandidateDetail({
      id: candidate.id,
      user_id: candidate.User?.id,
      job_id: match?.params?.id,
    });

    jobDetailActions.getCandidateComments({
      PostUserId: candidate.id,
    });
  };

  /* handles pick one job and fetches its data */
  handleGetCandidate = (sortBy) => {
    const { jobDetailActions, match } = this.props;

    const searchParams = queryString.parse(window.location.search);
    const data = { job_id: match?.params?.id };

    if (searchParams.qualified !== undefined) {
      try {
        data.qualified = JSON.parse(searchParams.qualified);
      } catch (error) {
        data.qualified = true;
      }
    }

    if (searchParams.category !== undefined) {
      data.folder = searchParams.category.toLowerCase();
    }
    if (sortBy) data.sortBy = sortBy;
    jobDetailActions.getJobCandidate(data);
  };

  /* handles pick one job and fetches its data */
  handleFilterCandidate = () => {
    const { jobDetailActions, match } = this.props;
    const {
      working_status,
      NationalityId,
      gender,
      experience,
      between,
      and,
      graduationBetween,
      graduationAnd,
      education,
      sortBy,
    } = this.state;
    const data = {
      job_id: match?.params?.id,
      working_status,
      NationalityId,
      gender,
      experience,
      education,
      age: { between, and },
      GraduationDate: { between: graduationBetween, and: graduationAnd },
    };
    if (sortBy) data.sortBy = sortBy;
    jobDetailActions.getJobCandidate(data);
  };

  /* handle add a category for candidates */
  handleAddcategory = () => {
    const { modalActions } = this.props;
    modalActions.show("addCustomCategory");
  };

  /* handle select users */
  handleCheckAllUser = () => {
    const { jobDetailData, jobCandidate, jobDetailActions } = this.props;
    const isAllSelected =
      jobDetailData.checkedUsers.length === jobCandidate.length;

    if (isAllSelected) {
      jobDetailActions.setJobDetailData({
        ...jobDetailData,
        checkedUsers: [],
      });
    } else {
      jobDetailActions.setJobDetailData({
        ...jobDetailData,
        checkedUsers: jobCandidate.map((item) => item.id),
      });
    }
  };

  /* handle change user data after select another candidate */
  handleChangeCheckdUser = (user) => {
    const { jobDetailData, jobDetailActions } = this.props;

    const data = jobDetailData.checkedUsers
      ? jobDetailData.checkedUsers.slice()
      : [];
    const dataId = data.map((item) => item.id);
    const findItem = dataId.indexOf(user.id);

    if (findItem === -1) {
      data.push(user);
    } else {
      data.splice(findItem, 1);
    }

    jobDetailActions.setJobDetailData({
      ...jobDetailData,
      checkedUsers: data,
    });
  };

  /* handle move a user to a list */
  handleMoveUserToCategory = (folder = {}) => {
    const { match, jobDetailData, jobDetailActions } = this.props;
    const userIds = jobDetailData.checkedUsers
      ? jobDetailData.checkedUsers.map((item) => item.id)
      : [];
    const data = {
      users_id: userIds,
      job_id: match?.params?.id,
      folder: folder.folder.toLowerCase(),
      folder_type: folder.folder_type,
    };

    jobDetailActions.userMoveToCategory(data, {
      success: (response) => {
        const { message } = response;
        this.handleGetCandidate();
        jobDetailActions.setJobDetailData({
          ...jobDetailData,
          checkedUsers: [],
        });
        notify.success(message);
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  componentDidMount() {
    const {
      applicantsActions,
      jobsActions,
      jobDetailActions,
      match,
      postActions,
      company,
      history,
    } = this.props;
    const { id } = this.props.match.params;
    applicantsActions.getJobApplicants(id);
    this.handleGetCandidate();
    jobsActions.getJobsList();
    jobDetailActions.getNationalityList();
    jobDetailActions.getYears();
    jobDetailActions.getCustomCategories({ job_id: match?.params?.id });
    this.getJobsData(match, postActions, jobDetailActions, company, history);
  }

  componentWillUnmount() {
    const { jobDetailActions, jobDetailData } = this.props;
    jobDetailActions.setJobDetailData({
      ...jobDetailData,
      selectedUser: null,
    });
  }

  getJobsData = async (
    match,
    postActions,
    jobDetailActions,
    company,
    history
  ) => {
    await postActions.getPostDetails(match?.params?.id, {
      success: (response) => {
        const { message, data } = response;
        if (data && company.id !== data.CompanyId) history.push("/dashboard");
        jobDetailActions.setJobDetailData({
          data,
        });
      },
      fail: (response) => {
        const { message } = response;
        console.log(message);
      },
    });
  };
  getJobApplicants = async (id) => {
    const { applicantsActions } = this.props;
    await applicantsActions.getJobApplicants(id, {
      success: () => {},
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  getNationalityList = async () => {
    const { jobDetailActions } = this.props;
    await jobDetailActions.getNationalityList({
      success: () => {},
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  getYears = async () => {
    const { jobDetailActions } = this.props;
    await jobDetailActions.getYears({
      success: () => {},
      fail: ({ message }) => {
        notify.error(message);
      },
    });
  };
  render() {
    const {
      isLoadingJobCandidate,
      jobCandidate = [],
      jobDetailData,
      isLoadingCandidateDetail,
      jobsList,
      customCategories,
      match,
      t,
      nationalityList,
    } = this.props;
    const { search } = this.state;

    const jobId = match?.params?.id;

    return (
      <div>
        <HeaderJobDetail
          data={jobsList}
          jobId={jobId}
          postId={jobId}
          postDetails={this.state.data}
        />
        <LoadingWrapper isLoading={isLoadingJobCandidate}>
          <DetailHeader
            selected={jobDetailData.selectedUser}
            checkedUsers={jobDetailData.checkedUsers}
            customCategories={customCategories}
            onMoveUserToCategory={this.handleMoveUserToCategory}
            jobCandidate={jobCandidate}
          />
          <div className={styles.container}>
            <div className={styles.board}>
              <div className={styles.board_content}>
                <div className={styles.left_side}>
                  <div className={styles.search}>
                    {!!(
                      jobDetailData.checkedUsers &&
                      jobDetailData.checkedUsers.length
                    ) && (
                      <div className={styles.selected_all}>
                        <button type="button" onClick={this.handleCheckAllUser}>
                          {!!(
                            jobDetailData.checkedUsers.length ===
                            jobCandidate.length
                          )
                            ? "Deselect all"
                            : "Select all"}
                        </button>
                      </div>
                    )}

                    {/* Search bar */}
                    <div className={styles.search_wrapper}>
                      <input
                        type="search"
                        placeholder={t("job.search")}
                        value={search}
                        onChange={({ target }) => {
                          this.setState({
                            search: target.value,
                          });
                        }}
                      />
                      <button className={styles.saerch_btn}>
                        <FontAwesomeIcon icon={["fas", "search"]} />
                      </button>
                    </div>
                  </div>

                  {/* filter and sort */}
                  <div className={styles.filter_sort}>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item>
                            <label>
                              <input
                                type="radio"
                                value="DESC"
                                checked={this.state.type === "DESC"}
                                onChange={this.handleChange}
                                style={{ marginRight: "6px" }}
                              />
                              New to Old
                            </label>
                          </Menu.Item>
                          <Menu.Item>
                            <label>
                              <input
                                type="radio"
                                value="ASC"
                                checked={this.state.type === "ASC"}
                                onChange={this.handleChange}
                                style={{ marginRight: "6px" }}
                              />
                              Old to New
                            </label>
                          </Menu.Item>
                          <Menu.Item>
                            <label>
                              <input
                                type="radio"
                                value="NearByDammamFirst"
                                checked={
                                  this.state.type === "NearByDammamFirst"
                                }
                                onChange={this.handleChange}
                                style={{ marginRight: "6px" }}
                              />
                              Near ByDammam First
                            </label>
                          </Menu.Item>
                          <Menu.Item>
                            <label>
                              <input
                                type="radio"
                                value="isReaded"
                                checked={this.state.type === "isReaded"}
                                onChange={this.handleChange}
                                style={{ marginRight: "6px" }}
                              />
                              Unread First
                            </label>
                          </Menu.Item>
                          <Menu.Item>
                            <label>
                              <input
                                type="radio"
                                value="isCommented"
                                checked={this.state.type === "isCommented"}
                                onChange={this.handleChange}
                                style={{ marginRight: "6px" }}
                              />
                              With Comments First
                            </label>
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <span
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        <FontAwesomeIcon icon={["fas", "sort-alpha-down"]} />
                        Sort
                      </span>
                    </Dropdown>
                    <Dropdown
                      overlay={
                        <Menu style={{ width: "900px" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              color: "#0091FF",
                              marginTop: "5px",
                              justifyContent: "center",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={["fas", "filter"]}
                              className="mt-1 mr-1"
                            />
                            <p>
                              Anyone doesn't match filtration requirements, will
                              be auto-rejected
                            </p>
                          </div>
                          <div>
                            <div
                              className="row ml-3 mb-2"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <FilterTitle title="Working Status" />
                              <FilterLabel label="Is" />
                              <div className="col-md-2">
                                <select
                                  class="ui dropdown ml-2"
                                  style={{
                                    width: "130px",
                                    border: "1px solid #CFD3D5",
                                  }}
                                  onChange={(e) => this.handleChange(e, true)}
                                  name="working_status"
                                >
                                  <option value="1">Yes</option>
                                  <option value="0">No</option>
                                </select>
                              </div>
                              <div className="col-md-2">
                                <label style={{ textAlign: "center" }}></label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div
                              className="row ml-3 mb-2"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <FilterTitle title="Age" />
                              <FilterLabel label="Is between" />

                              <div className="col-md-2">
                                <input
                                  class="ui dropdown ml-2"
                                  style={{
                                    width: "130px",
                                    border: "1px solid #CFD3D5",
                                  }}
                                  name="between"
                                  onChange={(e) => this.handleChange(e, true)}
                                />
                                {/* <option value="">Age</option>
                                  <option value="0">20</option>
                                </select> */}
                              </div>
                              <FilterLabel label="And" />

                              <div className="col-md-2">
                                <input
                                  class="ui dropdown ml-2"
                                  style={{
                                    width: "130px",
                                    border: "1px solid #CFD3D5",
                                  }}
                                  name="and"
                                  onChange={(e) => this.handleChange(e, true)}
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <div
                              className="row ml-3 mb-2"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <FilterTitle title="Gender" />
                              <FilterLabel label="Is" />

                              <div className="col-md-2">
                                <select
                                  class="ui dropdown ml-2"
                                  style={{
                                    width: "130px",
                                    border: "1px solid #CFD3D5",
                                  }}
                                  onChange={(e) => this.handleChange(e, true)}
                                  name="gender"
                                >
                                  <option value="">Gender</option>
                                  <option value="1">Male</option>
                                  <option value="0">Female</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div
                              className="row ml-3 mb-2"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <FilterTitle title="Nationality" />
                              <FilterLabel label="Is" />
                              {/* <div className="col-md-2">
                                <select
                                  class="ui dropdown ml-2"
                                  style={{
                                    width: "130px",
                                    border: "1px solid #CFD3D5",
                                  }}
                                  onChange={(e) =>
                                    this.setState({
                                      NationalityId: e.target.value,
                                    })
                                  }  
                                >
                                  {this.props?.nationalityList?.map((item) => (
                                    <option value="">{item.name.en}</option>
                                  ))}
                                </select>
                              </div> */}

                              <FilterDropDown
                                data={nationalityList}
                                placeholder="Nationality"
                                changeSelected={this.handleChange}
                              />
                            </div>
                          </div>
                          <div>
                            <div
                              className="row ml-3 mb-2"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <FilterTitle title="Level of Experience" />
                              <FilterLabel label="Is" />
                              <div className="col-md-2">
                                <select
                                  class="ui dropdown ml-2"
                                  style={{
                                    width: "130px",
                                    border: "1px solid #CFD3D5",
                                  }}
                                  onChange={(e) => this.handleChange(e, true)}
                                  name="experience"
                                >
                                  <option value="">Fresh Graduate</option>
                                  <option value="0">1-2 years</option>
                                  <option value="1">3-5 years</option>
                                  <option value="2"> 6-10 years</option>
                                  <option value="3"> +10 years</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div
                              className="row ml-3 mb-2"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <FilterTitle title="Level of education" />
                              <FilterLabel label="Is minimum" />
                              <div className="col-md-2">
                                <select
                                  class="ui dropdown ml-2"
                                  style={{
                                    width: "130px",
                                    border: "1px solid #CFD3D5",
                                  }}
                                  onChange={(e) => this.handleChange(e, true)}
                                  name="education"
                                >
                                  <option value="">education</option>
                                  <option value="0">Bachelor of</option>
                                  <option value="1">M.A.</option>
                                  <option value="2">PhD</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div
                              className=" row ml-3 mb-2"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <FilterTitle title="Graduation Date" />

                              <FilterLabel label="Is Between" />

                              <div className="col-md-2">
                                <select
                                  class="ui dropdown ml-2"
                                  style={{
                                    width: "130px",
                                    border: "1px solid #CFD3D5",
                                  }}
                                  onChange={(e) => this.handleChange(e, true)}
                                  name="graduationBetween"
                                >
                                  <option value="0">year</option>
                                  {this.props?.years.map((year) => (
                                    <option value={year} key={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <FilterLabel label="And" />
                              <div className="col-md-2">
                                <select
                                  class="ui dropdown ml-2"
                                  style={{
                                    width: "130px",
                                    border: "1px solid #CFD3D5",
                                  }}
                                  onChange={(e) => this.handleChange(e, true)}
                                  name="graduationAnd"
                                >
                                  <option value="0">year</option>
                                  {this.props?.years.map((year) => (
                                    <option value={year} key={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div
                              className=" row ml-3 mb-2"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <FilterTitle title="Gpa" />
                              <FilterLabel label="Is" />
                              <div className="col-md-2">
                                <select
                                  class="ui dropdown ml-2"
                                  style={{
                                    width: "130px",
                                    border: "1px solid #CFD3D5",
                                  }}
                                  onChange={(e) => this.handleChange(e, true)}
                                  name="gpa_score"
                                >
                                  <option value="">Gpa</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <button
                                type="button"
                                style={{
                                  backgroundColor: "#fff",
                                  color: "#0091ff",
                                  border: "none",
                                  outline: "none",
                                  height: "30px",
                                  padding: "0 35px",
                                  borderRadius: "25px",
                                  border: "1px solid #0091ff",
                                  cursor: "pointer",
                                  fontSize: "1rem",
                                  marginBottom: "20px",
                                  transition: "0.1s ease-in",
                                  letterSpacing: "0px",
                                  opacity: "1",
                                  marginRight: "25px",
                                }}
                              >
                                Cancel
                              </button>

                              <button
                                type="button"
                                style={{
                                  border: "none",
                                  backgroundColor: "#0091ff",
                                  border: "none",
                                  outline: "none",
                                  color: "#fff",
                                  height: "30px",
                                  padding: "0 35px",
                                  borderRadius: "25px",
                                  cursor: "pointer",
                                  fontSize: "1rem",
                                  marginBottom: "20px",
                                  transition: "0.1s ease-in",
                                  marginRight: "25px",
                                }}
                                onClick={this.handleFilterCandidate}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <span
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        <FontAwesomeIcon icon={["fas", "filter"]} />
                        Filter
                      </span>
                    </Dropdown>
                    <span className={styles.passed}>Passed</span>
                  </div>

                  <Scrollbars autoHide>
                    {/* job candidates */}
                    {jobCandidate
                      .filter(({ User }) => User.name.indexOf(search) !== -1)
                      .map((item) => (
                        <CandidateItem
                          key={item.id}
                          item={item}
                          checkedUsers={jobDetailData.checkedUsers}
                          selected={jobDetailData.selectedUser}
                          onSelect={this.handleSelecteCandidate}
                          onCheckUser={this.handleChangeCheckdUser}
                        />
                      ))}
                  </Scrollbars>
                </div>

                <JobDetailContentUser
                  isLoading={isLoadingCandidateDetail}
                  selected={jobDetailData.selectedUser}
                  candidatesNumber={jobCandidate}
                />

                {/* <JobDetailContentUser isLoading={isLoadingCandidateDetail} selected={jobDetailData.selectedUser} candidatesNumber={jobCandidate} /> */}

                <Comments
                  addComment={this.handAddComment}
                  comments={jobDetailData.comments}
                  isSelected={jobDetailData.selectedUser}
                />
              </div>
            </div>
          </div>
        </LoadingWrapper>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  isLoadingJobCandidate: store.jobs.isLoadingJobCandidate,
  isLoadingCandidateDetail: store.jobs.isLoadingCandidateDetail,
  jobCandidate: store.jobs.jobCandidate,
  jobDetailData: store.jobs.jobDetailData,
  company: store.auth.user.Company,
  jobsList: store.jobs.jobsList,
  jobApplicants: store.jobs.jobApplicants,
  jobApplicantsLoading: store.jobs.jobApplicantsLoading,
  isLoadingCustomCategories: store.jobs.isLoadingCustomCategories,
  customCategories: store.jobs.customCategories,
  nationalityListLoading: store.jobs.nationalityListLoading,
  nationalityList: store.jobs.nationalityList,
  yearsLoading: store.jobs.yearsLoading,
  years: store.jobs.years,
});

const mapDispatchToProps = (dispatch) => ({
  jobDetailActions: bindActionCreators(
    {
      getJobCandidate,
      setJobDetailData,
      getCandidateDetail,
      addComment,
      getCustomCategories,
      userMoveToCategory,
      getCandidateComments,
      getNationalityList,
      getYears,
    },
    dispatch
  ),
  jobsActions: bindActionCreators({ getJobsList }, dispatch),
  modalActions: bindActionCreators({ show }, dispatch),
  postActions: bindActionCreators({ getPostDetails }, dispatch),
  applicantsActions: bindActionCreators({ getJobApplicants }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(JobDetail));

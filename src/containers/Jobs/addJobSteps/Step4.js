import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { message as notify } from "antd";
import moment from "moment";
import { withNamespaces } from "react-i18next";

// Styles
import styles from "../styles/addJob.module.scss";

// Components
import { WizardNavigation } from "~components/wizard";
import {
  QuizzType,
  ChooseQuestion,
  MultipleQuestion,
  DiscussionQuestion,
  EvaluationQuestion,
  VideoQuestion,
  LocationQuestion
} from "~components/jobs";
import BasicFilter from "~components/jobs/BasicFilter";

// Actions
import getJobTypes from "../actions/getJobTypes";
import createJob from "../actions/createJob";
import createQuizzOption from "../actions/createQuizzOption";
import removeQuizzOption from "../actions/removeQuizzOption";
import setQuizzOption from "../actions/setQuizzOption";
import setJobAddData from "../actions/setJobAddData";
import getUniversityList from "../actions/getUniversityList";
import getNationalityList from "../actions/getNationalityList";
import getGovernorateList from "../actions/getGovernorateList";

class Step4 extends Component {
  state = { isLoadingSubmit: 0 };

  handleAddOptions = (type, data) => {
    const { jobActions } = this.props;
    console.warn(type, data);
    jobActions.createQuizzOption({ type, data });
  };

  handleRemoveOption = (type, index, cb) => {
    const { jobActions } = this.props;
    jobActions.removeQuizzOption(type, index, cb);
  };

  handleChangeOption = (type, index, data) => {
    const { jobActions } = this.props;
    jobActions.setQuizzOption(type, index, data);
  };

  componentDidMount() {
    const { jobActions, userData } = this.props;
    const hasUserPro = userData?.Company?.plan;
    if (hasUserPro) {
      jobActions.setJobAddData({
        features: ["video-recording", "evaluation", "choose", "location"]
      });
    }

    jobActions.getUniversityList();
    jobActions.getNationalityList();
    jobActions.getGovernorateList();
  }

  onSubmit = () => {
    const { quizzOptions, jobActions, addJobData, history, t } = this.props;
    const {
      title,
      category,
      description,
      salary,
      location,
      supportHRDF,
      postingType,
      email,
      link,
      features,
      hiringDate,
      jobType
    } = addJobData;

    const questions = {
      questionnaire: [],
      video: [],
      location: [],
      evaluation: [],
      filters: {
        age: {},
        gender: {},
        natinality: [],
        education: [],
        university: [],
        student_only: false
      }
    };

    const filterTypes = [
      t("job.add_job.filter.age.value"),
      t("job.add_job.filter.gender.value"),
      t("job.add_job.filter.nationality.value"),
      t("job.add_job.filter.lvl_education.value"),
      t("job.add_job.filter.univeristy.value"),
      t("job.add_job.filter.students.value")
    ];

    quizzOptions.basicFilter.forEach(item => {
      const { filters } = questions;
      switch (item.filterType) {
        case filterTypes[0]: // Age
          filters.age = {
            from: item.btweenFrom,
            to: item.btweenTo
          };
          break;

        case filterTypes[1]: // Gender
          filters.gender = {
            value: item.gender
          };
          break;
        case filterTypes[2]: // Nationality
          filters.nationality = item.nationality;
          break;
        case filterTypes[3]: // Level of education
          filters.education = item.educationLevel;
          break;
        case filterTypes[4]: // University
          filters.university = item.university;
          break;
        case filterTypes[5]: // Show students only
          filters.student_only = true;
          break;

        default:
          break;
      }
    });

    quizzOptions.choose.forEach(item => {
      questions["questionnaire"].push({
        question: item.question,
        allow_multiple: !!item.isMultiChoose,
        select_at_least_one: !!item.isLastOne,
        select_all: !!item.isAllAnswer,
        answers: item.options.map(answerOption => ({
          answer: answerOption.text,
          is_correct: !!answerOption.isCorrect
        }))
      });
    });

    quizzOptions.multiple.forEach(item => {
      questions["questionnaire"].push({
        question: item.question,
        allow_multiple: !!item.isMultiChoose,
        select_at_least_one: !!item.isLastOne,
        select_all: !!item.isAllAnswer,
        answers: item.options.map(answerOption => ({
          answer: answerOption.text,
          is_correct: !!answerOption.isCorrect
        }))
      });
    });

    quizzOptions["video-recording"].forEach(item => {
      questions["video"].push({
        question: item.question
      });
    });

    quizzOptions.location.forEach(item => {
      questions["location"].push(item);
    });

    quizzOptions.evaluation.forEach(item => {
      questions["evaluation"].push({
        question: item.question,
        min_rate: item.evaluation
      });
    });

    // if (item.type === 'evaluation') {
    //   // TODO: in progress
    //   questions['evaluation'].push({
    //     "question": item.question,
    //     'evaluation': item.evaluation
    //   })
    // }

    const tools = features.map(item => {
      switch (item) {
        case "video-recording":
          return 1;
        case "evaluation":
          return 2;
        case "choose":
          return 3;
        case "location":
          return 4;

        default:
          return undefined;
      }
    });

    const data = {
      general_type: postingType.type,
      title,
      category_id: category,
      email: email,
      link: link,
      expected_hiring_date: moment(hiringDate).format("YYYY-MM-DD"),
      hrdf: supportHRDF,
      salary: salary,
      description,
      address: location.map(item => item.id),
      questions,
      tools,
      type: jobType
    };

    jobActions.createJob(data, {
      success: response => {
        const { message } = response;
        notify.success(message);
        jobActions.setJobAddData(null);
        history.push("/jobs");
      },
      fail: response => {
        const { message } = response;
        notify.error(message);
      }
    });

    // this.setState({ isLoadingSubmit: 1 }, () => {
    //   setTimeout(() => {
    //     this.setState({ isLoadingSubmit: 0 });
    //     notify.success('Your job successfuly publish');
    //     // jobActions.setJobAddData(null);
    //     history.replace('/jobs');
    //   }, 3000);
    // });
  };

  render() {
    const {
      userData,
      quizzOptions = {},
      createJobLoading,
      addJobData,
      universityList,
      nationalityList,
      degreeList,
      governorateList,
      t
    } = this.props;
    const { features = [] } = addJobData;

    const selectedFeatures = {
      choose: features.indexOf("choose") !== -1,
      multiple: features.indexOf("choose") !== -1,
      location: features.indexOf("location") !== -1,
      evaluation: features.indexOf("evaluation") !== -1,
      "video-recording": features.indexOf("video-recording") !== -1
    };

    return (
      <div className={styles.container}>
        <div className={styles.section_title}>
          <h2>{t("job.add_job.step4.title")}</h2>
          <h3>{t("job.add_job.step4.description")}</h3>
        </div>

        <h2 className={styles.section_title}>
          {t("job.add_job.step4.section_title.basic")}
        </h2>

        <BasicFilter
          type='basicFilter'
          items={quizzOptions.basicFilter}
          remove={this.handleRemoveOption}
          onChange={this.handleChangeOption}
          addFilter={this.handleAddOptions}
          universityList={universityList}
          nationalityList={nationalityList}
          degreeList={degreeList}
        />

        {!!features.length && (
          <h2 className={styles.section_title}>
            {t("job.add_job.step4.section_title.tools")}
          </h2>
        )}

        {selectedFeatures.location && (
          <LocationQuestion
            type='location'
            items={quizzOptions.location}
            remove={this.handleRemoveOption}
            onChange={this.handleChangeOption}
            addLocation={this.handleAddOptions}
            governorateList={governorateList}
          />
        )}

        {selectedFeatures.choose && (
          <ChooseQuestion
            type='choose'
            items={quizzOptions.choose}
            remove={this.handleRemoveOption}
            onChange={this.handleChangeOption}
            addQuestion={this.handleAddOptions}
          />
        )}

        {selectedFeatures.evaluation && (
          <EvaluationQuestion
            type='evaluation'
            items={quizzOptions.evaluation}
            remove={this.handleRemoveOption}
            onChange={this.handleChangeOption}
            addQuestion={this.handleAddOptions}
          />
        )}

        {selectedFeatures["video-recording"] && (
          <VideoQuestion
            type='video-recording'
            items={quizzOptions["video-recording"]}
            remove={this.handleRemoveOption}
            onChange={this.handleChangeOption}
            addQuestion={this.handleAddOptions}
          />
        )}

        <WizardNavigation
          isLoadingSubmit={createJobLoading}
          finishBtnText={t("button.add_job")}
          options={this.props}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  userData: store.auth.user,
  createJobLoading: store.jobs.createJobLoading,
  jobTypesLoading: store.jobs.jobTypesLoading,
  jobTypesList: store.jobs.jobTypesList,
  quizzOptions: store.jobs.quizzOptions,
  addJobData: store.jobs.addJobData,
  universityListLoading: store.jobs.universityListLoading,
  universityList: store.jobs.universityList,
  nationalityListLoading: store.jobs.nationalityListLoading,
  nationalityList: store.jobs.nationalityList,
  governorateListLoading: store.jobs.governorateListLoading,
  governorateList: store.jobs.governorateList,
  degreeListLoading: store.jobs.degreeListLoading,
  degreeList: store.jobs.degreeList
});

const mapDispatchToProps = dispatch => ({
  jobActions: bindActionCreators(
    {
      getJobTypes,
      createJob,
      createQuizzOption,
      removeQuizzOption,
      setQuizzOption,
      setJobAddData,
      getUniversityList,
      getNationalityList,
      getGovernorateList
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(Step4));

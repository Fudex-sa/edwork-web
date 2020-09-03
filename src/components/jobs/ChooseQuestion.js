import React, { Component } from 'react';
import styles from './styles/question.module.scss';
import { Switch, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Select } from '~components/forms';
import classnames from 'classnames';
import { withNamespaces } from 'react-i18next';

import RadioTypeImage from '~assets/imgs/radio-type.svg';
import MultipleTypeImage from '~assets/imgs/multiple-type.svg';

const demoQuestionData = {
  question: '',
  options: [],
};

class ChooseQuestion extends Component {
  state = {
    questions: [],
  };

  handleChangeQuestion = (index, data) => {
    const { questions } = this.state;
    const { onChange, type } = this.props;

    const stateData = questions.slice();
    stateData[index] = { ...stateData[index], ...data };

    this.setState({ questions: stateData }, () => {
      onChange(type, index, stateData[index]);
      // this.filterSelectedType(stateData);
    });
  };

  handleAddOption = (index) => {
    const { questions } = this.state;
    const { onChange, type } = this.props;

    const stateData = questions.slice();
    let options = stateData[index]?.options || [];
    const demoData = { text: '', isAnswer: false };
    if (Array.isArray(options)) {
      options.push(demoData);
    } else {
      options = [demoData];
    }
    stateData[index] = { ...stateData[index], ...{ options } };

    this.setState({ questions: stateData }, () => {
      onChange(type, index, stateData[index]);
      // this.filterSelectedType(stateData);
    });
  };

  handleChangeOption = (indexItem, indexOption, data) => {
    const { questions } = this.state;
    const { onChange, type } = this.props;

    const stateData = questions.slice();

    if (!stateData[indexItem]) {
      stateData.push({ options: [] });
    }

    let options = stateData[indexItem].options;
    options[indexOption] = { ...options[indexOption], ...data };
    stateData[indexItem] = { ...stateData[indexItem], ...{ options } };

    this.setState({ questions: stateData }, () => {
      onChange(type, indexItem, stateData[indexItem]);
      // this.filterSelectedType(stateData);
    });
  };

  handleRemoveOption = (indexOptions, indexItem) => {
    const { questions } = this.state;
    const { onChange, type } = this.props;

    const stateData = questions.slice();
    let options = stateData[indexItem].options;
    options.splice(indexOptions, 1);
    stateData[indexItem] = { ...stateData[indexItem], ...{ options } };

    this.setState({ questions: stateData }, () => {
      onChange(type, indexItem, stateData[indexItem]);
      // this.filterSelectedType(stateData);
    });
  };

  handleRemoveQuestion = (indexItem) => {
    const { remove, type } = this.props;
    remove(type, indexItem);
  };

  handleOptionsEnterKey = (e, index, options, optionsIndex) => {
    if (e.key === 'Enter' && optionsIndex === options.length - 1) {
      this.handleAddOption(index);
      const classParentElement = e.target.parentElement.parentElement;

      setTimeout(() => {
        // console.warn(classParentElement);
        const nextInput = classParentElement.nextSibling.querySelector('input');
        if (nextInput) nextInput.focus();
      }, 100);
    }
  };

  componentDidMount() {
    const { onChange, type, items } = this.props;
    // if (onChange) onChange(type, null, this.returnOptions());
    this.setState({ questions: items });
  }

  render() {
    const { remove, items = [], type, addQuestion, t } = this.props;
    // const { options, questions } = this.state;
    return (
      <div className={styles.question_container}>
        <div className={styles.heading}>
          <span className={styles.type_icon}>
            <img src={MultipleTypeImage} alt="type icon" />
          </span>
          <div className={styles.paragraphs}>
            <p className={styles.title}>
              {t('job.add_job.questionnaire.title')}
            </p>
            <p className={styles.sub_title}>
              {t('job.add_job.questionnaire.description')}
            </p>
          </div>
        </div>

        <div className={styles.questions}>
          {items.map((q, index) => {
            const { options = [], question } = q;
            return (
              <div key={index} className={styles.question_item}>
                <div
                  className={styles.remove_section}
                  onClick={() => this.handleRemoveQuestion(type, index)}
                >
                  <DeleteOutlined />
                </div>
                <div className={styles.head}>
                  <span className={styles.index_section}>{index + 1}.</span>
                  <input
                    type="text"
                    placeholder={t(
                      'job.add_job.questionnaire.question_placeholder'
                    )}
                    value={question}
                    onChange={({ target }) =>
                      this.handleChangeQuestion(index, {
                        question: target.value,
                      })
                    }
                  />
                </div>

                <div
                  className={styles.row_title}
                  style={{ opacity: options.length > 0 ? 1 : 0 }}
                >
                  <span>
                    {t('job.add_job.questionnaire.options_head.answer')}
                  </span>
                  <span className={styles.action_wrapper}>
                    {t(
                      'job.add_job.questionnaire.options_head.approved_answer'
                    )}
                  </span>
                  <span className={styles.action_wrapper}>
                    {t('job.add_job.questionnaire.options_head.remove')}
                  </span>
                </div>
                <div className={styles.content}>
                  {options.map((item, optionsIndex) => (
                    <div key={optionsIndex} className={styles.item}>
                      <div>
                        <span
                          className={classnames({
                            [styles.fake_radio]: !q.isMultiChoose,
                            [styles.fake_checkbox]: q.isMultiChoose,
                          })}
                        />
                        <input
                          className={styles.item_input}
                          type="text"
                          placeholder={t(
                            'job.add_job.questionnaire.options_placeholder'
                          )}
                          value={item.text}
                          onKeyDown={(e) =>
                            this.handleOptionsEnterKey(
                              e,
                              index,
                              options,
                              optionsIndex
                            )
                          }
                          onChange={({ target }) => {
                            this.handleChangeOption(index, optionsIndex, {
                              text: target.value,
                            });
                          }}
                        />
                        <div className={styles.action_wrapper}>
                          <Checkbox
                            checked={item.isCorrect}
                            onChange={({ target }) => {
                              this.handleChangeOption(index, optionsIndex, {
                                isCorrect: target.checked,
                              });
                            }}
                          />
                        </div>

                        <div
                          className={classnames(
                            styles.remove,
                            styles.action_wrapper
                          )}
                          onClick={() => {
                            this.handleRemoveOption(optionsIndex, index);
                          }}
                        >
                          <DeleteOutlined />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    className={styles.add_options}
                    type="button"
                    onClick={() => this.handleAddOption(index)}
                  >
                    + {t('button.add_other_options')}
                  </button>

                  <div className={styles.additional_filter}>
                    <div className={styles.option}>
                      <Switch
                        disabled={q.isAllAnswer}
                        checked={q.isMultiChoose}
                        onChange={(value) => {
                          if (!value) {
                            this.handleChangeQuestion(index, {
                              isMultiChoose: value,
                              isLastOne: false,
                              isAllAnswer: false,
                            });
                          } else {
                            this.handleChangeQuestion(index, {
                              isMultiChoose: value,
                            });
                          }
                        }}
                      />
                      <span className={styles.label}>
                        {t('job.add_job.questionnaire.multiple_select')}
                      </span>
                    </div>

                    {q.isMultiChoose && (
                      <>
                        <div className={styles.option}>
                          <Switch
                            checked={q.isLastOne}
                            onChange={(value) => {
                              this.handleChangeQuestion(index, {
                                isLastOne: value,
                                isAllAnswer: false,
                              });
                            }}
                          />
                          <span className={styles.label}>
                            {t('job.add_job.questionnaire.candidate_lastone')}
                          </span>
                        </div>

                        <div className={styles.option}>
                          <Switch
                            checked={q.isAllAnswer}
                            onChange={(value) => {
                              this.handleChangeQuestion(index, {
                                isAllAnswer: value,
                                isLastOne: false,
                              });
                            }}
                          />
                          <span className={styles.label}>
                            {t('job.add_job.questionnaire.candidate_selectall')}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <button
            className={styles.add_question}
            type="button"
            onClick={() => addQuestion(type, {})}
          >
            + {t('button.add_more')}
          </button>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(ChooseQuestion);

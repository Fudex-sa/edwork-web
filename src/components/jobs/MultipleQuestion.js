import React, { Component } from 'react';
import styles from './styles/question.module.scss';
import { Switch, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Select } from '~components/forms';
import classnames from 'classnames';

import MultipleTypeImage from '~assets/imgs/multiple-type.svg';
const demoQuestionData = {
  question: '',
  options: [{}],
};

export default class MultipleQuestion extends Component {
  state = {
    questions: [],
  };

  handleAddOption = (index) => {
    const { questions } = this.state;
    const { onChange, type } = this.props;

    const stateData = questions.slice();
    let options = stateData[index].options;
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

  handleChangeOption = (indexItem, indexOption, data) => {
    const { questions } = this.state;
    const { onChange, type } = this.props;

    const stateData = questions.slice();
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

  componentDidMount() {
    const { onChange, type, items } = this.props;
    // if (onChange) onChange(type, null, this.returnOptions());
    this.setState({ questions: items });
  }

  render() {
    const { remove, items = [], type, addQuestion } = this.props;
    return (
      <div className={styles.question_container}>
        <div className={styles.heading}>
          <span className={styles.type_icon}>
            <img src={MultipleTypeImage} alt="type icon" />
          </span>
          <div className={styles.paragraphs}>
            <p className={styles.title}>Selection tool (MULTIPLE ANSWERS)</p>
            <p className={styles.sub_title}>
              Ask questions with multiple answers allowed. Additionally, apply
              filters to show only people who are looking for.
            </p>
          </div>
        </div>

        <div className={styles.questions}>
          {items.map((q, index) => {
            const { options = [], question } = q;
            return (
              <div className={styles.question_item}>
                <div
                  className={styles.remove_section}
                  onClick={() => remove(index)}
                >
                  <DeleteOutlined />
                </div>
                <div className={styles.head}>
                  <input
                    type="text"
                    placeholder="Type the question here ..."
                    value={question}
                    onChange={({ target }) =>
                      this.handleChangeQuestion(index, {
                        question: target.value,
                      })
                    }
                  />
                  {/* <div className={styles.toggle}>
                  <span>Accept more than one answer</span>
                  <Switch
                    checked={multiChoose}
                    onChange={this.handleChangeCheckboxStatus}
                  />
                </div> */}
                </div>

                <div className={styles.row_title}>
                  <span>Answer</span>
                  <span className={styles.action_wrapper}>Correct?</span>
                  <span className={styles.action_wrapper}>Remove</span>
                </div>

                <div className={styles.content}>
                  {options.map((item, optionsIndex) => (
                    <div key={optionsIndex} className={styles.item}>
                      <div>
                        <span className={classnames(styles.fake_checkbox)} />
                        <input
                          className={styles.item_input}
                          type="text"
                          placeholder="Option"
                          value={item.text}
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
                        {/* <Select
                        value={item.answer}
                        // label="Validity"
                        noMarginContainer
                        placeholder="Rate answer"
                        options={[
                          'Mandatory',
                          'Recomended',
                          'Normal',
                          'Wrong answer',
                        ]}
                        onChange={(value) => {
                          this.handleChangeOption(
                            optionsIndex,
                            'answer',
                            value
                          );
                        }}
                      /> */}
                        <span
                          className={classnames(
                            styles.remove,
                            styles.action_wrapper
                          )}
                          onClick={() => {
                            this.handleRemoveOption(optionsIndex, index);
                          }}
                        >
                          <DeleteOutlined />
                        </span>
                      </div>
                    </div>
                  ))}
                  <button
                    className={styles.add_options}
                    type="button"
                    onClick={() => this.handleAddOption(index)}
                  >
                    + Add other options
                  </button>
                </div>
              </div>
            );
          })}

          <button
            className={styles.add_question}
            type="button"
            onClick={() => addQuestion(type, demoQuestionData)}
          >
            + Add more
          </button>
        </div>
      </div>
    );
  }
}

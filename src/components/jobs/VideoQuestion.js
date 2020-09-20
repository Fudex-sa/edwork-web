import React, { Component } from 'react';
import styles from './styles/question.module.scss';
import { DeleteOutlined } from '@ant-design/icons';
import { withNamespaces } from 'react-i18next';

import VideoTypeIcon from '~assets/imgs/video-record-type.svg';

class VideoQuestion extends Component {
  state = {
    questions: [],
  };

  handleChange = (index, data) => {
    const { questions } = this.state;
    const { onChange, type } = this.props;

    const stateData = questions.slice();
    stateData[index] = { ...stateData[index], ...data };

    this.setState({ questions: stateData }, () => {
      onChange(type, index, stateData[index]);
    });
  };

  handleRemove = (index) => {
    const { remove, type } = this.props;
    remove(type, index);
  };

  componentDidMount() {
    const { items = [] } = this.props;

    this.setState({ questions: [...items] });
  }

  render() {
    const { type, items = [], addQuestion, t } = this.props;
    return (
      <div className={styles.question_container}>
        <div className={styles.heading}>
          <span className={styles.type_icon}>
            <img src={VideoTypeIcon} alt="type icon" />
          </span>
          <div className={styles.paragraphs}>
            <p className={styles.title}>{t('job.add_job.video.title')}</p>
            <p className={styles.sub_title}>
              {t('job.add_job.video.description')}
            </p>
          </div>
        </div>

        <div className={styles.questions}>
          {items.map((q, index) => {
            const { question } = q;
            return (
              <div key={index} className={styles.question_item}>
                <div
                  className={styles.remove_section}
                  onClick={() => this.handleRemove(index)}
                >
                  <DeleteOutlined />
                </div>
                <div className={styles.head}>
                  <input
                    type="text"
                    placeholder={t(
                      'job.add_job.questionnaire.question_placeholder'
                    )}
                    value={question}
                    onChange={({ target }) => {
                      this.handleChange(index, {
                        question: target.value,
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
          <button
            className={styles.add_question}
            type="button"
            onClick={() => {
              addQuestion(type, {});
            }}
          >
            + {t('button.add_more')}
          </button>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(VideoQuestion);

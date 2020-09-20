import React, { Component } from 'react';
import styles from './styles/question.module.scss';
import { DeleteOutlined } from '@ant-design/icons';
import classnames from 'classnames';

export default class DiscussionQuestion extends Component {
  state = {
    question: '',
  };

  handleChange = ({ target }) => {
    const { onChange, index, type } = this.props;
    const data = {
      question: target.value,
    };
    this.setState(data);
    if (onChange) onChange(type, index, data);
  };

  componentDidMount() {
    const { onChange, type } = this.props;
    if (onChange) onChange(type, null, this.state);
  }

  render() {
    const { remove, items } = this.props;
    const { question } = this.state;
    return (
      <div className={styles.question_container}>
        <div className={styles.questions}>
          {items.map((q, index) => (
            <div className={styles.question_item}>
              <div
                className={styles.remove_section}
                onClick={() => remove(index)}
              >
                <DeleteOutlined />
              </div>
              <div className={classnames(styles.head, styles.discission)}>
                <input
                  value={question}
                  type="text"
                  placeholder="Type the question here ….."
                  onChange={this.handleChange}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

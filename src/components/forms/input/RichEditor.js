import React, { Component } from 'react';
import { Input as InputAd } from 'antd';
import styles from './styles/input.module.scss';
import classnames from 'classnames';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { TextArea } = InputAd;

export default class RichEditor extends Component {
  render() {
    const {
      placeholder = 'Placeholder',
      label = '',
      afterLabel,
      onChange,
      value = '',
      type = 'text',
      textarea,
      disabled,
      pre,
    } = this.props;
    return (
      <div className={styles.input_wrapper}>
        <p
          className={classnames(styles.label, {
            [styles.labelShow]: value.length > 0,
          })}
        >
          {label}
        </p>

        <ReactQuill
          theme="snow"
          className={styles.richEditor}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

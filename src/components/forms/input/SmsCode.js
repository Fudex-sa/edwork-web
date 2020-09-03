import React, { Component } from 'react';
import ReactCodeInput from 'react-verification-code-input';
import styles from './styles/sms-code.module.scss';

export default class SmsCode extends Component {
  render() {
    const { onComplete, onChange } = this.props;
    return (
      <ReactCodeInput
        className={styles.content_sms_code}
        fields={4}
        onChange={(value) => {
          if (onChange) onChange(value);
        }}
        onComplete={(value) => {
          if (onComplete) onComplete(value);
        }}
      />
    );
  }
}

import React, { Component } from 'react';
import { Switch } from 'antd';
import styles from './styles/input.module.scss';
import classnames from 'classnames';

export default class Toggle extends Component {
  render() {
    const { onChange, checked, label, subLabel } = this.props;
    return (
      <div className={styles.jobadd_input_wrapper}>
        <div>
          <p className={classnames(styles.label)}>{label}</p>
          <p className={classnames(styles.sub_label)}>{subLabel}</p>
        </div>
        <div style={{ margin: '20px 0' }}>
          <Switch checked={checked} onChange={onChange} />
        </div>
      </div>
    );
  }
}

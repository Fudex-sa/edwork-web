import React, { Component } from 'react';
import styles from '~containers/Jobs/styles/addJob.module.scss';

export default class PriceSum extends Component {
  render() {
    const { sum = 0 } = this.props;
    return (
      <div className={styles.price_sum}>
        <span>Total = {sum} SAR</span>
      </div>
    );
  }
}

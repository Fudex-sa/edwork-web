import React, { PureComponent } from 'react';
import styles from './styles/timer-wrapper.module.scss';

let timerId = null;
const timerLimit = 30;

export default class TimerWrapper extends PureComponent {
  state = {
    timer: 0,
  };

  onUpdateTimer = () => {
    const { onFinished } = this.props;
    this.setState({
      timer: timerLimit,
    });

    timerId = setInterval(() => {
      const { timer } = this.state;

      if (timer === 0) {
        clearInterval(timerId);
        if (onFinished) onFinished();
      }

      this.setState({
        timer: timer - 1,
      });
    }, 1000);
  };

  render() {
    const { children, isActive } = this.props;
    const { timer } = this.state;

    if (isActive) {
      return (
        <div className={styles.container}>
          <span>You can try again in {timer} seconds</span>
        </div>
      );
    }

    return children;
  }
}

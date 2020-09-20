import React from 'react';
import styles from './styles/nav.module.scss';
import classnames from 'classnames';

const Nav = (props) => {
  const dots = [];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    dots.push(
      <div
        key={`step-${i}`}
        className={classnames(styles.dot, {
          [styles.active]: isActive,
        })}
        // onClick={() => props.goToStep(i)}
      >
        {/* <div className={styles.dot_body}>{i}</div> */}
        {/* <div className={styles.dot_title}>{props.setTitle[i - 1]}</div> */}
      </div>
    );
  }

  return <div className={styles.nav}>{dots}</div>;
};

export default Nav;

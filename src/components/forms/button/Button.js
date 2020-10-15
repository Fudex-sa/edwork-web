import React, { Component } from 'react';
import { Button as ButtonAnt } from 'antd';
import styles from './styles/button.module.scss';
import classnames from 'classnames';
export default class Button extends Component {
  render() {
    const {
      children,
      isLoading,
      type = 'button',
      onClick,
      text,
      icon,
      classStyle,
      danger,
      fullWidth,
      size,
      ghost,
      shape,
    } = this.props;
    return (
      <ButtonAnt
        className={classnames(styles.button, classStyle, {
          [styles.full_width]: fullWidth,
        })}
        type={'primary'}
        htmlType={type}
        danger={danger}
        ghost={ghost}
        loading={isLoading}
        onClick={onClick}
        size={size}
        shape={shape}
        // {...this.props}
      >
        {text}
        {/* {children && <span className={styles.button_txt}>{text}</span>} */}
      </ButtonAnt>
    );
  }
}

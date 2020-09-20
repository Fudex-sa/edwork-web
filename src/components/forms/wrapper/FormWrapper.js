import React, { Component } from 'react';
import styles from './styles/wrapper.module.scss';
import classnames from 'classnames';

export default class FormWrapper extends Component {
  handleOnSubmit = (e) => {
    const { onSubmit } = this.props;
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  render() {
    const { children, title, className = {} } = this.props;
    return (
      <form
        onSubmit={this.handleOnSubmit}
        className={classnames(styles.wizard_wrapper, className)}
      >
        {title && <h3>{title}</h3>}
        {children}
      </form>
    );
  }
}

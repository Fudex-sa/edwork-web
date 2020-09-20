import React, { Component } from 'react';
import styles from './styles/activateUser.module.scss';
import { Button } from '../forms';
import { withNamespaces } from 'react-i18next';

class VerifyCompany extends Component {
  render() {
    const { isLoading, onClick, status, t } = this.props;
    if (status) return null;
    return (
      <div className={styles.container}>
        <p>Please verify your company account</p>
        <div>
          <Button
            isLoading={isLoading}
            onClick={onClick}
            // danger
            text="Verify"
          />
        </div>
      </div>
    );
  }
}

export default withNamespaces()(VerifyCompany);

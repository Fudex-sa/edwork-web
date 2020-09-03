import React, { Component } from 'react';
import { Button } from '~components/forms';
import styles from './styles/wizard.module.scss';
import { withNamespaces } from 'react-i18next';

class WizardNavigation extends Component {
  render() {
    const {
      options,
      isLoadingSubmit,
      onSubmit,
      finishBtnText = 'Registration',
      t,
    } = this.props;
    return (
      <div className={styles.container}>
        {options.currentStep > 1 && (
          <Button
            text={t('button.prev')}
            size="large"
            onClick={options.previousStep}
          />
        )}
        {options.currentStep !== options.totalSteps && (
          <Button text={t('button.next')} size="large" onClick={onSubmit} />
        )}

        {options.currentStep === options.totalSteps && (
          <Button
            isLoading={isLoadingSubmit}
            text={finishBtnText}
            size="large"
            onClick={onSubmit}
          />
        )}
      </div>
    );
  }
}

export default withNamespaces()(WizardNavigation);

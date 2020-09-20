import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNamespaces } from 'react-i18next';
import { message as notify } from 'antd';

// Components
import { Button, FormWrapper } from '~components/forms';

// styles
import styles from '../styles/verification.module.scss';

// Actions
import verificationCompany from '../actions/verificationCompany';

class ProofingDocuments extends Component {
  state = {
    filesArr: [],
  };

  handleChangeFile = (e) => {
    const { files } = e.nativeEvent.target;
    const { filesArr = [] } = this.state;

    const newFiles = Array.from(files);
    const filesArrCp = [...filesArr, ...newFiles];

    this.setState({ filesArr: filesArrCp });
    e.target.value = '';
  };

  handleRemoveFile = (index) => {
    const { filesArr } = this.state;
    const filesArrCp = filesArr.slice();
    filesArrCp.splice(index, 1);
    this.setState({
      filesArr: filesArrCp,
    });
  };

  handleOnSubmit = () => {
    const { verificaitonActions, history } = this.props;
    const { filesArr } = this.state;
    const data = new FormData();

    filesArr.forEach((item) => {
      data.append('file[]', item);
    });

    verificaitonActions.verificationCompany(data, {
      success: (response) => {
        const { message } = response;
        notify.success(message);
        history.replace('/dashboard');
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  render() {
    const { filesArr } = this.state;
    const { t, isVerificationCompanyLodaing } = this.props;
    return (
      <FormWrapper title={t('verify.proofing_document_title')}>
        <div className={styles.files}>
          <input type="file" multiple onChange={this.handleChangeFile} />
          <p className={styles.placeholder}>
            <FontAwesomeIcon icon={['fas', 'plus']} />
            <span>{t('verify.add_document')}</span>
          </p>
        </div>

        <div className={styles.files_container}>
          {filesArr.map((item, index) => (
            <div className={styles.file_item} key={index}>
              <span>{item.name}</span>
              <div className={styles.actions}>
                <button
                  type="button"
                  onClick={() => {
                    this.handleRemoveFile(index);
                  }}
                >
                  <FontAwesomeIcon icon={['fas', 'trash']} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.button_wrapper}>
          <Button
            isLoading={isVerificationCompanyLodaing}
            text={t('button.done')}
            size="large"
            fullWidth
            onClick={this.handleOnSubmit}
          />
        </div>
      </FormWrapper>
    );
  }
}

const mapStateToProps = (store) => ({
  isVerificationCompanyLodaing: store.dashboard.isVerificationCompanyLodaing,
});
const mapDispatchToProps = (dispatch) => ({
  verificaitonActions: bindActionCreators({ verificationCompany }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(ProofingDocuments));

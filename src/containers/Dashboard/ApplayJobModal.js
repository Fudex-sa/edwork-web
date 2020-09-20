import React, { Component } from 'react';
import { connectModal } from 'redux-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNamespaces } from 'react-i18next';
import { message as notify } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { message as notifi } from 'antd';

// Styles
import styles from './styles/my-website.module.scss';

// Components
import Modal from '~components/common/Modal';
import QRCode from 'react-qr-code';

// Assets
import HuaweiStore from '~assets/imgs/landing/huawei-app-store@2x.png';
import GooglePlay from '~assets/imgs/landing/googleplay-store@2x.png';
import AppStore from '~assets/imgs/landing/appstore@2x.png';

class ApplayJobModal extends Component {
  state = {
    name: '',
    type: undefined,
  };

  componentDidMount() {
    // const { registrationActions } = this.props;
    // registrationActions.getRegion();
  }

  copyIframeHref = async (link) => {
    const { user } = this.props;

    if (!navigator.clipboard) {
      console.error('Clipboard API not available');
      return;
    }

    try {
      await navigator.clipboard.writeText(link);
      notify.success('Link is copied');
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  render() {
    const { show, handleHide, isLoadingCustomCategory, t, jobId } = this.props;
    const { name, type } = this.state;

    console.warn(this.props);

    const domain = window.location.origin;
    const link = `${domain}/job-detail/${jobId}`;

    return (
      <Modal
        className="modal_content gray_content small"
        modalIsOpen={show}
        onRequestClose={handleHide}
        title={t('modal.apply.title')}
      >
        <div className={styles.apply_content}>
          <div className={styles.step}>
            <div className={styles.section}>
              <div className={styles.number}>1</div>
              <span>{t('modal.apply.step1.title')}</span>
            </div>
            <div className={styles.store_links}>
              <a href="#">
                <img src={HuaweiStore} alt="huawei store" />
              </a>
              <a href="#">
                <img src={GooglePlay} alt="Google play" />
              </a>
              <a href="#">
                <img src={AppStore} alt="AppStore" />
              </a>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.section}>
              <div className={styles.number}>2</div>
              <span>{t('modal.apply.step2.title')}</span>
            </div>
            <div className={styles.copy_link}>
              <div className={styles.link}>{link}</div>
              <div
                className={styles.copy}
                onClick={() => {
                  this.copyIframeHref(link);
                }}
              >
                <FontAwesomeIcon icon={['fas', 'copy']} /> {t('button.copy')}
              </div>
            </div>
          </div>

          <div className={styles.qr_code}>
            <QRCode value={link} size="128" />
            {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png"
              alt="qr code" */}
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (store) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connectModal({ name: 'applayJob' })(
  connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(ApplayJobModal))
);

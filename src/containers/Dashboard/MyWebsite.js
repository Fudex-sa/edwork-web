import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { show } from 'redux-modal';
import HeaderDark from '~components/common/HeaderDark';
import styles from './styles/my-website.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message as notify } from 'antd';
import moment from 'moment';

import LogoWhiteBlue from '~assets/imgs/logo_white_blue.svg';
import ApplayJobModal from './ApplayJobModal';

// Actions
import getFrameInfo from './actions/getFrameInfo';
import setFrameData from './actions/setFrameData';
import LoadingWrapper from '~components/common/LoadingWrapper';

class MyWebsite extends Component {
  state = {
    editMode: false,
    bgColor: '#f7f8f8',
    textColor: '#000000',
    name: 'Company name',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, fugit architecto. Dolor sapiente quo debitis! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, fugit architecto. Dolor sapiente quo debitis!',
    nameEditable: false,
    descEditable: false,
    file: undefined,
    filePath: '',
  };

  handleOpenApplay = (jobId) => {
    const { modalActions } = this.props;
    modalActions.show('applayJob', { jobId });
  };

  componentDidMount() {
    const { match, user } = this.props;

    const companyId = match.params?.id;
    const company = user?.Company;
    const isIframe = match.path.indexOf('/iframe') !== -1;

    this.getWebsiteData(isIframe ? companyId : company.id);
  }

  makeEditable = (name, status = true) => {
    const { editMode } = this.state;
    if (!editMode) return;

    this.setState({
      [name]: status,
    });

    if (!status) {
      this.setWebsiteData();
    }
  };

  handleChangeColorPicker = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleToggleEditMode = () => {
    const { editMode } = this.state;

    this.setState({
      editMode: !editMode,
    });
  };

  copyIframeHref = async () => {
    const { user } = this.props;
    const company = user?.Company;

    const domain = window.location.origin;
    const link = `${domain}/iframe/${company.id}`;

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

  getWebsiteData = (companyId) => {
    const { websiteActions, user } = this.props;
    const company = user?.Company;

    const data = { company_id: companyId || 121 };
    websiteActions.getFrameInfo(data, {
      success: (request) => {
        const { data } = request;
        const { iframe } = data;
        // console.warn(data);

        const iframeData = {
          description: iframe?.description || company.description,
          name: iframe?.company_name || company.name,
          filePath: iframe?.logo || company.logo_path,
          bgColor: iframe?.background_color || '#f7f8f8',
          textColor: iframe?.text_color || '#000',
        };

        this.setState(iframeData);
      },
    });
  };

  setWebsiteData = () => {
    const { websiteActions } = this.props;
    const { bgColor, textColor, name, description, file } = this.state;

    const data = new FormData();
    data.append('company_name', name);
    data.append('description', description);
    data.append('background_color', bgColor);
    data.append('text_color', textColor);
    if (file) {
      data.append('logo', file);
    }

    websiteActions.setFrameData(data, {
      success: (response) => {
        const { message } = response;
        notify.success(message);
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  render() {
    const {
      bgColor,
      nameEditable,
      descEditable,
      name,
      textColor,
      description,
      file,
      filePath,
      editMode,
    } = this.state;
    const { isLoadingWebsiteFrame, websiteFrameData, match } = this.props;
    const { jobs = [] } = websiteFrameData;

    const companyId = match.params?.id;
    const isIframe = match.path.indexOf('/iframe') !== -1;

    return (
      <div>
        {!isIframe && (
          <>
            <HeaderDark />

            <div className={styles.customization_header}>
              <p className={styles.desc}>
                This is your website, you can share it or custumise it as you
                wish
              </p>
              <div className={styles.actions}>
                <div onClick={this.handleToggleEditMode}>
                  <FontAwesomeIcon icon={['fas', 'eye']} />
                  {editMode ? 'Public view' : 'Edit mode'}
                </div>
                <div className={styles.no_border} onClick={this.copyIframeHref}>
                  <FontAwesomeIcon icon={['fas', 'copy']} />
                  Copy link
                </div>
              </div>
            </div>
          </>
        )}

        <LoadingWrapper isLoading={isLoadingWebsiteFrame}>
          <div
            className={styles.custom_bg}
            style={{ backgroundColor: bgColor }}
          >
            <div className={styles.change_bg}>
              {editMode && (
                <>
                  <input
                    type="color"
                    className={styles.color_input}
                    value={bgColor}
                    onBlur={() => {
                      this.setWebsiteData();
                    }}
                    onChange={({ target }) => {
                      this.handleChangeColorPicker('bgColor', target.value);
                    }}
                  />
                  <span>Change background color</span>
                </>
              )}
            </div>

            <div className={classnames(styles.about_company, styles.container)}>
              <label className={styles.logo}>
                <img
                  src={file ? URL.createObjectURL(file) : filePath}
                  alt="logo"
                />

                {editMode && (
                  <input
                    type="file"
                    onChange={(e) => {
                      this.setState(
                        {
                          filePath: e.target.value,
                          file: e.nativeEvent.target.files[0],
                        },
                        () => {
                          this.setWebsiteData();
                        }
                      );
                    }}
                  />
                )}
              </label>
              <div className={styles.name}>
                <span
                  onDoubleClick={() => {
                    this.makeEditable('nameEditable');
                  }}
                >
                  <input
                    style={{ color: textColor }}
                    type="text"
                    value={name}
                    disabled={!nameEditable || !editMode}
                    onBlur={() => {
                      this.makeEditable('nameEditable', false);
                    }}
                    onChange={({ target }) => {
                      this.setState({
                        name: target.value,
                      });
                    }}
                  />
                </span>
              </div>
              <div className={styles.description}>
                <span
                  style={{ color: textColor }}
                  onDoubleClick={() => {
                    this.makeEditable('descEditable');
                  }}
                >
                  {descEditable ? (
                    <textarea
                      style={{ color: textColor }}
                      onChange={({ target }) => {
                        this.setState({
                          description: target.value,
                        });
                      }}
                      onBlur={() => {
                        this.makeEditable('descEditable', false);
                      }}
                    >
                      {description}
                    </textarea>
                  ) : (
                    description
                  )}
                </span>

                {editMode && (
                  <input
                    type="color"
                    className={styles.color_input}
                    value={textColor}
                    onBlur={() => {
                      this.setWebsiteData();
                    }}
                    onChange={({ target }) => {
                      this.handleChangeColorPicker('textColor', target.value);
                    }}
                  />
                )}
              </div>
            </div>

            <div className={classnames(styles.job_content, styles.container)}>
              {/* <div className={styles.head}>
              <div className={styles.filter}>
                <div className={styles.item}>
                  <Select
                    options={['select 1', 'select 2']}
                    placeholder="Select location"
                    onChange={(value) => {
                      console.warn(value);
                      // onChange(index, { btweenFrom: value });
                    }}
                  />
                </div>
                <div className={styles.item}>
                  <Select
                    options={['select 1', 'select 2']}
                    placeholder="Type of job"
                    onChange={(value) => {
                      console.warn(value);
                      // onChange(index, { btweenFrom: value });
                    }}
                  />
                </div>
              </div>
              <form className={styles.search}>
                <input type="text" name="search" placeholder="Search..." />
                <button type="submit">
                  <FontAwesomeIcon icon={['fas', 'search']} />
                </button>
              </form>
            </div> */}
              <div className={styles.job_list}>
                {jobs.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <div className={styles.left_side}>
                      <p className={styles.posted_time}>
                        Posted {moment(item.created_at).fromNow()}
                      </p>
                      <p className={styles.job_postions}>{item.title}</p>
                      <p className={styles.company_name}>Holidy inn - Dammam</p>
                      <div className={styles.tags}>
                        <div>
                          <span>Type of job:</span>
                          <p>Flexible work</p>
                        </div>
                        <div>
                          <span>Type of job:</span>
                          <p>Flexible work</p>
                        </div>
                      </div>
                      <div className={styles.description}>
                        <p>
                          Provides financial information to management by
                          researching and analyzing accounting data; preparing
                          reports. Prepares asset, liability, and capital acc…..
                        </p>
                      </div>
                    </div>
                    <div className={styles.right_side}>
                      <button
                        type="button"
                        onClick={() => {
                          this.handleOpenApplay(item.id);
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <p>Powered by</p>
            <a
              href="https://fursatak.app/"
              target="_blank"
              className={styles.logo}
            >
              <img src={LogoWhiteBlue} alt="logo" />
            </a>
          </div>
        </LoadingWrapper>

        <ApplayJobModal companyId={companyId} />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  isLoadingWebsiteFrameSetData: store.dashboard.isLoadingWebsiteFrameSetData,
  isLoadingWebsiteFrame: store.dashboard.isLoadingWebsiteFrame,
  websiteFrameData: store.dashboard.websiteFrameData,

  user: store.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  websiteActions: bindActionCreators({ getFrameInfo, setFrameData }, dispatch),
  modalActions: bindActionCreators({ show }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyWebsite);

import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles/header.module.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import stopImage from "~assets/imgs/Path 560.png";
import repostImage from "../../assets/imgs/Path 562.png";
import editImage from "../../assets/imgs/Icon feather-edit.png";
import shareLink from "../../assets/imgs/Path 561.png";
import AppGallery from "../../assets/imgs/AppGallery.png";
import GooglePlay from "../../assets/imgs/Google Play.png";
import AppStore from "../../assets/imgs/App Store.png";
import Copy from "../../assets/imgs/copy.png";
import QrCode from "../../assets/imgs/qrcode.png";
import getJobsList from "../../containers/Jobs/actions/getJobsList";
import { Select } from "../forms";

import { message as notify } from "antd";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import history from "../../history";
import {
  AuditOutlined,
  MailOutlined,
  DownOutlined,
  RedoOutlined,
  FormOutlined,
  UploadOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

// Assets
import Logo from "~assets/imgs/logo_white_blue.svg";

// Actions
import logout from "../../containers/Auth/actions/logout";
import { Dropdown, Button, Menu, Tooltip, Switch } from "antd";
import stopPost from "../../containers/Jobs/actions/stopPost";
var QRCode = require("qrcode.react");

const Actions = (props) => {
  const { items = [] } = props;
  return (
    <div className={styles.cell_actions}>
      {items.map((item, index) => (
        <Tooltip title={item.title}>
          <span className={styles.action} onClick={item.action}>
            <item.Icon />
          </span>
        </Tooltip>
      ))}
    </div>
  );
};

const jobList = (data, jobId) => (
  <Menu>
    {data
      .filter((item) => item.id !== parseInt(jobId))
      .map((item) => (
        <Menu.Item key={item.id}>
          <a
            rel="noopener noreferrer"
            href={window.location.origin + "/job/detail/" + item.id}
          >
            {item.title}
          </a>
        </Menu.Item>
      ))}
  </Menu>
);

class HeaderJobDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copySuccess: false,
    };
  }
  componentDidMount() {
    const { jobsActions } = this.props;
    this.getJobsList();
    // console.log("myData", this.props.jobsData);
  }
  getJobsList = async () => {
    const { jobsActions } = this.props;
    await jobsActions.getJobsList({
      success: (response) => {
        const { message, data } = response;
        console.log(response);
      },
      fail: (response) => {
        console.log(response);
        const { message } = response;
        notify.error(message);
      },
    });
  };

  logout = (e) => {
    const { userActions } = this.props;
    e.preventDefault();
    userActions.logout();
  };

  copyCodeToClipboard = () => {
    const el = this.input;
    el.select();
    document.execCommand("copy");
    this.setState({ copySuccess: true });
  };
  goToJob = ({ target }) => {
    let jobPath = `${window.location.origin}/job/detail/${target.value}`;
    window.location.replace(jobPath)
    console.log(jobPath);
  };
  render() {
    const { jobsList, jobId } = this.props;
    return (
      <div className={classnames(styles.header, styles.white)}>
        <div className={styles.container}>
          <div className={styles.logo_container}>
            <a href="/" className={styles.logo}>
              <img src={Logo} alt="logo" />
            </a>
          </div>
          <div className={styles.nav_container}>

            < div className="form-group mt-2">
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={this.goToJob}
              >
                {jobsList.map((job, index) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.alloptions}>
              <Popup
                trigger={
                  <button className={styles.containerOption}>
                    <img
                      src={shareLink}
                      alt="shareLink"
                      className={styles.iconstyle+'mr-3'+'mr-2'}
                      style={{marginLeft:'40px'}}
                    />

                    <span className={styles.spanoption} style={{marginLeft:'12px'}}>Share apply link</span>
                  </button>
                }
                position="right center"
                modal
                nested
              >
                <div className="d-flex m-5" style={{ flexDirection: "row" }}>
                  <div
                    style={{
                      backgroundColor: "#707070",
                      color: "#fff",
                      width: "40px",
                      height: "40px",
                      textAlign: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <h3 style={{ color: "#fff" }}>1</h3>
                  </div>
                  <span
                    style={{
                      color: "#707070",
                      marginLeft: "10px",
                      marginTop: "5px",
                    }}
                  >
                    Download "Fursatak" App
                  </span>
                </div>

                <div
               
                  className={styles.publishways}
                >
                  <a
                    href="https://play.google.com/store/apps/details?id=io.swvl.customer"
                    target="blank"
                  >
                    <img
                      src={AppGallery}
                      alt="AppGallery"
                      className={styles.appgallery}
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=io.swvl.customer"
                    target="blank"
                  >
                    <img src={GooglePlay} alt="GooglePlay" />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=io.swvl.customer"
                    target="blank"
                  >
                    <img src={AppStore} alt="AppGallery" />
                  </a>
                </div>
                <div className="d-flex m-5" style={{ flexDirection: "row" }}>
                  <div
                    style={{
                      backgroundColor: "#707070",
                      color: "#fff",
                      width: "40px",
                      height: "40px",
                      textAlign: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <h3 style={{ color: "#fff" }}>2</h3>
                  </div>
                  <span
                    style={{
                      color: "#707070",
                      marginLeft: "10px",
                      marginTop: "5px",
                    }}
                  >
                    Enter this link
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    ref={(input) => (this.input = input)}
                    value="https..//fursatak.app"
                    className={styles.fursatak}
                    id="myInput"
                    style={{
                      width: "50%",
                      backgroundColor: "#F7F8F8",
                      borderRadius: "15px",
                      padding: "8px 12px",
                      border: "none",
                      marginRight: "12%",
                    }}
                  />
                  <button
                    onClick={() => this.copyCodeToClipboard()}
                    style={{ border: "none" }}
                  >
                    <div style={{ display: "flex" }}>
                      <img src={Copy} alt="Copy" />

                      <span
                        style={{
                          textDecoration: "none",
                          color: "#333",
                          marginLeft: "6px",
                          fontWeight: "bold",
                        }}
                      >
                        Copy
                      </span>
                    </div>
                  </button>
                  {this.state.copySuccess ? (
                    <div style={{ color: "green" }}>Success!</div>
                  ) : null}
                </div>
                <div className="text-center mt-3">
                  {/* <img src={QrCode} alt="QrCode" /> */}
                  <QRCode value="http://facebook.github.io/react/" />,
                </div>
              </Popup>

              <Link to={"/jobs/edit/" + jobId}>
                <button className={styles.containerOption}>
                  <img
                    src={editImage}
                    alt="editimage"
                    className={styles.iconstyle}
                    style={{marginRight:'10px'}}

                  />
                  <span className={styles.spanoption}>Edit post</span>
                </button>
              </Link>
              <Link to={"/jobs/repost/" + jobId}>
                <button className={styles.containerOption}>
                  <img
                    src={repostImage}
                    alt="repostimage"
                    className={styles.iconstyle}
                    style={{marginRight:'17px'}}
                  />
                  <span className={styles.spanoption}>Re-post</span>
                </button>
              </Link> 
              <button
                className={styles.containerOption}
                onClick={() => {
                  this.props.userActions.stopPost(
                    {
                      id: jobId,
                    },
                    {
                      success: (response) => {
                        const { message } = response;
                        notify.success(message);
                      },
                      fail: (response) => {
                        const { message } = response;
                        notify.error(message);
                      },
                    }
                  );
                }}
              >
                <img
                  src={stopImage}
                  alt="stopimage"
                  className={styles.iconstyle}
                  style={{marginRight:'27px'}}
                />
                <span className={styles.stopspan} style={{marginRight:'6px'}}>Stop</span>
              </button>

            </div>
          </div>
        </div>
        </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
  jobsList: store.jobs.jobsList,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators({ logout, stopPost }, dispatch),
  jobsActions: bindActionCreators({ getJobsList }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderJobDetail);

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import styles from "./styles/job-list.module.scss";
import moment from "moment";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
// import "./css/startuphubkhobar.css";
import Logo from "../../containers/Intro/StartJobs/img/logo.png";
import facebookImg from "../../containers/Intro/StartJobs/img/facebook.png";
import instagramIcon1 from "../../containers/Intro/StartJobs/img/instagram1.png";
import instagramIcon2 from "../../containers/Intro/StartJobs/img/instagram2.png";
import shape1 from "../../containers/Intro/StartJobs/img/shape1.png";
import shape2 from "../../containers/Intro/StartJobs/img/shape2.png";
import shape3 from "../../containers/Intro/StartJobs/img/shape3.png";
import shape4 from "../../containers/Intro/StartJobs/img/shape4.png";
import shape5 from "../../containers/Intro/StartJobs/img/shape5.png";
import shape6 from "../../containers/Intro/StartJobs/img/shape6.png";
import shape7 from "../../containers/Intro/StartJobs/img/shape7.png";
import shape8 from "../../containers/Intro/StartJobs/img/shape8.png";
import shape9 from "../../containers/Intro/StartJobs/img/shape9.png";
import shape10 from "../../containers/Intro/StartJobs/img/shape10.png";
import shape11 from "../../containers/Intro/StartJobs/img/shape11.png";
import shape12 from "../../containers/Intro/StartJobs/img/shape12.png";
import shape13 from "../../containers/Intro/StartJobs/img/shape13.png";
import shape14 from "../../containers/Intro/StartJobs/img/shape14.png";
import shape15 from "../../containers/Intro/StartJobs/img/shape15.png";
import shape16 from "../../containers/Intro/StartJobs/img/shape16.png";

class carearList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      job: {},
    };
    this.setModal = this.setModal.bind(this);
  }
  setModal(modal, job = {}) {
    this.setState({ modal, job });
  }
  render() {
    const { data } = this.props;
    const { job } = this.state;
    return (
      <div>
        <div className="anima-container-center-horizontal">
          <img className="hub-logo-C61RwL" src={Logo} />
        </div>
        <div className="u0645u062c-0644-u0628-C61RwL font-class-1 mt-3">
          مجمع ريادة الأعمال بالخبرمجمع ريادة الأعمال بالخبرمجمع ريادة الأعمال
          بالخبرمجمع ريادة الأعمال بالخبرمجمع ريادة الأعمال بالخبرمجمع ريادة
          الأعمال بالخبرمجمع ريادة الأعمال بالخبر
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "20px 0px",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
        <div className="anima-container-center-horizontal mb-5">
          <div className="group-C61RwL">
            <a href="https://startuphubkhobar.sa" target="_blank">
              <img
                className="global-2-copy-NOXmfT mr-5"
                src={require("../../containers/Intro/StartJobs/img/startup-hub-khobar-global-2-copy-DB347675-11F6-4DF0-8BA4-4F468B7A32EC@2x.png")}
                style={{ width: "33px", height: "33px" }}
              />
            </a>
            <a
              href="https://www.instagram.com/startuphubkhobar/"
              target="_blank"
            >
              <img
                className="instagram-copy-NOXmfT mr-5"
                src={require("../../containers/Intro/StartJobs/img/startup-hub-khobar-instagram-copy-DF92545F-A7C5-4A26-8261-72ADD7B5E7EA@2x.png")}
                style={{ width: "33px", height: "33px" }}
              />
            </a>
            <a href="https://twitter.com/Startuphubkhbr" target="_blank">
              <img
                className="twitter-copy-NOXmfT mr-5"
                src={require("../../containers/Intro/StartJobs/img/startup-hub-khobar-twitter-copy-F21D428F-6BBB-4AD8-B5F4-7386C62D3244@2x.png")}
                style={{ width: "33px", height: "33px" }}
              />
            </a>

            <a
              href="https://www.facebook.com/Startup-Hub-Khobar-412299525997808/"
              target="_blank"
            >
              <img
                className="facebook-copy-NOXmfT mr-5"
                src={require("../../containers/Intro/StartJobs/img/startup-hub-khobar-facebook-copy-F0071E02-8558-41C5-BFFD-D19FF24158F4@2x.png")}
                style={{ width: "33px", height: "33px" }}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/startup-hub-khobar/about/"
              target="_blank"
            >
              <img
                className="linkedin-copy-NOXmfT mr-5"
                src={require("../../containers/Intro/StartJobs/img/startup-hub-khobar-linkedin-copy-F1981D00-3E8A-430C-88B4-267E7F904997@2x.png")}
                style={{ width: "33px", height: "33px" }}
              />
            </a>
          </div>
        </div>
        <div
          className="rectangle-copy-C61RwL"
          style={{ width: "100%", border: "1px solid #CCC" }}
        >
          {data.map((job, index) => (
            <div
              key={job.id}
              onClick={() => this.setModal(true, job)}
              className="card m-3 pb-3"
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 10px",
                    justifyContent: "space-between",
                    marginLeft: "10px",
                  }}
                >
                  <span>{job.title}</span>
                  <span style={{ color: "#CCC", fontSize: "15px" }}>
                    اسم الشركه
                  </span>
                  <span>Fudex للبرمجه</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px 20px",
                    marginTop: "30px",
                  }}
                >
                  <span style={{ color: "#CCC", fontSize: "15px" }}>
                    للتقديم
                  </span>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "#20C933",
                      borderRadius: "5px",
                      color: "#FFF",
                      width: "60px",
                    }}
                  >
                    {job.active ? "Open" : "Close"}
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px 20px",
                    marginTop: "35px",
                  }}
                >
                  <span style={{ color: "#CCC", fontSize: "15px" }}>
                    تاريخ الإعلان
                  </span>
                  <span style={{}}>
                    {moment(job.created_at).format("DD-MM-YYYY")}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px 20px",
                    marginTop: "30px",
                  }}
                >
                  <span style={{ color: "#CCC", fontSize: "15px" }}>
                    المدينه
                  </span>
                  <button
                    style={{
                      border: "none",
                      borderRadius: "5px",
                      width: "60px",
                    }}
                  >
                    الخبر
                  </button>
                </div>
              </div>
            </div>
          ))}
          <PureModal
            className={styles.modalStyle}
            isOpen={this.state.modal}
            width="600px"
            closeButton="close"
            closeButtonPosition="top"
            onClose={() => {
              this.setModal(false);
              return true;
            }}
          >
            <div
              className="ml-3"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <a
                className="item text-right"
                onClick={() => this.setModal(false)}
                style={{ color: "#CCC" }}
              >
                <i className="fa fa-times-circle fa-2x" aria-hidden="true"></i>
              </a>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  marginTop: "10px",
                }}
              >
                {job.title}
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    color: "#CCC",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  عنوان الوظيفه
                </span>
                <span>{job.title}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    color: "#CCC",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  اسم الشركه
                </span>
                <span>Fudex للبرمجه</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    color: "#CCC",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  للتقديم
                </span>
                <button
                  style={{
                    border: "1px solid #CCC",
                    width: "16%",
                    border: "none",
                    backgroundColor: "#20C933",
                    borderRadius: "5px",
                    color: "#FFF",
                  }}
                >
                  {job.active ? "Open" : "Close"}
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    color: "#CCC",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  تاريخ الإعلان
                </span>
                <span>{job.created_at}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    color: "#CCC",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  المدينه
                </span>
                <span
                  style={{
                    border: "1px solid #CCC",
                    backgroundColor: "#FFF",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {" "}
                  {job.Addresses &&
                  job.Addresses.length &&
                  job.Addresses[0].Governorate > 0
                    ? job.Addresses[0].Governorate.name.en
                    : "Not set"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    color: "#CCC",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  المنطقه
                </span>
                <span>المنطقه الشرقيه</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    color: "#CCC",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  الحد الأدنى للخبره
                </span>
                <span>سنوات 3</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    color: "#CCC",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  الحد الأدنى للتعليم
                </span>
                <span
                  style={{
                    border: "1px solid #CCC",
                    width: "16%",
                    padding: "3px",
                    border: "none",
                    backgroundColor: "#CCC",
                    borderRadius: "5px",
                    color: "#FFF",
                  }}
                >
                  ثانويه عامه
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    color: "#CCC",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  الوصف الوظيفى
                </span>
              </div>
            </div>
          </PureModal>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  (state) => state,
  mapDispatchToProps
)(withNamespaces()(carearList));

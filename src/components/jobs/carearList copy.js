import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import styles from "./styles/job-list.module.scss";

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
    };
    this.setModal = this.setModal.bind(this);
  }
  setModal(modal) {
    this.setState({ modal });
  }
  render() {
    const { headTitles, data = [] } = this.props;
    console.warn(data);
    return (
      <div>
        {data.map((job, index) => (
          <div key={job.id}>
            <div className="startuphubkhobar1 anima-screen">
              <div className="rectangle-copy-C61RwL">
                <iframe
                  className="airtable-embed"
                  // src="https://airtable.com/embed/shrrDn9nPIFospcZp?backgroundColor=purple&layout=card"
                  frameborder="0"
                  onmousewheel=""
                  width="100%"
                  height="100%"
                  style={{
                    background: "transparent",
                    border: "1px solid #ccc",
                  }}
                ></iframe>
                <button
                  onClick={() => this.setModal(true)}
                  className="card ml-3 mr-3"
                  style={{ position: "absolute", top: 10, width: "95%" }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px 10px",
                        justifyContent: "space-between",
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
                        marginLeft: "30px",
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
                        marginLeft: "30px",
                      }}
                    >
                      <span style={{ color: "#CCC", fontSize: "15px" }}>
                        تاريخ الإعلان
                      </span>
                      <span style={{}}>
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
                        padding: "0px 20px",
                        marginTop: "30px",
                        marginLeft: "30px",
                      }}
                    >
                      <span style={{ color: "#CCC", fontSize: "15px" }}>
                        المدينه
                      </span>
                      <button style={{ border: "none", borderRadius: "5px" }}>
                        الخبر
                      </button>
                    </div>
                  </div>
                </button>

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
                      <i
                        class="fa fa-times-circle fa-2x"
                        aria-hidden="true"
                      ></i>
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
                      <span>
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
                        المدينه
                      </span>
                      <input
                        type="text"
                        placeholder="الخبر"
                        disabled
                        style={{
                          border: "1px solid #CCC",
                          backgroundColor: "#FFF",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      />
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
              <div className="anima-container-center-horizontal">
                <img className="hub-logo-C61RwL" src={Logo} />
              </div>
              <div className="u0645u062c-0644-u0628-C61RwL font-class-1">
                مجمع ريادة الأعمال بالخبرمجمع ريادة الأعمال بالخبرمجمع ريادة
                الأعمال بالخبرمجمع ريادة الأعمال بالخبرمجمع ريادة الأعمال
                بالخبرمجمع ريادة الأعمال بالخبرمجمع ريادة الأعمال بالخبر
                <br />
              </div>
              <div className="anima-container-center-horizontal">
                <div className="group-C61RwL">
                  <a
                    href="https://www.instagram.com/startuphubkhobar/"
                    target="_blank"
                  >
                    <div className="instagram-NOXmfT">
                      <img className="shape-aqZ4Sd" src={instagramIcon1} />
                      <img className="oval-aqZ4Sd" src={instagramIcon2} />
                    </div>
                  </a>
                  <a
                    href="https://www.facebook.com/StartUpHubKhobar/"
                    target="_blank"
                  >
                    <div className="facebook-NOXmfT">
                      <img className="path-e5GK5c" src={facebookImg} />
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/startup-hub-khobar/about/"
                    target="_blank"
                  >
                    <div className="linkedin-NOXmfT"></div>
                  </a>
                  <a href="https://twitter.com/Startuphubkhbr" target="_blank">
                    {" "}
                    <div className="twitter-NOXmfT"></div>
                  </a>
                  <div className="global-2-NOXmfT">
                    <img className="path-ttmW0C" src={shape1} />
                    <img className="path-LLxRjN" src={shape2} />
                    <img className="path-VhcBLE" src={shape3} />
                    <img className="path-brSqjp" src={shape4} />
                    <img className="path-VQst24" src={shape5} />
                    <img className="path-1og7zh" src={shape6} />
                    <img className="path-AfCyfb" src={shape7} />
                    <img className="path-026VEG" src={shape8} />
                    <img className="path-apxJo5" src={shape9} />
                    <img className="path-92pbm4" src={shape10} />
                    <img className="path-k5KRVh" src={shape11} />
                    <img className="path-VDFvcu" src={shape12} />
                    <img className="path-SW9xrz" src={shape13} />
                    <img className="path-0wixww" src={shape14} />
                    <img className="path-7Bgfnb" src={shape15} />
                    <img className="path-LvSRBQ" src={shape16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  (state) => state,
  mapDispatchToProps
)(withNamespaces()(carearList));

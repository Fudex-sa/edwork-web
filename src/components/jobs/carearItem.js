import React, { PureComponent } from "react";
import styles from "./styles/job-list.module.scss";
import moment from "moment";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// import "./css/startuphubkhobar.css";
import Copy from "../../assets/imgs/copy.png";
import shareLink from "../../assets/imgs/Path 561.png";
import AppGallery from "../../assets/imgs/AppGallery.png";
import GooglePlay from "../../assets/imgs/Google Play.png";
import AppStore from "../../assets/imgs/App Store.png";
class carearItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      job: {},
      jobLinlk: "",
    };
  }
  copyCodeToClipboard = () => {
    const el = this.input;
    el.select();
    document.execCommand("copy");
    this.setState({ copySuccess: true });
  };
  generateLink = (id) => {
    let jobLinlk = document.location.href + "?jobId=" + id;
    this.setState({ jobLinlk });
  };

  setModal = (modal, job = {}) => {
    this.setState({ modal, job });
  };
  render() {
    const { jobs } = this.props;
    const jobId = this.props.jobId.search.slice(7, 100);
    const { job, jobLinlk } = this.state;
    return (
      <div
        className="rectangle-copy-C61RwL"
        style={{ width: "100%", border: "1px solid #CCC" }}
      >
        {jobs.map((job, index) => (
          <div key={job.id} className="card m-3 pb-3">
            <div className="row p-3">
              <div className="col-4">
                <div className="card-title">{job.title}</div>
                <div className="pt-2">
                  <div style={{ color: "#CCC", fontSize: "15px" }}>
                    اسم الشركه
                  </div>
                  <div>{job?.Company?.name}</div>
                </div>
              </div>
              <div className="col-2 d-flex align-items-start flex-column">
                <div
                  className="card-title"
                  style={{ color: "#CCC", fontSize: "15px" }}
                >
                  للتقديم
                </div>
                <div
                  className="pt-2"
                  style={{ color: "#CCC", fontSize: "15px" }}
                >
                  <button
                    onClick={
                      job.id == jobId
                        ? this.setModal(true, job)
                        : () => this.setModal(job.active, job)
                    }
                    className={
                      job.active
                        ? "btn btn-success btn-sm"
                        : "btn btn-danger btn-sm disabled"
                    }
                  >
                    {job.active ? "Open" : "Close"}
                  </button>
                </div>
              </div>
              <div className="col-2">
                <div
                  className="card-title"
                  style={{ color: "#CCC", fontSize: "15px" }}
                >
                  تاريخ الإعلان
                </div>
                <div className="pt-2">
                  {moment(job.created_at).format("DD-MM-YYYY")}
                </div>
              </div>
              <div className="col-2">
                <div
                  className="card-title"
                  style={{ color: "#CCC", fontSize: "15px" }}
                >
                  المدينه
                </div>
                <div className="pt-2">
                  <button className="btn btn-secondary btn-sm">الخبر</button>
                </div>
              </div>
              <div className="col-2" onClick={() => this.generateLink(job.id)}>
                <div className="card-title">Share</div>
                <div className="pt-2">
                  <Popup
                    trigger={
                      <button className={styles.containerOption}>
                        <img
                          src={shareLink}
                          alt="shareLink"
                          style={{ width: "16px", height: "17px" }}
                          className={styles.iconstyle}
                        />

                        <span className={styles.spanoption}>Share</span>
                      </button>
                    }
                    position="right center"
                    modal
                    nested
                  >
                    <div
                      className="d-flex m-5"
                      style={{ flexDirection: "row" }}
                    >
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
                      className="d-flex mb-5 mt-5"
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <a
                        href="https://play.google.com/store/apps/details?id=io.swvl.customer"
                        target="blank"
                      >
                        <img
                          src={AppGallery}
                          alt="AppGallery"
                          style={{ marginLeft: "11%" }}
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
                    <div
                      className="d-flex m-5"
                      style={{ flexDirection: "row" }}
                    >
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
                        value={jobLinlk}
                        className={styles.fursatak}
                        name="jobLinlk"
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
                    </div>
                  </Popup>
                </div>
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
    );
  }
}

export default carearItem;

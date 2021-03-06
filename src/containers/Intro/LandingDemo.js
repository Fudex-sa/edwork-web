import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/landingDemo.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "~assets/imgs/Group 3274.svg";
import iphone from "~assets/imgs/iphone.svg";
import Thumblike from "~assets/imgs/Path 808.svg";
import fursatac from "~assets/imgs/fursatac.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo1 from "../../assets/imgs/landing/Color.svg"

class LandingDemo extends Component {
  render() {
    return (
      <section className="landingDemo">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-9 col-sm-12"></div>
            <div className="col-md-3 col-sm-12 mt-5 logodiv">
              <div className={styles.logocontainer}>
                <img src={Logo1} alt="logo1" className="text-center" style={{   width: '112px',height:'40px'}} />

                <div className={styles.logospan}>إطلاق تجريبى</div>
              </div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md-3 col-sm-12 text-center"
           >

              {/* <img src={iphone} alt="iphone" className={styles.iphoneimg} />
              <div className={styles.imgPar}>
                <img
                  src={fursatac}
                  alt="fursatac"
                  className={styles.fursatacimg}
                />
              </div> */}
              </div>
            <div className="col-md-6 col-sm-12 text-center">
              <div>
                <h1 className={styles.title}>
                  <img src={Thumblike} alt="" className={styles.thumblike} />
                  وظف بذكاء و بأقل وقت
                </h1>
              </div>
              <p className={styles.description}>أعلن عن وظيفة | افرز و وفلتر | أختر الأنسب واتمم عملية التوظيف</p>
              <div className={styles.routes}>
                <a href="https://airtable.com/shrvqGKJrOWuqrb26">
                  <button type="button" className={styles.showOpportunity}>
                    استعراض الفرص
                  </button>
                </a>{" "}
                <a href="https://airtable.com/shr6L7E3H69RvwqcC">
                  <button type="button" className={styles.create_account}>
                    <FontAwesomeIcon className={styles.arrow} icon={["fas", "arrow-left"]} />
                    إضافه إعلان وظيفى 
                  </button>
                </a>
              </div>
            </div>
          </div>
          {/* <span className={styles.emaillink}>info@fursatak.app</span> */}
          
          <div>
            <span>
              <a href="mailto:someone@example.com" className={styles.emaillink}>info@Joobly.co</a>
            </span>
          </div>
        </div>
      </section>
    );
  }
}
export default LandingDemo;

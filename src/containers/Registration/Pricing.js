import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/plans.module.scss";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withNamespaces } from "react-i18next";
import Group from "../../assets/imgs/Group 2633.svg";
import PricingCard from "./Cards/PricingCard";

class Pricing extends Component {
  componentDidMount() {
    window.scrollTo(0,0) 
  }
  render() {
    const items=[
      "Valid for unlimited posts",
      "Data access on anytime",
      "Manage candidates applications",
      "Sorting options",
      "Filtration options"
    ]
    // const { lang, t } = this.props;
    console.log("myprops", this.props);
    return (
      <section className={styles.section}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9 mt-3">
              <div className={styles.headerimg}>
                <img src={Group} alt="group" />
              </div>
              <div className={styles.row}>
                <h1 className={styles.price}>Pricing</h1>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-9 m-auto">
                  <PricingCard
                    header="1 Jop Post"
                    color="#000000"
                    backgroundColor="#000000"
                    plan="Plan 1"
                    salaryNum="3000"
                    items={items}

                  />
                </div>
                <div className="col-md-3 col-sm-9 m-auto">
                  <PricingCard
                    header="Unlimited posts"
                    time="For 3 months"
                    color="#0091FF"
                    backgroundColor="#0091FF"
                    plan="Plan 2"
                    salaryNum="1999"
                    items={items}
                  />
                </div>
                <div className="col-md-3 col-sm-9 m-auto">
                  <PricingCard
                    header="Unlimited posts"
                    time="For 12 months"
                    color="#9538FF"
                    backgroundColor="#9538FF"
                    plan="Plan 3"
                    salaryNum="7000"
                    items={items}
                  />
                </div>
              </div>
            </div>
            <div
              className="col-md-3"
              style={{
                backgroundColor: "#1BCBFF",
                display: "flex",
                // width:'500px',
                height: "821px",
                overflowY: "hidden"
              }}
            >
              <div className={styles.leftcontainer}>
                <span>Get</span>
                <h3 className={styles.freeheader}>14-days FREE trial</h3>
                <span>No credit card needed!</span>
                <Link to="/registration">
                  <button type="button" className={styles.create_account}>
                    join now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Pricing;

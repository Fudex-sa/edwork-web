import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/plans.module.scss";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import "../../Pay/Pay";
class PricingCard extends Component {
  state = { showPay: false };

  showPayment = () => {
    this.setState({ showPay: true });
  };
  render() {
    const {
      header,
      color,
      backgroundColor,
      time,
      salaryNum,
      items,
    } = this.props;
    return (
      <div className={styles.planCard}>
        <div className={styles.planTypes}>
        
        <div className={styles.jobpost}>
        <h5 className={styles.jobpostheader1} style={{ color }}>
            {header}
          </h5>

          <span style={{height:'20px'}}>{time}</span>
          <div className={styles.salary}>
            <span className={styles.salarynum}>{salaryNum}</span>
            <span className={styles.SAR}>SAR</span>
          </div>
          {/* <button
            type="button"
            className={styles.pay}
            style={{ backgroundColor }}
          >
            pay
          </button> */}
        </div>
        </div>


        {items.map((item) => (
          <div className={styles.items}>
            <FontAwesomeIcon
              icon={["fa", "check"]}
              className={styles.truemark}
            />
            <span>{item}</span>
          </div>
        ))}
      </div>
    );
  }
}
export default PricingCard;

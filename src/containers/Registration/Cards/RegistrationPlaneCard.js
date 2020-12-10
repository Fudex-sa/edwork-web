import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/registrationChoosePlan.module.scss";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import "../../Pay/Pay";
class RegistrationPlaneCard extends Component {
  state = { showPay: false };

  showPayment = () => {
    this.setState({ showPay: true });
  };
  render() {
    const { color, backgroundColor,  plan} = this.props;
    return (
      <div className={styles.registerationCard}>
        <div className={styles.planTypes}>
          <h5 className={styles.jobpostheader1} style={{ color }}>
            {plan.title}
          </h5>
          <span>{plan.sub_title}</span>
        </div>
        <div className={styles.jobpost}>
          <div className={styles.salary}>
            <span className={styles.salarynum}>{plan.price}</span>
            <span className={styles.SAR}>SAR</span>
          </div>{" "}
          <button
            type="button"
            className={styles.pay}
            style={{ backgroundColor }}
          >
            pay
          </button>
        </div>
        {plan.Features.map(({name,id}) => (
          <div className={styles.items} key={id}>
            <FontAwesomeIcon
              icon={["fa", "check"]}
              className={styles.truemark}
            />
            <span>{name}</span>
          </div>
        ))}
      </div>
    );
  }
}
export default RegistrationPlaneCard;

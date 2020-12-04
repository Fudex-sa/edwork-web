import React ,{Component}from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/registrationChoosePlan.module.scss";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNamespaces } from 'react-i18next';
import '../../Pay/Pay'
class  PlansCard extends Component{
  state = { showPay: false };

  showPayment = () => {
    this.setState({ showPay: true });
  };
render(){
  const {header,color,backgroundColor}=this.props
  return (
    <div>
      <div className={styles.planTypes}>
  <h5 className={styles.jobpostheader1} style={{color}}>{header}</h5>
  <span>{this.props.time}</span>
        </div>
        <div className={styles.jobpost}>
                    <span className={styles.SAR}>300 SAR</span>
                    <button type="button" className={styles.pay} style={{backgroundColor}}>pay</button>
                  </div>
                  <div className={styles.items}>
                    <FontAwesomeIcon
                      icon={["fa", "check"]}
                      className={styles.truemark}
                    />
                    <span>sorting actions</span>
                  </div>
                  <div className={styles.items}>
                    <FontAwesomeIcon
                      icon={["fa", "check"]}
                      className={styles.truemark}
                    />
                    <span>sorting actions</span>
                  </div>
                  <div className={styles.items}>
                    <FontAwesomeIcon
                      icon={["fa", "check"]}
                      className={styles.truemark}
                    />
                    <span>sorting actions</span>
                  </div>
                  <div className={styles.items}>
                    <FontAwesomeIcon
                      icon={["fa", "check"]}
                      className={styles.truemark}
                    />
                    <span>sorting actions</span>
                  </div>
                  <div className={styles.items}>
                    <FontAwesomeIcon
                      icon={["fa", "check"]}
                      className={styles.truemark}
                    />
                    <span>sorting actions</span>
                  </div>
      
    </div>
  )
}
}
export default PlansCard

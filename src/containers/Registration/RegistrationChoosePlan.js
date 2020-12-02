// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import classnames from 'classnames';
// import { Tooltip } from 'antd';
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { withNamespaces } from 'react-i18next';

// import styles from './styles/registration.module.scss';

// // Components
// import HeaderDark from '~components/common/HeaderDark';
// import Pay from '../Pay/Pay';

// // Actions
// import setRegistrationData from './actions/setRegistrationData';

// class RegistrationChoosePlan extends Component {
//   state = { showPay: false };

//   goToDashboard = () => {
//     const { history } = this.props;
//     history.replace('/dashboard');
//   };

//   handlePayPlan = () => {
//     this.setState({ showPay: true });
//   };

//   render() {
//     const { showPay } = this.state;
//     const { t } = this.props;

//     if (showPay)
//       return (
//         <>
//           <HeaderDark />
//           <Pay />
//         </>
//       );
//     return (
//       <div>
//         <HeaderDark />
//         <div className={styles.choose_plan}>
//           <div className={styles.section_params}>
//             {[
//               t('user_plan.values.posting'),
//               t('user_plan.values.period'),
//               t('user_plan.values.company_page'),
//               t('user_plan.values.co_workers'),
//               t('user_plan.values.comment_app'),
//               t('user_plan.values.hr_tools'),
//             ].map((item, index) => (
//               <p className={styles.item} key={index}>
//                 <Tooltip title="Tooltip">
//                   <span className={styles.question}>?</span>
//                 </Tooltip>
//                 <span className={styles.text}>{item}</span>
//               </p>
//             ))}
//           </div>
//           <div className={styles.section}>
//             <span className={styles.title}>
//               {t('settings.membership.free')}
//             </span>
//             <div className={styles.content}>
//               <div className={styles.head}>
//                 <span className={styles.price}>0 SAR</span>
//                 <span className={styles.per_price}>
//                   {t('user_plan.options.free.only_extra')}
//                 </span>
//               </div>
//               <div className={styles.item}>
//                 {/* <CheckOutlined style={{ fontSize: '26px', color: '#22C932' }} /> */}
//                 <FontAwesomeIcon icon={['fa', 'check']} />
//               </div>
//               <div className={styles.item}>
//                 {t('user_plan.options.days', { day: 30 })}
//               </div>
//               <div className={styles.item}>
//                 <FontAwesomeIcon icon={['fa', 'times']} />
//               </div>
//               <div className={styles.item}>
//                 <FontAwesomeIcon icon={['fa', 'times']} />
//               </div>
//               <div className={styles.item}>
//                 <FontAwesomeIcon icon={['fa', 'times']} />
//               </div>

//               <div className={classnames(styles.item, styles.with_two)}>
//                 <p>{t('user_plan.options.free.extra_fees')}</p>
//                 <p style={{ opacity: '.3' }}>
//                   {t('user_plan.options.free.price_start', { price: 88 })}
//                 </p>
//               </div>
//               <div
//                 className={styles.button}
//                 style={{ backgroundColor: '#BCBCBC' }}
//                 role="button"
//                 onClick={() => this.goToDashboard()}
//               >
//                 {t('button.current_plan')}
//               </div>
//             </div>
//           </div>
//           <div className={styles.section}>
//             <span className={styles.title}>{t('settings.membership.pro')}</span>
//             <div className={styles.content}>
//               <div className={styles.head}>
//                 <span className={styles.price}>3999 SAR</span>
//                 <span className={styles.per_price}>
//                   {t('user_plan.options.per_year')}
//                 </span>
//               </div>
//               <div className={styles.item}>
//                 <FontAwesomeIcon icon={['fa', 'check']} />
//               </div>
//               <div className={styles.item}>
//                 {t('user_plan.options.days', { day: 60 })}
//               </div>
//               {[0, 1, 2, 3].map((item, index) => (
//                 <div className={styles.item} key={index}>
//                   <FontAwesomeIcon icon={['fa', 'check']} />
//                 </div>
//               ))}
//               <div
//                 className={styles.button}
//                 onClick={() => this.handlePayPlan()}
//               >
//                 {t('button.choose_plan')}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (store) => ({
//   registrationData: store.registration.registrationData,
// });

// const mapDispatchToProps = (dispatch) => ({
//   registrationActions: bindActionCreators({ setRegistrationData }, dispatch),
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withNamespaces()(RegistrationChoosePlan));

import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/registrationChoosePlan.module.scss";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withNamespaces } from "react-i18next";
import Group from "../../assets/imgs/Group 2633.svg";
class RegistrationChoosePlan extends Component {
  render() {
    // const { lang, t } = this.props;
console.log('myprops',this.props);
    return (
      <section className={styles.section}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9 mt-3">
              <div className={styles.headerimg}>
                <img src={Group} alt="group" />
              </div>
              <div
                className="row"
                style={{ marginTop: "35px", marginBottom: "35px" }}
              >
                <h1 className={styles.price}>Pricing</h1>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-9 m-auto">
                  <div className={styles.jobpost}>
                             <h5 className={styles.jobpostheader1}>ongoing posts</h5>
                    <span className={styles.SARspan}>1 job post</span>
                    <span className={styles.SAR}>300 SAR</span>
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
                <div className="col-md-3 col-sm-9 m-auto">
                  <div className={styles.jobpost}>
                    <h5 className={styles.jobpostheader2}>unlimited posts</h5>
                    <span className={styles.SARspan}>For 3 months</span>
                    <span className={styles.SAR}>300 SAR</span>
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
                <div className="col-md-3 col-sm-9 m-auto">
                  <div className={styles.jobpost}>
                    <h5 className={styles.jobpostheader3}>unlimited posts</h5>
                    <span className={styles.SARspan}>For 12 months</span>
                    <span className={styles.SAR}>300 SAR</span>
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
              </div>
            </div>
            <div
              className="col-md-3"
              style={{
                backgroundColor: "#1BCBFF",
                display: "flex",
                // width:'500px',
                height: "680px",
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
export default RegistrationChoosePlan;

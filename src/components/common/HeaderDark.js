import React, { Component } from "react";
import styles from "./styles/header.module.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import { Link} from "react-router-dom";
import UserPlanText from "./UserPlanText";
import moment from "moment";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Progress } from "antd";
import "./styles/header.module.scss";
import Career from "../../assets/imgs/carreer.png";
// Assets
import LogoWhiteBlue from "~assets/imgs/logo_white_blue.svg";
import GiftIcon from "~assets/imgs/gift.svg";

// Actions
import logout from "../../containers/Auth/actions/logout";

const LoginView = ({ actions, userData, t, history,toggleNavbar,collapsed}) => {
  const isProUser = userData.Company?.plan;
  const startPlan = moment(userData.Company?.plan_started_at);
  const endPlan = moment(userData.Company?.plan_finished_at);
  const daysLeft = endPlan.diff(moment(), "days") + 1;
  const goToPay = () => {
    history.push("/plans");
  };

  // const  toggleNavbar = () => {
  //   this.setState({collapsed:!this.state.collapsed})
  // }

  const handleCarear = () => {
    console.log("user", userData ? userData.CompanyId : null);
    history.push(`/company/carear/${userData ? userData.CompanyId : null}`);
  };
  return (
    <div style={{position:'relative'}} >
     <Navbar color="faded" light className={styles.sideDrawer}>
    <NavbarToggler onClick={toggleNavbar} style={{position:'absolute',right:50,zIndex:9999,marginBottom:'15px',backgroundColor:'#f4f6f7'}}/>

    <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
    <div className={styles.actions}>
      <NavItem>
      <div
        className={styles.plan_wrapper}
        onClick={() => {
          if (!isProUser) goToPay();
        }}
      >
        <FontAwesomeIcon icon={["fas", "infinity"]} />{" "}
        <span>Unlimited Posts</span>
        <Progress
          className={styles.progressBar}
          percent={(100 / 14) * daysLeft}
          status="normal"
          showInfo={false}
        />
        <div className={styles.days_left}>
          {daysLeft > 0 ? daysLeft : 0} Days left
        </div>
      </div>
      <a onClick={handleCarear} style={{ color: "black" }}>
        <div>
          <img src={Career} alt="Career" />
          <div className={styles.carearSpan}>Carear Page</div>
        </div>
      </a>
      </NavItem>
      <NavItem>
      {userData?.Company?.type === "accelerator" && (
        <div className={styles.settings + " pr-2"}>
          <Link to="/sponserd">
            <FontAwesomeIcon icon={["fas", "building"]} style={{marginLeft:'23px'}} />
            <div className={styles.sponserdSpan}>Sponserd</div>
          </Link>
        </div>
      )}
      </NavItem>
      <NavItem>
      <div className={styles.settings}>
        <Link to="/settings">
          <FontAwesomeIcon icon={["fas", "cog"]} />
          <div>Settings</div>
        </Link>
      </div>
      </NavItem>
      <NavItem>
      <div className={styles.signOut} onClick={actions.logout}>
        <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
        <div className={styles.logOutSpan}>Logout</div>
      </div>
      </NavItem>
    </div>
    </Nav>
        </Collapse>
    </Navbar>

    <div className={styles.headerwihoutside}>
    <div className={styles.actions}>
      <div
        className={styles.plan_wrapper}
        onClick={() => {
          if (!isProUser) goToPay();
        }}
      >
        <FontAwesomeIcon icon={["fas", "infinity"]} />{" "}
        <span>Unlimited Posts</span>
        <Progress
          className={styles.progressBar}
          percent={(100 / 14) * daysLeft}
          status="normal"
          showInfo={false}
        />
        <div className={styles.days_left}>{daysLeft} Days left</div>
      </div>
      <a onClick={handleCarear} style={{color:'black'}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <img src={Career} alt="Career"/> 
        <div className={styles.carearSpan}>Carear Page</div>
      </div>
      </a>

      {userData?.Company?.type === "accelerator" && (
        <div className={styles.settings + " pr-2 pl-4"}>
          <Link to="/sponserd">
            <FontAwesomeIcon icon={["fas", "building"]} />
            <div className={styles.sponserdSpan}>Sponserd</div>
          </Link>
        </div>
      )}
      <div className={styles.settings+ " pr-2 pl-3"}>
        <Link to="/settings">
          <FontAwesomeIcon icon={["fas", "cog"]} />
          <div>Settings</div>
        </Link>
      </div>    
      <div className={styles.signOut + " pr-2 pl-3"} onClick={actions.logout}>
        <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
        <div className={styles.logOutSpan}>Logout</div>
      </div>
      </div>
    </div>


    </div>
  );
};

class HeaderDark extends Component {
  state = {  
    collapsed:true
  }  
    
   toggleNavbar = () => {
    this.setState({collapsed:!this.state.collapsed})
  }
  logout = (e) => {
    const { userActions, history } = this.props;
    e.preventDefault();
    history.push("/login");
    userActions.logout();
  };
  render() {

    const { userData, t, history } = this.props;
    const hasRegistration =
      window.location.pathname.indexOf("/registration") !== -1;

    return (
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo_container}>
            <Link to={userData ? "/dashboard" : "/"} className={styles.logo}>
              <img src={LogoWhiteBlue} alt="logo" />
            </Link>
          </div>
          <div className={styles.nav_container}>
            {userData ? (
              <div>
                <LoginView
                  userData={userData}
                  toggleNavbar={this.toggleNavbar}
                  collapsed={this.state.collapsed}
                  actions={{
                    logout: this.logout,
                  }}
                  t={t}
                  history={history}
                />
              </div>
            ) : (
              <div className={styles.formLogin}>
                {!userData && (
                  <span className={styles.spec_text}>
                    {/* Registration is coming soon */}
                    {hasRegistration
                      ? t("header.have_account")
                      : t("heder.dont_have_account")}
                  </span>
                )}
                <Link
                  className={styles.button_nav}
                  to={hasRegistration ? "/login" : "/registration"}
                >
                  {hasRegistration
                    ? t("header.login")
                    : t("header.registration")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators({ logout }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withNamespaces()(HeaderDark)));

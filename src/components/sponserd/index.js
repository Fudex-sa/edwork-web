import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "~containers/Jobs/styles/job.module.scss";

import HeaderDark from "~components/common/HeaderDark";
import { WelcomeUser } from "~components/user";

import getSponserdCompany from "~containers/Auth/actions/getSponserdCompany";
import ListSponserdCompany from "./listSponserdCompany";

import Noavatar from "~assets/imgs/company_noavatar.svg";
import VerifyIcon from "~assets/imgs/verify_user.svg";

class SponserdCompanise extends Component {
  componentDidMount() {
    this.props.getSponserdCompany();
  }
  render() {
    const { companies, userData } = this.props;
    const companyData = userData?.Company;
    return (
      <div className="row">
        <div className="col-md-12">
          <HeaderDark userinfo={userData} />
        </div>
        <div className="m-auto">
          <div className="m-auto">
            {companyData?.logo_path ? (
              <img
                src={companyData.logo_path}
                alt="company logo"
                width="100%"
              />
            ) : (
              <img
                src={Noavatar}
                alt="company logo"
                className={styles.noavatar}
              />
            )}
          </div>
          <p className="text-center mt-2">
            {companyData?.verified && (
              <img src={VerifyIcon} alt="verify-user" />
            )}
            {companyData?.name}
          </p>
          <WelcomeUser user={userData} />
        </div>

        <div className="col-md-12">
          <ListSponserdCompany companies={companies} />
        </div>
      </div>
    );
  }
}

SponserdCompanise.propTypes = {
  companies: PropTypes.object.isRequired,
  getSponserdCompany: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  companies: auth.sponserd,
  userData: auth.user,
});

SponserdCompanise.propTypes = {};
export default connect(mapStateToProps, { getSponserdCompany })(
  SponserdCompanise
);

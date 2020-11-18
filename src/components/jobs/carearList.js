import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import "react-pure-modal/dist/react-pure-modal.min.css";
import SocialLinks from "./socialMediaLinks";
import CarearItem from "./carearItem";
// import "./css/startuphubkhobar.css";

class carearList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  render() {
    const { data,jobId } = this.props;
    return (
      <div>
        <SocialLinks />
        <CarearItem jobs={data} jobId={jobId}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  (state) => state,
  mapDispatchToProps
)(withNamespaces()(carearList));

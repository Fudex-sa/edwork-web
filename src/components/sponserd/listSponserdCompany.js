import React, { PureComponent } from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import moment from "moment";
import "react-pure-modal/dist/react-pure-modal.min.css";
// import "./css/startuphubkhobar.css";

class listSponserdCompany extends Component {

  componentDidMount() {
      this.props.getPosts()
      this.props.getSuggestionProfiles()
  }

  render() {
      const {posts, loading} = this.props.post;
      const {profiles} = this.props.profile;
      let postContent;
      let youmayInteristedIn;

      return (
          <div className="feed">
              <div>
                  <div className="row">
                      <div className="col-md-3 sidenav d-none d-md-block">
                          <h3 className='mb-3'>Discover....</h3>
                          {youmayInteristedIn}
                      </div>
                      <div className="col-md-12">
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

listSponserdCompany.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  getSuggestionProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
})

listSponserdCompany.propTypes = {};
export default connect(
  mapStateToProps,
  {getPosts, getSuggestionProfiles}
)(listSponserdCompany);
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {deletePost, addLike, removeLike} from "../../actions/postActions";

class SponserdItem extends Component {

    render() {
        const {post, auth, showActions} = this.props;
        
        return (
            <div className="card card-body mb-3">
            </div>
        );
    }
}

SponserdItem.propTypes = {

};

const mapStateToProps = state => ({
    auth: state.auth,
});

SponserdItem.defaultProps = {
    showActions: true
}
export default connect(
    mapStateToProps,
    {}
)(SponserdItem);
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

class listSponserdCompany extends Component {
  render() {
    const { companies } = this.props;
    let listOfCompanies = [];
    if (companies.length) {
      listOfCompanies = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Business Field</th>
              <th scope="col">Employees</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={company.id}>
                <th scope="row">{index + 1}</th>
                <td>{company.name}</td>
                <td>{company.business_field}</td>
                <td>{company.employees}</td>
                <td>{company.employees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <div className="card card-body mb-3">
        <Link to="/sponserd/create" className="mb-2">
          <button type="button" class="btn btn-primary">
            New Company
          </button>
        </Link>
        {listOfCompanies}
      </div>
    );
  }
}

listSponserdCompany.propTypes = {};
const mapStateToProps = (state) => ({});
listSponserdCompany.defaultProps = {};
export default connect(mapStateToProps, {})(listSponserdCompany);

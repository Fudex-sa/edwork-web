import React, { PureComponent } from "react";
import styles from "./styles/detail-header.module.scss";
import { Dropdown, Menu } from "antd";
import classnames from "classnames";
import { SwapOutlined, SearchOutlined, DownOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withNamespaces } from "react-i18next";

class DetailHeader extends PureComponent {
  render() {
    const {
      selected,
      onMoveUserToCategory,
      checkedUsers = [],
      customCategories = [],
      jobCandidate,
      t
    } = this.props;
    return (
      <div className={styles.head}>
        <span>
          {jobCandidate.length === 1
            ? jobCandidate.length + " Application"
            : jobCandidate.length > 1
            ? jobCandidate.length + " Applications"
            : "No Applications yet"}
        </span>

        <span>Application details</span>
        <span>Internal comments</span>
      </div>
    );
  }
}

export default withNamespaces()(DetailHeader);

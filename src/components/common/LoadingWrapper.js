import React, { Component } from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default class LoadingWrapper extends Component {
  render() {
    const { isLoading, children } = this.props;
    if (isLoading)
      return (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <LoadingOutlined style={{ fontSize: 30 }} />
        </span>
      );
    return children;
  }
}

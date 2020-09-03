import React, { Component } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    const { onChange } = this.props;
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        if (onChange) onChange({ imageUrl, file: info.file.originFileObj });
        this.setState({
          // imageUrl,
          loading: false,
        });
      });
    }
  };

  render() {
    const { placeholder = "Upload", value = {} } = this.props;

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">{placeholder}</div>
      </div>
    );

    const getImage = (value) => {
      if (typeof value === "string")
        return <img src={value} alt="avatar" style={{ width: "100%" }} />;
      else if (value.imageUrl)
        return (
          <img src={value.imageUrl} alt="avatar" style={{ width: "100%" }} />
        );
      else return uploadButton;
    };
    // const { imageUrl } = this.state;
    return (
      <Upload
        accept="image/*"
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {getImage(value)}
      </Upload>
    );
  }
}

export default Avatar;

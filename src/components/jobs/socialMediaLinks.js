import React, { Component } from "react";
import "react-pure-modal/dist/react-pure-modal.min.css";

class SocialLinks extends Component {
  render() {
    return (
      <div className="anima-container-center-horizontal mb-5">
        <a href="https://startuphubkhobar.sa" target="_blank">
          <img
            className="global-2-copy-NOXmfT mr-5"
            src={require("../../containers/Intro/StartJobs/img/startup-hub-khobar-global-2-copy-DB347675-11F6-4DF0-8BA4-4F468B7A32EC@2x.png")}
            style={{ width: "33px", height: "33px" }}
          />
        </a>
        <a href="https://www.instagram.com/startuphubkhobar/" target="_blank">
          <img
            className="instagram-copy-NOXmfT mr-5"
            src={require("../../containers/Intro/StartJobs/img/startup-hub-khobar-instagram-copy-DF92545F-A7C5-4A26-8261-72ADD7B5E7EA@2x.png")}
            style={{ width: "33px", height: "33px" }}
          />
        </a>
        <a href="https://twitter.com/Startuphubkhbr" target="_blank">
          <img
            className="twitter-copy-NOXmfT mr-5"
            src={require("../../containers/Intro/StartJobs/img/startup-hub-khobar-twitter-copy-F21D428F-6BBB-4AD8-B5F4-7386C62D3244@2x.png")}
            style={{ width: "33px", height: "33px" }}
          />
        </a>

        <a
          href="https://www.facebook.com/Startup-Hub-Khobar-412299525997808/"
          target="_blank"
        >
          <img
            className="facebook-copy-NOXmfT mr-5"
            src={require("../../containers/Intro/StartJobs/img/startup-hub-khobar-facebook-copy-F0071E02-8558-41C5-BFFD-D19FF24158F4@2x.png")}
            style={{ width: "33px", height: "33px" }}
          />
        </a>
        <a
          href="https://www.linkedin.com/company/startup-hub-khobar/about/"
          target="_blank"
        >
          <img
            className="linkedin-copy-NOXmfT mr-5"
            src={require("../../containers/Intro/StartJobs/img/startup-hub-khobar-linkedin-copy-F1981D00-3E8A-430C-88B4-267E7F904997@2x.png")}
            style={{ width: "33px", height: "33px" }}
          />
        </a>
      </div>
    );
  }
}

export default SocialLinks;

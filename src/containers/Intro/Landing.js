import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import { languageOptions } from "~configs/languageOptions";
import styles from "./styles/landing.module.scss";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

// Assets
import Logo from "~assets/imgs/logo_landing.svg";
import Signin from "~assets/imgs/landing/sign-in.svg";
import ArrowJobAvailable from "~assets/imgs/landing/arrow-jobavailable.svg";
import Mobile from "~assets/imgs/landing/phone@2x.png";
import HuaweiStore from "~assets/imgs/landing/huawei-app-store@2x.png";
import GooglePlay from "~assets/imgs/landing/googleplay-store@2x.png";
import AppStore from "~assets/imgs/landing/appstore@2x.png";
import Thumblike from "~assets/imgs/landing/thumb-like.svg";
import HearthIcon from "~assets/imgs/landing/heart-icon.svg";

import Flag from "~assets/imgs/landing/flag.png";

import Easytouse from "~assets/imgs/landing/easytouse.svg";
import SeeVideo from "~assets/imgs/landing/seevideo.svg";
import EffectiveFilter from "~assets/imgs/landing/effective-filter.svg";
import CoWorkers from "~assets/imgs/landing/co-workers.svg";
import Privacy from "~assets/imgs/landing/privacy.svg";
import SiteWidget from "~assets/imgs/landing/site-widget.svg";
import PeopleLocation from "~assets/imgs/landing/people-location.svg";
import RedirectLink from "~assets/imgs/landing/redirect-link.svg";
import Rubber from "~assets/imgs/landing/rubber.svg";
import { setLocale } from "~helpers/locale/actions";

class Landing extends Component {
  // switch between arabic and english
  changeLang = lang => {
    const { languageActions } = this.props;
    languageActions.setLocale(lang);
  };

  render() {
    const { lang, t } = this.props;

    return (
      <div>
        <div className={styles.header}>
          {/* landing page head */}
          <div className={classnames(styles.head, styles.container)}>
            <a href='/login'>
              <img src={Signin} alt='signin-icon' /> {t("landing.header.login")}
            </a>

            {/* switch between langaues */}
            <span
              onClick={() => {
                if (lang === languageOptions[0].value) {
                  // if lang = eng
                  this.changeLang(languageOptions[1].value); // change to arabic
                } else {
                  this.changeLang(languageOptions[0].value); // else change to english
                }
              }}>
              {lang === "en" ? languageOptions[1].label : languageOptions[0].label}
            </span>

            {/* head logo */}
            <a href='/' className={styles.logo}>
              <img src={Logo} alt='logo' />
            </a>
          </div>

          {/* landing page presentation */}
          <div className={styles.presentation}>
            {/* left side */}
            <div className={styles.left}>
              <div className={styles.mobile}>
                <img src={Mobile} alt='mobile wireframe' />
              </div>
              <div className={styles.store_links}>
                <div className={styles.our_app_text}>
                  <span>
                    {t("landing.header.jobs_available")}{" "}
                    <img src={ArrowJobAvailable} alt='' />
                  </span>
                </div>

                <div className={styles.stores}>
                  <a href='#'>
                    <img src={HuaweiStore} alt='huawei app store' />{" "}
                  </a>
                  <a href='#'>
                    <img src={GooglePlay} alt='google play' />{" "}
                  </a>
                  <a href='#'>
                    <img src={AppStore} alt='app store' />{" "}
                  </a>
                </div>
              </div>
            </div>

            {/* right side */}
            <div className={styles.right}>
              <h2 className={styles.head_title}>
                {t("landing.header.title")} <img src={Thumblike} alt='' />
              </h2>
              <p className={styles.desc}>{t("landing.header.description")}</p>
              <button type='button' className={styles.create_account}>
                {t("landing.header.button.create")}
              </button>
              <p className={styles.price}>{t("landing.header.button.sub_text")}</p>
            </div>

            {/* made with love in SA */}
            <div className={styles.made_with}>
              <img src={Flag} alt='hearth' />
              <div className={styles.text}>
                <p>{t("landing.header.made_with")}</p>
                <p>{t("landing.header.made_from")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.partners}>
          <h2 className={styles.section_title}>{t("landing.section.title.trust")}</h2>
          <div className={classnames(styles.partner_list, styles.container)}>
            {[0, 0, 0, 0, 0, 0, 0, 0].map((item, index) => (
              <div className={styles.item}>
                <img
                  src='https://cdn.vox-cdn.com/thumbor/VSSwGPlTwiV0AY5zL9Afu7KGpno=/0x28:640x388/1600x900/cdn.vox-cdn.com/assets/1311169/mslogo.jpg'
                  alt='partner image'
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.features}>
          <h2 className={styles.section_title}>{t("landing.section.title.why")}</h2>
          <div className={classnames(styles.items, styles.container)}>
            {[
              {
                title: t("landing.section.features.title.easy_to_use"),
                icon: Easytouse,
                description: t("landing.section.features.description.easy_to_use")
              },
              {
                title: t("landing.section.features.title.videos"),
                iconWrapperStyle: { padding: "15px 0" },
                icon: SeeVideo,
                description: t("landing.section.features.description.videos")
              },
              {
                title: t("landing.section.features.title.effictive"),
                iconWrapperStyle: { padding: "15px 0" },
                icon: EffectiveFilter,
                description: t("landing.section.features.description.effictive")
              },
              {
                title: t("landing.section.features.title.co_workers"),
                iconWrapperStyle: { padding: "15px 0" },
                icon: CoWorkers,
                description: t("landing.section.features.description.co_workers")
              },
              {
                title: t("landing.section.features.title.privacy"),
                icon: Privacy,
                description: t("landing.section.features.description.privacy")
              },
              {
                title: t("landing.section.features.title.website"),
                icon: SiteWidget,
                description: t("landing.section.features.description.website")
              },
              {
                title: t("landing.section.features.title.people_around"),
                iconWrapperStyle: { padding: "10px 0" },
                icon: PeopleLocation,
                description: t("landing.section.features.description.people_around")
              },
              {
                title: t("landing.section.features.title.redirect_link"),
                iconWrapperStyle: { padding: "10px 0" },
                icon: RedirectLink,
                description: t("landing.section.features.description.redirect_link")
              }
            ].map((item, index) => (
              <div className={styles.item} key={index}>
                <div className={styles.icon} style={item.iconWrapperStyle || {}}>
                  <img src={item.icon} alt='feature' />
                </div>
                <p className={styles.item_title}>{item.title}</p>
                <p className={styles.desc}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.container}>
            <div className={styles.logo}>
              <img src={Logo} alt='logo' />
            </div>
            <div className={styles.about}>
              <p>{t("landing.footer.about")}</p>
              <h4>{t("landing.footer.vision_title")}</h4>
              <p>{t("landing.footer.vision")}</p>
            </div>
            <div className={styles.rubber}>
              <img src={Rubber} alt='rubber' />
            </div>
            <div className={styles.copyright}>
              <div className={styles.left}>
                <p>{t("landing.footer.copyright")}</p>
                <a href='#'>{t("landing.footer.links.privacy")}</a>
                <a href='#'>{t("landing.footer.links.terms")}</a>
                <a href='#'>{t("landing.footer.links.faq")}</a>
              </div>
              <div className={styles.right}>
                <a href='#'>
                  <FontAwesomeIcon icon={["fas", "envelope"]} />
                  info@fursatak.app
                </a>
                <a href='#'>
                  <FontAwesomeIcon icon={["fas", "phone-alt"]} />
                  0503117234‬
                </a>

                <div className={styles.social}>
                  <a href='#'>
                    <FontAwesomeIcon icon={["fab", "whatsapp"]} />
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={["fab", "tiktok"]} />
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={["fab", "linkedin"]} />
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={["fab", "snapchat-ghost"]} />
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={["fab", "twitter"]} />
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={["fab", "instagram"]} />
                  </a>
                  <a href='#'>
                    <FontAwesomeIcon icon={["fab", "telegram-plane"]} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  lang: store.locale.lang
});

const mapDispatchToProps = dispatch => ({
  languageActions: bindActionCreators({ setLocale }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(Landing));

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";

// Styles
import styles from "../styles/step.module.scss";
import inputStyles from "~components/forms/input/styles/input.module.scss";

// Components
import WizardNavigation from "~components/wizard/WizardNavigation";
import Input from "~components/forms/input/Input";
import Select from "~components/forms/input/Select";
import AddAddressModal from "../AddAddressModal";

class Step3 extends Component {
  showAddAddressModal = () => {
    const { modalActions } = this.props;
    modalActions.show("addAddressCompany");
  };

  render() {
    return (
      <div>
        <div className={styles.wizard_wrapper}>
          <div className={styles.membership}>
            {["Free", "Plus", "Pro"].map((item) => (
              <div className={styles.membership_type}>
                {/* <input type="radio" name="membership" />1 */}
                <div className={styles.content}>
                  <p className={styles.title}>{item}</p>
                  <p className={styles.price}>$ 50</p>
                  <div className={styles.list}>
                    {[0, 0, 0, "test 1"].map((item, index) => (
                      <p className={styles.list_item}>
                        <i class="fa fa-dot-circle-o" aria-hidden="true"></i>
                        <span>
                          Options {item} {index}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <WizardNavigation options={this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  // propName: prop
});

const mapDispatchToProps = (dispatch) => ({
  modalActions: bindActionCreators({ show }, dispatch), //TODO: move to separate func
});

export default connect(mapStateToProps, mapDispatchToProps)(Step3);

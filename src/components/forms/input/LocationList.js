import React, { Component } from 'react';
import { Radio as RadioAd, Checkbox } from 'antd';
import classnames from 'classnames';
import styles from './styles/input.module.scss';
import { withNamespaces } from 'react-i18next';

const CheckboxGroup = Checkbox.Group;

class LocationList extends Component {
  state = {
    checkAll: false,
  };

  onCheckAllChange = (e) => {
    const { checkAll } = this.state;
    const { options = [], onCheckAll } = this.props;
    let data = [];
    if (!checkAll) {
      data = [...options];
      this.setState({
        checkAll: true,
      });
    } else {
      this.setState({ checkAll: false });
    }
    console.warn(data);
    if (onCheckAll) onCheckAll(data);
  };

  onChange = (checkedList) => {
    const { options = [], onChange } = this.props;
    let data = [];

    console.warn(checkedList);

    options.forEach((element) => {
      if (checkedList.indexOf(element.label) !== -1) {
        data.push(element);
      }
    });

    if (onChange) onChange(data);
  };

  render() {
    const { checkAll } = this.state;
    const {
      onChange,
      value,
      options = [], // {id: Number, label: String}
      addAddress,
      afterLabel,
      t,
    } = this.props;
    return (
      <div
        className={classnames(
          styles.jobadd_input_wrapper,
          styles.location_list_wrapper
        )}
      >
        <p className={styles.label}>
          {t('input.add_job.location')}
          <span className={styles.add_location} onClick={addAddress}>
            {t('button.new_location')}
          </span>
        </p>
        <div className={styles.location_list}>
          <div className={styles.select_all} onClick={this.onCheckAllChange}>
            {!!options.length && (
              <span>
                {checkAll ? t('button.unselect_all') : t('button.select_all')}
              </span>
            )}
          </div>
          <CheckboxGroup
            options={options.map((item) => item.label)}
            value={value}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default withNamespaces()(LocationList);

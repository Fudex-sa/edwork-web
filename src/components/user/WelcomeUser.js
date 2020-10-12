import React, { PureComponent } from 'react';
import moment from 'moment';
import styles from './styles/welocmeUser.module.scss';
import { withNamespaces } from 'react-i18next';

// Assets
import SunIcon from '../../assets/imgs/sun.svg';
import CoffeeIcon from '../../assets/imgs/cafe.svg';
import MoonIcon from '../../assets/imgs/moon.svg';

const getGreating = (t) => {
  let greating = null;
  let greatingIcon = null;
  const m = moment();

  if (!m || !m.isValid()) {
    return;
  } //if we can't find a valid or filled moment, we return.

  var split_afternoon = 12; //24hr time to split the afternoon
  var split_evening = 17; //24hr time to split the evening
  var currentHour = parseFloat(m.format('HH'));

  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    greating = t('dashboard.good_afternoon');
    greatingIcon = CoffeeIcon;
  } else if (currentHour >= split_evening) {
    greating = t('dashboard.good_evening');
    greatingIcon = MoonIcon;
  } else {
    greating = t('dashboard.good_morning');
    greatingIcon = SunIcon;
  }

  return { greating, icon: greatingIcon };
};

class WelcomeUser extends PureComponent {
  render() {
    const { user = {}, t } = this.props;
    const { greating, icon } = getGreating(t);
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <img src={icon} alt="day status icon" />
        </div>
        <span>
          {greating}, {user.first_name}
        </span>
      </div>
    );
  }
}

export default withNamespaces()(WelcomeUser);

import React, { PureComponent } from 'react';
import styles from './styles/categories.module.scss';
import classnames from 'classnames';
import { withRouter } from 'react-router';
import LoadingWrapper from '../common/LoadingWrapper';
import { withNamespaces } from 'react-i18next';

const queryString = require('query-string');

class Categories extends PureComponent {
  state = {
    showInput: false,
    categoryName: '',
    newCategories: [],
  };

  handleShowInput = () => {
    this.setState({
      showInput: true,
    });
  };

  handleChangeCategoryName = (e) => {
    this.setState({
      categoryName: e.target.value,
    });
  };

  createNewCategorie = (e) => {
    e.preventDefault();
    const { newCategories = [], categoryName } = this.state;
    const cpCatergories = newCategories.slice();

    cpCatergories.push(categoryName);

    this.setState({
      newCategories: cpCatergories,
      categoryName: '',
      showInput: false,
    });
  };

  render() {
    const { showInput, newCategories, categoryName } = this.state;
    const { history, isLoading, data, t } = this.props;
    const searchParams = queryString.parse(window.location.search) || {};

    let isQualifedAction;
    if (searchParams.qualified !== undefined) {
      try {
        isQualifedAction = JSON.parse(searchParams.qualified);
      } catch (error) {
        isQualifedAction = true;
      }
    }

    return (
      <div className={styles.categories}>
        <div className={styles.wrapper}>
          <p className={styles.section_title}>
            {t('job.detail.category.all_candidates')}
          </p>
          <div
            className={classnames(styles.item, {
              [styles.active]: searchParams.qualified === undefined,
            })}
            onClick={() => {
              delete searchParams.qualified;
              delete searchParams.category;
              const stringifySearchUrl = queryString.stringify(searchParams);
              history.push(`${window.location.pathname}?${stringifySearchUrl}`);
            }}
          >
            {t('job.detail.category.non_filtered')}
          </div>
          <div
            className={classnames(styles.item, {
              [styles.active]: isQualifedAction,
            })}
            onClick={() => {
              searchParams.qualified = true;
              const stringifySearchUrl = queryString.stringify(searchParams);
              history.push(`${window.location.pathname}?${stringifySearchUrl}`);
            }}
          >
            {t('job.detail.category.qualifield')}
          </div>
          <div
            className={classnames(styles.item, {
              [styles.active]:
                !isQualifedAction && searchParams.qualified !== undefined,
            })}
            onClick={() => {
              searchParams.qualified = false;
              const stringifySearchUrl = queryString.stringify(searchParams);
              history.push(`${window.location.pathname}?${stringifySearchUrl}`);
            }}
          >
            {t('job.detail.category.not_qualified')}
          </div>

          <p className={styles.section_title}>
            {t('job.detail.category.your_list')}
          </p>
          {['Good', 'Maybe', 'Rejected'].map((item, index) => (
            <div
              key={index}
              className={classnames(styles.item, {
                [styles.active]: searchParams.category === item,
                [styles.green]: item === 'Good',
                [styles.yellow]: item === 'Maybe',
                [styles.red]: item === 'Rejected',
              })}
              onClick={() => {
                searchParams.category = item;
                const stringifySearchUrl = queryString.stringify(searchParams);
                history.push(
                  `${window.location.pathname}?${stringifySearchUrl}`
                );
              }}
            >
              {item}
            </div>
          ))}
          {/* <div
            className={classnames(styles.item, styles.active)}
            onClick={() => {
              searchParams.category = 'good';
              const stringifySearchUrl = queryString.stringify(searchParams);
              history.push(`${window.location.pathname}?${stringifySearchUrl}`);
            }}
          >
            Good
          </div>
          <div className={styles.item}>Maybe</div>
          <div className={styles.item}>Rejected</div> */}

          <LoadingWrapper isLoading={isLoading}>
            {data.map((item) => (
              <div
                key={item.id}
                className={classnames(styles.item, {
                  [styles.active]: searchParams.category === item.name,
                })}
                onClick={() => {
                  searchParams.category = item.name;
                  const stringifySearchUrl = queryString.stringify(
                    searchParams
                  );
                  history.push(
                    `${window.location.pathname}?${stringifySearchUrl}`
                  );
                }}
              >
                {item.name}
              </div>
            ))}
          </LoadingWrapper>

          <div className={styles.add_item} onClick={this.props.onAddCategory}>
            <span>+ {t('job.detail.category.add_new_list')}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withNamespaces()(Categories));

import React, { Component } from 'react';
import styles from './styles/basic-filter.module.scss';
import { Select } from '../forms';
import { DeleteOutlined } from '@ant-design/icons';
import { withNamespaces } from 'react-i18next';

const filterOptions = [
  'Age',
  'Gender',
  'Nationality',
  'Level of education',
  'University',
  'Show students only',
];

const OptionsType = (props) => {
  const {
    type,
    index,
    onChange,
    universityList,
    nationalityList,
    degreeList,
    t,
    i18n,
  } = props;
  // Age
  if (type === filterOptions[0]) {
    const ages = '0'
      .repeat(60)
      .split('')
      .map((item, index) => index + 18 + '');
    return (
      <>
        <div className={styles.cell}>
          <span>btween</span>
        </div>
        <div className={styles.cell}>
          <Select
            options={ages}
            placeholder={t('input.add_job.basic_filter.placeholder')}
            onChange={(value) => {
              onChange(index, { btweenFrom: value });
            }}
          />
        </div>
        <div className={styles.cell}>
          <span>and</span>
        </div>
        <div className={styles.cell}>
          <Select
            options={ages}
            placeholder={t('input.add_job.basic_filter.placeholder')}
            onChange={(value) => {
              onChange(index, { btweenTo: value });
            }}
          />
        </div>
      </>
    );
  }

  // Gender
  if (type === filterOptions[1]) {
    return (
      <>
        <div className={styles.cell}>
          <span>is</span>
        </div>
        <div className={styles.cell}>
          <Select
            options={['male', 'female']}
            placeholder={t('input.add_job.basic_filter.placeholder')}
            onChange={(value) => {
              onChange(index, { gender: value });
            }}
          />
        </div>
      </>
    );
  }

  // Nationality
  if (type === filterOptions[2]) {
    const options = nationalityList.map((item) => ({
      value: item.id,
      name: item.name[i18n.language],
    }));
    return (
      <>
        <div className={styles.cell}>
          <span>{t('job.add_job.filter.nationality.is_any_of')}</span>
        </div>
        <div className={styles.cell}>
          <Select
            multiple
            options={options}
            placeholder={t('input.add_job.basic_filter.placeholder')}
            onChange={(value) => {
              onChange(index, { nationality: value });
            }}
          />
        </div>
      </>
    );
  }
  // Level of education
  if (type === filterOptions[3]) {
    const options = degreeList.map((item) => ({
      value: item.id,
      name: item.name[i18n.language],
    }));
    return (
      <>
        <div className={styles.cell}>
          <span>{t('job.add_job.filter.lvl_education.is_min')}</span>
        </div>
        <div className={styles.cell}>
          <Select
            options={options}
            placeholder={t('input.add_job.basic_filter.placeholder')}
            onChange={(value) => {
              onChange(index, { educationLevel: value });
            }}
          />
        </div>
      </>
    );
  }

  // University
  if (type === filterOptions[4]) {
    const options = universityList.map((item) => ({
      value: item.id,
      name: item.name[i18n.language],
    }));
    return (
      <>
        <div className={styles.cell}>
          <span>{t('job.add_job.filter.nationality.is_any_of')}</span>
        </div>
        <div className={styles.cell}>
          <Select
            multiple
            options={options}
            placeholder={t('input.add_job.basic_filter.placeholder')}
            onChange={(value) => {
              onChange(index, { university: value });
            }}
          />
        </div>
      </>
    );
  }
  // Show students only
  if (type === filterOptions[5]) {
    return (
      <>
        <div className={styles.cell}>
          <span>{t('job.add_job.filter.students.value')}</span>
        </div>
      </>
    );
  }

  return null;
};

class BasicFilter extends Component {
  state = {
    filterItems: [],
    filterType: [...filterOptions],
  };

  filterSelectedType = (filterItems) => {
    const filter = filterOptions.slice();

    filterItems.forEach((item) => {
      const findIndex = filter.indexOf(item.filterType);
      if (findIndex !== -1) {
        filter.splice(findIndex, 1);
      }
    });

    this.setState({ filterType: filter });
  };

  handleChange = (index, data) => {
    const { filterItems } = this.state;
    const { onChange, type } = this.props;

    const stateData = filterItems.slice();
    stateData[index] = { ...stateData[index], ...data };

    this.setState({ filterItems: stateData }, () => {
      onChange(type, index, stateData[index]);
      this.filterSelectedType(stateData);
    });
  };

  handleAddFilter = () => {
    const { addFilter, type } = this.props;
    addFilter(type);
  };

  handleRemove = (index) => {
    const { remove, type } = this.props;
    remove(type, index, (response) => {
      this.filterSelectedType(response[type]);
    });
  };

  componentDidMount() {
    const { items = [] } = this.props;

    this.setState({ filterItems: [...items] });
  }

  render() {
    const { filterType, filterItems } = this.state;
    const {
      items = [],
      universityList = [],
      nationalityList = [],
      degreeList = [],
      t,
      i18n,
    } = this.props;
    return (
      <div className={styles.basic_filter}>
        {items.map((item, index) => (
          <div key={index} className={styles.filter}>
            <div className={styles.cell}>
              <Select
                options={filterType}
                value={item.filterType}
                placeholder={t('input.add_job.basic_filter.placeholder')}
                onChange={(value) => {
                  this.handleChange(index, { filterType: value });
                }}
              />
            </div>

            <OptionsType
              index={index}
              universityList={universityList}
              nationalityList={nationalityList}
              degreeList={degreeList}
              type={item.filterType}
              onChange={this.handleChange}
              t={t}
              i18n={i18n}
            />

            <div
              className={styles.remove}
              role="button"
              onClick={() => this.handleRemove(index)}
            >
              <DeleteOutlined />
            </div>
          </div>
        ))}
        <button
          className={styles.add_filter}
          type="button"
          onClick={this.handleAddFilter}
        >
          + {t('button.add_more')}
        </button>
      </div>
    );
  }
}

export default withNamespaces()(BasicFilter);

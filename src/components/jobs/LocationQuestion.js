import React, { Component } from 'react';
import styles from './styles/question.module.scss';
import classnames from 'classnames';
import { DeleteOutlined } from '@ant-design/icons';
import { withNamespaces } from 'react-i18next';

import LocationTypeIcon from '~assets/imgs/location-type.svg';
import { Select } from '../forms';

class LocationQuestion extends Component {
  state = {
    locations: [],
  };

  handleChange = (index, data) => {
    const { locations } = this.state;
    const { onChange, type } = this.props;

    const stateData = locations.slice();
    stateData[index] = { ...stateData[index], ...data };

    this.setState({ locations: stateData }, () => {
      onChange(type, index, stateData[index]);
      // this.filterSelectedType(stateData);
    });
  };

  handleAddLocation = () => {
    const { addLocation, type } = this.props;
    addLocation(type);
  };

  componentDidMount() {
    const { items = [] } = this.props;

    this.setState({ locations: [...items] });
  }

  render() {
    const { type, items, governorateList, t, i18n } = this.props;
    const options = governorateList.map((item) => ({
      value: item.id,
      name: item.name[i18n.language],
    }));
    return (
      <div className={styles.question_container}>
        <div className={styles.heading}>
          <span className={styles.type_icon} style={{ textAlign: 'center' }}>
            <img
              src={LocationTypeIcon}
              alt="type icon"
              style={{ height: '100%' }}
            />
          </span>
          <div className={styles.paragraphs}>
            <p className={styles.title}>
              {t('job.add_job.people_nearby.title')}
            </p>
            <p className={styles.sub_title}>
              {t('job.add_job.people_nearby.sub_title')}
            </p>
          </div>
        </div>

        <div className={classnames(styles.questions, styles.content)}>
          <div className={styles.question_item}>
            {items.map((item, index) => (
              <div key={index} className={styles.location_item}>
                <div className={styles.select_location_wrapper}>
                  <Select
                    options={options}
                    placeholder={t('job.add_job.people_nearby.placeholder')}
                    onChange={(value) => {
                      this.handleChange(index, { location: value });
                    }}
                  />
                </div>
                <div className={styles.location_options}>
                  <span>{t('job.add_job.people_nearby.plus')}</span>
                  <input
                    type="number"
                    min={0}
                    onChange={({ target }) => {
                      this.handleChange(index, { coverage: target.value });
                    }}
                  />
                  <span>{t('job.add_job.people_nearby.km_around')}</span>
                </div>
              </div>
            ))}
            <button
              className={styles.add_options}
              type="button"
              onClick={() => this.handleAddLocation(type)}
            >
              + {t('button.add_other_options')}
            </button>
          </div>
        </div>

        {/* <div className={styles.questions}>
          {items.map((q, index) => (
            <div className={styles.question_item}>
              <div
                className={styles.remove_section}
                onClick={() => remove(index)}
              >
                <DeleteOutlined />
              </div>
              <div className={styles.head}>
                <input
                  type="text"
                  placeholder="Type the question here ….."
                  value={question}
                  onChange={this.handleChangeQuestion}
                />
              </div>
            </div>
          ))}
          <button
            className={styles.add_question}
            type="button"
            onClick={this.handleAddOption}
          >
            + Add more
          </button>
        </div> */}
      </div>
    );
  }
}

export default withNamespaces()(LocationQuestion);

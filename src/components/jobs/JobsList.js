import React, { PureComponent } from 'react';
import { Tooltip } from 'antd';
import {
  ArrowsAltOutlined,
  RedoOutlined,
  FormOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import moment from 'moment';

import styles from './styles/job-list.module.scss';

const Actions = (props) => {
  const { items = [] } = props;
  return (
    <div className={styles.cell_actions}>
      {items.map((item, index) => (
        <div
          key={index}
          className={classnames(styles.action, {
            [styles.red]: item.type === 'red',
            [styles.orange]: item.type === 'orange',
            [styles.blue]: item.type === 'blue',
            [styles.black]: item.type === 'black',
            [styles.disable]: item.type === 'disable',
          })}
          onClick={item.action}
        >
          <item.Icon />
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default class JobsList extends PureComponent {
  render() {
    const { headTitles, data, actions } = this.props;
    return (
      <div className={styles.job_list}>
        {headTitles && (
          <div className={classnames(styles.row, styles.row_head)}>
            {headTitles.map((item, index) => (
              <div
                key={index}
                className={classnames(styles.cell, {
                  [styles.cell_size_2]: index === 0 || index === 4,
                  [styles.text_center]: index !== 0,
                })}
              >
                {item}
              </div>
            ))}
          </div>
        )}
        {data.map((job, index) => (
          <div key={job.id} className={classnames(styles.row)}>
            {[
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  actions.goToJobDetail(job.id);
                }}
              >
                {job.title}
              </span>,
              moment(job.created_at).format('DD/MM/YYYY'),
              0,
              0,
              <Actions
                items={[
                  {
                    type: 'blue',
                    title: 'Open',
                    Icon: ArrowsAltOutlined,
                    action: () => {
                      actions.goToJobDetail(job.id);
                    },
                  },
                  {
                    type: 'orange',
                    title: 'Re-post',
                    Icon: RedoOutlined,
                    action: () => {},
                  },
                  // {
                  //   title: 'Edit',
                  //   Icon: FormOutlined,
                  //   action: () => {},
                  // },
                  {
                    type: 'red',
                    title: 'Delete',
                    Icon: DeleteOutlined,
                    action: () => {},
                  },
                ]}
              />,
              0,
            ].map((item, index) => (
              <div
                key={index}
                className={classnames(styles.cell, {
                  [styles.cell_size_2]: index === 0 || index === 4,
                  [styles.text_overflow]: index === 0,
                  [styles.text_center]: index !== 0,
                })}
              >
                {/* {index === 0 && (
                  
                )} */}
                {item}
              </div>
            ))}
          </div>
        ))}
        {/* <div className={styles.pagination}>
              <div>
                <button>
                  <StepBackwardOutlined />
                </button>
                <button>
                  <CaretLeftOutlined />
                </button>
                <span>1 / 2</span>
                <button>
                  <CaretRightOutlined />
                </button>
                <button>
                  <StepForwardOutlined />
                </button>
              </div>
            </div> */}
      </div>
    );
  }
}

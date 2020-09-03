import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Result } from 'antd';
import queryString from 'query-string';
import { withNamespaces } from 'react-i18next';

// Components
import { Button } from '~components/forms';
import HeaderDark from '~components/common/HeaderDark';

// Actions
import activateUser from './actions/activateUser';
import LoadingWrapper from '~components/common/LoadingWrapper';

class ActivateUser extends Component {
  state = {
    success: 0,
    fail: 0,
    message: '',
  };

  goHome = () => {
    const { history } = this.props;
    history.replace('/dashboard');
  };

  componentDidMount() {
    this.activate();
  }

  activate = () => {
    const { userActions } = this.props;
    const { search } = window.location;
    const query = queryString.parse(search);
    const data = {
      email: query.user_email,
      activation_code: query.activation_code,
    };

    userActions.activateUser(data, {
      success: (response) => {
        const { message } = response;
        this.setState({
          success: 1,
          message,
        });
      },
      fail: (response) => {
        const { message } = response;
        this.setState({
          fail: 1,
          message,
        });
      },
    });
  };

  render() {
    const { success, fail, message } = this.state;
    const { activateUserLoading, t } = this.props;

    const { search } = window.location;
    const query = queryString.parse(search);

    if (!query.activation_code && !query.user_email) {
      return (
        <Result
          title="Your operation has not been executed"
          extra={
            <Button
              text={t('button.goto_main')}
              size="large"
              onClick={() => this.goHome()}
            />
          }
        />
      );
    }

    return (
      <div>
        <HeaderDark />
        <LoadingWrapper isLoading={activateUserLoading}>
          {success && (
            <Result
              status="success"
              title="Successfully user activated!"
              extra={[
                <Button
                  text={t('button.goto_main')}
                  onClick={() => this.goHome()}
                />,
              ]}
            />
          )}

          {fail && (
            <Result
              status="warning"
              title="There are some problems with your operation."
              subTitle={message}
              extra={
                <Button
                  text={t('button.resend')}
                  onClick={() => this.activate}
                />
              }
            />
          )}
        </LoadingWrapper>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  activateUserLoading: store.user.activateUserLoading,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators({ activateUser }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(ActivateUser));

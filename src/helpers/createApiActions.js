function createApiActions({
  url,
  type,
  requestOption,
  payloadOptions,
  fail,
  success,
}) {
  const successFunc = (response, dispatch, token) => {
    if (success) success(response, dispatch);
    const data = {
      payload: response.data,
    };
    if (token) data.token = token;
    dispatch({
      type: `${type}_SUCCESS`,
      ...data,
    });
  };

  const failFunc = (response, dispatch) => {
    if (fail) {
      fail(response, dispatch);
    }
    dispatch({
      type: `${type}_FAIL`,
    });
  };

  const request = (data = {}, token) => {
    let headers = {};
    if (token) {
      headers = {
        Authorization: token,
      };
    }
    return {
      type,
      payload: {
        options: {
          returnRejectedPromiseOnError: true,
          successSuffix: '_START',
          ...payloadOptions,
        },
        request: {
          method: 'post',
          url,
          data,
          headers,
          ...requestOption,
        },
      },
    };
  };

  const exportRequest = (data, useToken, saveTokenRedux) => (
    dispatch,
    getState
  ) => {
    const storage = getState();
    let token = null;
    if (useToken) {
      if (typeof useToken === 'boolean') token = storage.auth.token;
      if (typeof useToken === 'string') token = useToken;
    }
    // console.warn(data, useToken, storage);
    // const { lang } = storage.locale;
    dispatch(request(data, token))
      .then((response) => {
        const { payload } = response;
        const { data } = payload;
        if (data.code === 200) {
          if (saveTokenRedux) successFunc(data, dispatch, token);
          else successFunc(data, dispatch);
        } else {
          failFunc(data, dispatch);
        }
      })
      .catch((error) => {
        failFunc(data, dispatch);
        console.error(error);
      });
  };

  return exportRequest;
}

export default createApiActions;

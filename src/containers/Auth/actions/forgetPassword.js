import createApiActions from "~helpers/createApiActions";
import { FORGET_PASSWORD } from "./constants";

const forgetPassword = (data, options = {}) =>
  createApiActions({
    type: FORGET_PASSWORD,
    url: "/company/admin/forgot",
    requestOption: {
      method: "post",
    },
    success: options.success,
    fail: options.fail,
  })(data);

export default forgetPassword;

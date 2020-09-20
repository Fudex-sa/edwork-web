import createApiActions from "~helpers/createApiActions";
import { UPDATE_PASSWORD } from "./constants";

const updatePassword = (data, options = {}) =>
  createApiActions({
    type: UPDATE_PASSWORD,
    url: "/company/admin/update_forgot_password",
    requestOption: {
      method: "post",
    },
    success: options.success,
    fail: options.fail,
  })(data);

export default updatePassword;

import createApiActions from "~helpers/createApiActions";
import { ACTIVATE_USER } from "./constants";

const activateUser = (data, options = {}) =>
  createApiActions({
    type: ACTIVATE_USER,
    url: "/company/admin/activate",
    requestOption: {
      method: "post",
    },
    success: options.success,
    fail: options.fail,
  })(data);

export default activateUser;

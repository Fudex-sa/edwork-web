import createApiActions from "~helpers/createApiActions";
import { BLOCK_USER } from "./constants";

const blockUser = (data, options = {}) =>
  createApiActions({
    type: BLOCK_USER,
    url: "/company/admin/block",
    requestOption: {
      method: "post",
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default blockUser;

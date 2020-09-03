import createApiActions from "~helpers/createApiActions";
import { UNBLOCK_USER } from "./constants";

const unblockUser = (data, options = {}) =>
  createApiActions({
    type: UNBLOCK_USER,
    url: "/company/admin/unblock",
    requestOption: {
      method: "post",
    },
    success: options.success,
    fail: options.fail,
  })(data, true);

export default unblockUser;

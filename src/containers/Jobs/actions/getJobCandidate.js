import createApiActions from "~helpers/createApiActions";
import { GET_JOB_CANDIDATE } from "./constants";

const getJobCandidate = (data, options = {}) =>
  createApiActions({
    type: GET_JOB_CANDIDATE,
    url: "/post/detail/users",
    requestOption: {
      method: "post"
    },
    success: options.success,
    fail: options.fail
  })(data, true);

export default getJobCandidate;

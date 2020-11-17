import createApiActions from "~helpers/createApiActions";
import { GET_SPONSERD } from "./constants";

const getSponserdCompany = (id, options = {}) =>
  createApiActions({
    type: GET_SPONSERD,
    url: `/company/admin/sponserd/`,
    requestOption: {
      method: "get",
    },
    success: options.success,
    fail: options.fail,
  })(null, true);

export default getSponserdCompany;

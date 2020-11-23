import createApiActions from "~helpers/createApiActions";
import { CREATE_COMPANY } from "./constants";

import { saveSession, clearSession, extractSession } from "~helpers/session";
const createCompany = (data, options = {}) =>
  createApiActions({
    type: CREATE_COMPANY,
    url: "/company/register",
    requestOption: {
      method: "post",
    },
    success: async (response) => {
      const storage = await extractSession();
      storage.auth = response.data;
      await saveSession(storage);

      if (options.success) options.success(response);
    },
    fail: (response) => {
      clearSession();
      if (options.fail) options.fail(response);
    },
  })(data);

export default createCompany;

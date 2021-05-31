import axios from "axios";
import qs from "qs";

export default class Yoomoney {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  sendAuthenticatedRequest = async ({
    method = "POST",
    url,
    data = {},
    params = {}
  }) => {
    try {
      let { data: response } = await axios({
        method,
        url: `https://yoomoney.ru${url}`,
        headers: {
          Authorization: "Bearer " + this.accessToken
        },
        data: qs.stringify(data),
        params
      });

      return response;
    } catch (error) {
      if (error.response) {
        return {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        };
      } else if (error.request) {
        return error.request;
      }

      return error.message;
    }
  };

  accountInfo = async () => {
    return await this.sendAuthenticatedRequest({
      url: "/api/account-info"
    });
  };

  operationInfo = async data => {
    return await this.sendAuthenticatedRequest({
      url: "/api/operation-history",
      data
    });
  };

  operationDetails = async operation_id => {
    return await this.sendAuthenticatedRequest({
      url: "/api/operation-details",
      data: { operation_id }
    });
  };

  requestPayment = async data => {
    return await this.sendAuthenticatedRequest({
      url: "/api/request-payment",
      data
    });
  };

  processPayment = async data => {
    return await this.sendAuthenticatedRequest({
      url: "/api/process-payment",
      data
    });
  };
}

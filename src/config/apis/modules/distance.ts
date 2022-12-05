import axios from 'axios';
import apiUtils from './utils/index';

export default {
  async index(params: { origins: string; destination: string; type?: string }) {
    try {
      const result = await axios.request({
        url: `${apiUtils.mapBaseUrl}/v3/distance`,
        method: 'get',
        params: {
          key: apiUtils.mapKey,
          ...params,
        },
      });
      return result.data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
};

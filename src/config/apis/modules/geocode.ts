import axios from 'axios';
import apiUtils from './utils/index';

export default {
  async geo(params: { address: string; city?: string }) {
    try {
      const result = await axios.request({
        url: `${apiUtils.mapBaseUrl}/v3/geocode/geo`,
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

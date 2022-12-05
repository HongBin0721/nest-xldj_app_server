import axios from 'axios';
import apiUtils from './utils/index';

export default {
  async walking(params: { origin: string; destination: string }) {
    try {
      const result = await axios.request({
        url: `${apiUtils.mapBaseUrl}/v3/direction/walking`,
        method: 'get',
        params: {
          key: apiUtils.mapKey,
          ...params,
        },
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};

import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://qa.api.sweepapi.com';

const StreamService = {
  createModbusDirectory: (data, headers) => axios.post(`${API_URL}/directory`, data, { headers }),

  getModbusDirectoryId: async (headers) => {
    const { data } = await axios.get(`${API_URL}/directory/home`, { headers });
    const { directory } = data;
    const modbusDirectory = directory.find((dir) => dir.name === 'Modbus Devices');
    if (modbusDirectory) {
      return modbusDirectory.id;
    }
    // Return newly created modbus directory id
    const response = await axios.post(`${API_URL}/directory/home`, { name: 'Modbus Devices' }, { headers });
    return response.data.id;
  },

  getModbusDirectory: async (modbusDirectoryId: string, headers) => {
    const { data } = await axios.get(`${API_URL}/directory/${modbusDirectoryId}`, { headers });
    return data;
  },

  // eslint-disable-next-line arrow-body-style
  createModbusStream: (data, headers): Promise<AxiosResponse<any>> => {
    return axios.post(`${API_URL}/stream`, data, { headers });
  },
};

export default StreamService;

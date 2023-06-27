import axios from 'axios';
import queryString from 'query-string';
import { AtmInterface, AtmGetQueryInterface } from 'interfaces/atm';
import { GetQueryInterface } from '../../interfaces';

export const getAtms = async (query?: AtmGetQueryInterface) => {
  const response = await axios.get(`/api/atms${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAtm = async (atm: AtmInterface) => {
  const response = await axios.post('/api/atms', atm);
  return response.data;
};

export const updateAtmById = async (id: string, atm: AtmInterface) => {
  const response = await axios.put(`/api/atms/${id}`, atm);
  return response.data;
};

export const getAtmById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/atms/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAtmById = async (id: string) => {
  const response = await axios.delete(`/api/atms/${id}`);
  return response.data;
};

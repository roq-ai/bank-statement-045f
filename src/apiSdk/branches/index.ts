import axios from 'axios';
import queryString from 'query-string';
import { BranchInterface, BranchGetQueryInterface } from 'interfaces/branch';
import { GetQueryInterface } from '../../interfaces';

export const getBranches = async (query?: BranchGetQueryInterface) => {
  const response = await axios.get(`/api/branches${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBranch = async (branch: BranchInterface) => {
  const response = await axios.post('/api/branches', branch);
  return response.data;
};

export const updateBranchById = async (id: string, branch: BranchInterface) => {
  const response = await axios.put(`/api/branches/${id}`, branch);
  return response.data;
};

export const getBranchById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/branches/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBranchById = async (id: string) => {
  const response = await axios.delete(`/api/branches/${id}`);
  return response.data;
};

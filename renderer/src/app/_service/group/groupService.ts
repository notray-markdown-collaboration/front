import axiosInstance from "../core/apiClient";
import type { Group } from "./group.dto";

export const getGroups = (): Promise<Group[]> => {
  return axiosInstance.get('/group');
};
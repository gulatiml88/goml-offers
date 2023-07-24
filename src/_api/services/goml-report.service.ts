import { axiosRequest } from '../config';

export const GoMLReportService = {
  submitQuestions: (questionDTO: any) => {
    return axiosRequest('submitquestions', 'POST', questionDTO);
  },

  addOrganization: (organization: string) => {
    const inputDTO = { org_name: organization };
    return axiosRequest('addcompany', 'POST', inputDTO);
  },

  addUser: (inputDTO: any) => {
    return axiosRequest('adduser', 'POST', inputDTO);
  },

  sendReport: (inputDTO: any) => {
    return axiosRequest('getreport', 'POST', inputDTO);
  }
};

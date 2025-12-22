// Simple mock client for now
export const apiClient = {
  get: async (url: string) => {
    console.log(`GET ${url}`);
    return {};
  },
  post: async (url: string, data: any) => {
    console.log(`POST ${url}`, data);
    return {};
  }
};

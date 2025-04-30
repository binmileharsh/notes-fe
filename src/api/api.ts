const baseUrl = "http://localhost:3000";

const API_URL = {
  USER: {
    CREATE: `${baseUrl}/task`,
    GET: `${baseUrl}/tasks/all`,
    DELETE: (id:number) => `${baseUrl}/task/${id}`,
  },
  TASK: {},
};
const METHOD = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
};
const headers = {
  "Content-Type": "application/json",
};

const api = {
  user: {
    get: async () => {
      try {
        const response = await fetch(API_URL.USER.GET, {
          method: METHOD.GET,
          headers,
        });

        if (!response.ok) {
          throw new Error(`error`);
        }

        const data = await response.json();
        return data ?? [];
      } catch (error) {
        console.error("Error fetching data:", error);

        return [];
      }
    },
    
  },
};
export default api;

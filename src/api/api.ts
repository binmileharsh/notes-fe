const baseUrl = "http://localhost:3000";

const API_URL = {
  USER: {
    CREATE: `${baseUrl}/task`,
    GET: `${baseUrl}/tasks/all`,
    DELETE: (id: number) => `${baseUrl}/task/${id}`,
    PUT: (id: number) => `${baseUrl}/task/${id}`,
  },
  TASK: {
    CREATE: `${baseUrl}/task/add`,
    GET: `${baseUrl}/tasks/all`,
    DELETE: (id: number) => `${baseUrl}/task/${id}`,
    PUT: (id: number) => `${baseUrl}/task/${id}`,
  },
};

const METHOD = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PUT: "PUT",
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
          throw new Error(`Error fetching user data`);
        }

        const data = await response.json();
        return data ?? [];
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },
  }}
//   task: {
//     // Get all tasks
//     getAll: async () => {
//       try {
//         const response = await fetch(API_URL.TASK.GET, {
//           method: METHOD.GET,
//           headers,
//         });

//         if (!response.ok) {
//           throw new Error(`Error fetching tasks`);
//         }

//         const data = await response.json();
//         return data ?? [];
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         return [];
//       }
//     },

//     create: async (task: any) => {
//       try {
//         const response = await fetch(API_URL.TASK.CREATE, {
//           method: METHOD.POST,
//           headers,
//           body: JSON.stringify(task),
//         });

//         if (!response.ok) {
//           throw new Error(`Error creating task`);
//         }

//         const data = await response.json();
//         return data;
//       } catch (error) {
//         console.error("Error creating task:", error);
//         return null;
//       }
//     },

//     update: async (id: number) => {
//       try {
//         const response = await fetch(API_URL.TASK.PUT(id), {
//           method: METHOD.PUT,
//           headers,
//           body: JSON.stringify(task),
//         });

//         if (!response.ok) {
//           throw new Error(`Error updating task`);
//         }

//         const data = await response.json();
//         return data;
//       } catch (error) {
//         console.error("Error updating task:", error);
//         return null;
//       }
//     },

//     // Delete a task
//     delete: async (id: number) => {
//       try {
//         const response = await fetch(API_URL.TASK.DELETE(id), {
//           method: METHOD.DELETE,
//           headers,
//         });

//         if (!response.ok) {
//           throw new Error(`Error deleting task`);
//         }

//         const data = await response.json();
//         return data;
//       } catch (error) {
//         console.error("Error deleting task:", error);
//         return null;
//       }
//     },
//   },
// };

export default api;

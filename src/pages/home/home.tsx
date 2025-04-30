import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to Task Management System
      </h1>
      <div className="space-x-4">
      <Link to="/task"> 
      <button   className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        
          Show Table
        </button></Link>
        <Link to="/task/create"><button
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Create User
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

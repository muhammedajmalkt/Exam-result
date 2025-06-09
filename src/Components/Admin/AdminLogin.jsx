import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = (  ) => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Valid email is required.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    // Mock authentication
    if (email === 'admin@example.com' && password === 'admin123') {
      setSuccess('Login successful!');
      setError('');
    //   setIsAuthenticated(true);
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } else {
      setError('Invalid email or password.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen  flex  flex-col lg:flex-row  lg:justify-center    lg:p-16 p-8 ">
      {/* Left Side - Image */}
      <div className="w-full lg:w-1/2 h-72 lg:h-auto relative  ">
        <img
          src="/admin.jpg"
          alt="Students"
          className="absolute inset-0 w-full h-full object-cover p-14  "
        />
      </div>

    <div className="w-full lg:w-1/2 flex items-center justify-center">
      <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md animate-in slide-in-from-right duration-500 h-fit ite  ">
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm">
            Access the school management dashboard
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-1 block w-full h-10 p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-sm"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            className="w-full h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-sm sm:text-base"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Back to{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </p>
      </div>
      </div>

    </div>
  );
};

export default AdminLogin;
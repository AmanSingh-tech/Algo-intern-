import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    codeforcesHandle: '',
    leetcodeHandle: '',
  });

  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#1f1f38] to-[#12122a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0f0f1c] text-white rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full bg-[#1a1a2e] px-4 py-2 rounded-md outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full bg-[#1a1a2e] px-4 py-2 rounded-md outline-none"
          />
          <input
            name="codeforcesHandle"
            type="text"
            placeholder="Codeforces Handle (for login)"
            onChange={handleChange}
            className="w-full bg-[#1a1a2e] px-4 py-2 rounded-md outline-none"
          />
          <input
            name="leetcodeHandle"
            type="text"
            placeholder="Leetcode Handle"
            onChange={handleChange}
            className="w-full bg-[#1a1a2e] px-4 py-2 rounded-md outline-none"
          />

          <button
            type="submit"
            className="w-full bg-[#00f5c9] text-black font-semibold py-2 rounded-full hover:bg-[#00e2b8] transition"
          >
            Login
          </button>

          {token && <p className="text-green-400 text-center">Login successful!</p>}
          {error && <p className="text-red-400 text-center">{error}</p>}
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="text-[#00f5c9] hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

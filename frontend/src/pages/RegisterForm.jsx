import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    codeforcesHandle: '',
    leetcodeHandle: '',
    role: 'User',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#1f1f38] to-[#12122a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0f0f1c] text-white rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full bg-[#1a1a2e] px-4 py-2 rounded-md outline-none"
          />
          <input
            name="codeforcesHandle"
            type="text"
            placeholder="Codeforces Handle"
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
          <select
            name="role"
            onChange={handleChange}
            value={formData.role}
            className="w-full bg-[#292948] text-white px-4 py-2 rounded-md outline-none"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
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

          <button
            type="submit"
            className="w-full bg-[#00f5c9] text-black font-semibold py-2 rounded-full hover:bg-[#00e2b8] transition"
          >
            Register
          </button>

          {message && <p className="text-green-400 text-center">{message}</p>}
          {error && <p className="text-red-400 text-center">{error}</p>}
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-[#00f5c9] hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

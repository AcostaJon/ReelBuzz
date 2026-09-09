// components/ForgotPasswordForm.js
'use client';
import { useState } from 'react';

export default function ForgotPasswordForm() {
  // state
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  // form handler - on submit
  const handleSubmit = async (e) => {
    // stop page reload
    e.preventDefault();
    // state "status" update
    setStatus({ loading: true, success: false, error: '' });
    // try
    try {
      // post request - user email
      const res = await fetch('api/db/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      // response data
      const data = await res.json();
      // if response invalid
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      // update state "status"
      setStatus({ loading: false, success: true, error: '' });
    } catch (err) {
      // catch error in state "status"
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  // if state "status" successful
  if (status.success) {
    return (
      <div className="text-white">
        If an account exists for <strong>{email}</strong>, we have sent password reset instructions to that email address.
      </div>
    );
  }

  return (
    // form
    <form onSubmit={handleSubmit} className=" mt-5 d-flex flex-column  align-items-center">
      <h2 className="fw-bold">Reset Your Password</h2>
      <p className="text-white">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      {/* display error */}
      {status.error && (
        <div className="p-3 text-danger ">
          {status.error}
        </div>
      )}
      <div>
        {/* label */}
        <label htmlFor="email" className="text-white me-2">
          Email Address:
        </label>
        {/* input */}
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="px-2 py-2"
        />
        {/* submit button */}
        <button
          type="submit"
          disabled={status.loading}
          className="bg-success py-2 border-0 rounded text-white"
        >
          {/* display loading status */}
          {status.loading ? 'Sending link...' : 'Send Reset Link'}
        </button>
      </div>
    </form>
  );
}
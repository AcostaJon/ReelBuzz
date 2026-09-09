// app/reset-password/page.js
'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  // search parameters
  const searchParams = useSearchParams();
  // router
  const router = useRouter();
  // token
  const token = searchParams.get('token');
  // state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: '' });

  // form handler - on submit
  const handleSubmit = async (e) => {
    // stop page reload
    e.preventDefault();
    // if passwords do not match
    if (password !== confirmPassword) {
      setStatus({ ...status, error: 'Passwords do not match.' });
      return;
    }
    // update state "status"
    setStatus({ loading: true, error: '' });
    // try
    try {
      // post request - token and password
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      // response data
      const data = await res.json();
      // if response invalid
      if (!res.ok) throw new Error(data.message || 'Failed to reset password');
      // send user to login page
      router.push('/login?reset=success');
    } catch (err) {
      // catch error in state "status"
      setStatus({ loading: false, error: err.message });
    }
  };
  
  // if token not available
  if (!token) {
    return <p className="text-danger text-center">Invalid or missing reset token.</p>;
  }

  return (
    // form
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="fw-bold">Set New Password</h2>
      {/* display error */}
      {status.error && (
        <div className="p-3 text-danger rounded">
          {status.error}
        </div>
      )}
      {/* new password */}
      <div>
        {/* label and input */}
        <label className="d-block text-white">New Password</label>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 d-block w-100 px-3 py-2 rounded"
        />
      </div>
      {/* confirm new password */}
      <div>
        <label className="d-block text-white">Confirm New Password</label>
        <input
          type="password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 d-block w-100 px-3 py-2 rounded"
        />
      </div>
      {/* submit button */}
      <button
        type="submit"
        disabled={status.loading}
        className="w-100 py-2 px-4 bg-primary text-white rounded "
      >
        {/* display loading status */}
        {status.loading ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  );
}
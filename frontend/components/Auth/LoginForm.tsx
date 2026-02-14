'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Common/Input';
import Button from '@/components/Common/Button';
import Alert from '@/components/Common/Alert';
import { useAuthStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter an email');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);

    try {
      // Mock authentication - accept any valid email
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      };

      const mockToken = 'mock_token_' + Math.random().toString(36).substr(2, 9);

      setToken(mockToken);
      setUser(mockUser);

      toast.success(`Welcome, ${mockUser.name}!`);
      
      // Small delay to ensure state is saved before redirect
      setTimeout(() => {
        router.push('/dashboard');
      }, 300);
    } catch (err: any) {
      const errorMsg = 'Login failed. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" title="Login Error" message={error} />}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-blue-700">
          <strong>Demo Mode:</strong> Enter any email to login (no password required)
        </p>
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Button type="submit" isLoading={isLoading} className="w-full">
        Sign In
      </Button>
    </form>
  );
}

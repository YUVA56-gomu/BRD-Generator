'use client';

import Link from 'next/link';
import LoginForm from '@/components/Auth/LoginForm';
import GoogleLoginButton from '@/components/Auth/GoogleLoginButton';
import Card from '@/components/Common/Card';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">BRD Gen</h1>
          <p className="text-secondary-600">Sign in to your account</p>
        </div>

        <Card className="p-8">
          <LoginForm />
          <GoogleLoginButton />

          <div className="mt-6 text-center">
            <p className="text-secondary-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary-600 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

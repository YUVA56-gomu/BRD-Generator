'use client';

import Link from 'next/link';
import SignupForm from '@/components/Auth/SignupForm';
import GoogleLoginButton from '@/components/Auth/GoogleLoginButton';
import Card from '@/components/Common/Card';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">BRD Gen</h1>
          <p className="text-secondary-600">Create your account</p>
        </div>

        <Card className="p-8">
          <SignupForm />
          <GoogleLoginButton />

          <div className="mt-6 text-center">
            <p className="text-secondary-600">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-600 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

'use client';
import { LoginForm } from '@/features/auth/components/login-form';

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-100 dark:bg-black">
      <main className="w-full max-w-md">
        <LoginForm />
      </main>
    </div>
  );
}

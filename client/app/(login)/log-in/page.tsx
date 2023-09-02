'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserLogin {
  email: string;
  password: string;
}

function LoginForm(): JSX.Element {
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: '',
    password: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState<string>('');

  const router = useRouter();

  // submit user credentials for validation from backend server
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3500/user/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogin),
      });

      if (response.status === 200) {
        // successful login
        try {
          console.log('success');
          const userData = await response.json();
          localStorage.setItem('userData', JSON.stringify(userData));
          setTimeout(() => localStorage.removeItem('userData'), 1000 * 60 * 60);
          setSubmissionStatus('Success');
        } catch (error) {
          // start of handling unsuccessful login
          setSubmissionStatus('Error');
        }
      } else if (response.status === 403) {
        setSubmissionStatus('Error');
      }
    } catch (error) {
      setSubmissionStatus('Error');
    }
  };

  useEffect(() => {
    if (submissionStatus === 'Success') {
      // successful login, direct to main page
      router.push('/');
    }
  });

  return (
    <div className="flex min-h-screen w-full flex-col items-center space-y-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 items-center justify-center"
      >
        <div className="w-auto">
          <h2 className="mb-3 text-2xl font-semibold">Email</h2>
          <input
            placeholder="Enter email"
            className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-80  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
            value={userLogin.email}
            onChange={(e) =>
              setUserLogin({ ...userLogin, email: e.target.value })
            }
          ></input>
        </div>

        <div className="w-auto">
          <h2 className="mb-3 text-2xl font-semibold">Password</h2>
          <input
            type="password"
            placeholder="Enter password"
            className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-80  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
            value={userLogin.password}
            onChange={(e) =>
              setUserLogin({ ...userLogin, password: e.target.value })
            }
          ></input>
        </div>

        <div className="lg:mx-auto">
          <button
            type="submit"
            className="w-full fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-80 lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200"
          >
            Log In
          </button>
        </div>
      </form>
      {submissionStatus === 'Error' ? (
        <div className="text-rose-500">
          Invalid credentials. Please try again.
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default LoginForm;

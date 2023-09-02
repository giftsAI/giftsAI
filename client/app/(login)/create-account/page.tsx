'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function CreateAccountForm(): JSX.Element {
  interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  const [user, setUser] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState<string>('');

  const router = useRouter();

  // submitting new account information
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3500/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.status === 200) { // successful signup, log in user automatically
        console.log('successful response');
        const userData = await response.json();
        localStorage.setItem('userData', JSON.stringify(userData));
        setSubmissionStatus('Success');
      } else {
        setSubmissionStatus('Error');
      }
    } catch (error) { // error in sign up
      console.log(error);
      setSubmissionStatus('Error');
    }
  };

  useEffect(() => {
    if (submissionStatus === 'Success') { // send to main page once succesfully signed in
      router.push('/');
    }
  }, [submissionStatus, router]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center space-y-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 items-center justify-center"
      >
        <div className="w-auto">
          <h2 className={`mb-3 text-2xl font-semibold`}>First Name</h2>
          <input
            placeholder="Enter first name"
            className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-80  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          ></input>
        </div>

        <div className="w-auto">
          <h2 className={`mb-3 text-2xl font-semibold`}>Last Name</h2>
          <input
            placeholder="Enter last name"
            className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-80  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          ></input>
        </div>

        <div className="w-auto">
          <h2 className={`mb-3 text-2xl font-semibold`}>Email</h2>
          <input
            placeholder="Enter email"
            className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-80  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          ></input>
        </div>

        <div className="w-auto">
          <h2 className={`mb-3 text-2xl font-semibold`}>Password</h2>
          <input
            type="password"
            placeholder="Enter password"
            className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-80  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          ></input>
        </div>

        <div className="lg:mx-auto">
          <button
            type="submit"
            className="w-full fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-80 lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200"
          >
            Create Account
          </button>
        </div>
      </form>
      {
        submissionStatus === 'Error' ?
        <div className="text-rose-500">
          Please review information and try again.
        </div> : <></>
      }
    </div>
  );
}

export default CreateAccountForm;

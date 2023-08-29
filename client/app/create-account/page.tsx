function createAccount(): JSX.Element {
  return (
    <form className="flex flex-col gap-10 items-center justify-center min-h-screen">
      <div>
        <h2 className={`mb-3 text-2xl font-semibold`}>First Name</h2>
        <input
          placeholder="Enter first name"
          className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
        ></input>
      </div>

      <div>
        <h2 className={`mb-3 text-2xl font-semibold`}>Last Name</h2>
        <input
          placeholder="Enter last name"
          className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
        ></input>
      </div>

      <div>
        <h2 className={`mb-3 text-2xl font-semibold`}>Email</h2>
        <input
          placeholder="Enter email"
          className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
        ></input>
      </div>

      <div>
        <h2 className={`mb-3 text-2xl font-semibold`}>Password</h2>
        <input
          placeholder="Enter password"
          className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
        ></input>
      </div>

      <div className="lg:mx-auto">
        <button className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200">
          Create Account
        </button>
      </div>
    </form>
  );
}

export default createAccount;

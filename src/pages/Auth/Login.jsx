import React from 'react';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <main>
      <section className="py-20">
        <div className="container max-w-330 mx-auto px-3">
          <div className="flex items-center justify-center ">
            <div className="flex flex-col items-center justify-center w-full md:w-[58%] space-y-10">
              <div className="">
                <h1 className="font-bold uppercase text-4xl">Log in</h1>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;

import React from 'react';
import CreateAccountForm from './components/createAccountForm';

const Register = () => {
  return (
    <main>
      <section className="py-20">
        <div className="container max-w-330 mx-auto px-3">
          <div className="flex items-center justify-center ">
            <div className="flex flex-col items-center justify-center w-full md:w-[58%] space-y-10">
              <div className="">
                <h1 className="font-bold uppercase text-4xl">Register</h1>
              </div>
              <CreateAccountForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;

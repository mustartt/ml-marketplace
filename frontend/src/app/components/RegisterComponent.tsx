import React, { useRef } from 'react';

import HeroIcons from './HeroIcons';
import CustomInputField from './CustomInputField';

interface RegisterComponentI {

}

const RegisterComponent: React.FC<RegisterComponentI> = () => {

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    fetch('http://localhost:8080/api/user/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    }).then(res => res.json()).then(result => console.log(result)).catch(err => console.log(err));
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
           style={{maxWidth: '1000px'}}>
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">

          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
              <p>Enter your information to register</p>
            </div>
            <div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <CustomInputField
                    icon={<div className="h-5 w-5">{HeroIcons.user}</div>}
                    name="username"
                    label="Username"
                    inputType="text"
                    inputRef={usernameRef}
                    placeholder="johnsmith123"/>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <CustomInputField
                    icon={<div className="h-5 w-5">{HeroIcons.email}</div>}
                    name="email"
                    label="Email"
                    inputType="text"
                    inputRef={emailRef}
                    placeholder="johnsmith@gmail.com"/>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <CustomInputField
                    icon={<div className="h-5 w-5">{HeroIcons.email}</div>}
                    name="password"
                    label="Password"
                    inputType="password"
                    inputRef={passwordRef}
                    placeholder="**********"/>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
                    onClick={handleSubmit}
                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER
                    NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
import React, {ReactNode, useRef} from "react";

import HeroIcons from "./HeroIcons";


interface RegisterInputFieldI {
  icon: ReactNode,
  name: string,
  label: string,
  placeholder?: string,
  inputType: string,
  ref?: React.Ref<HTMLInputElement>
}

const RegisterInputField: React.FC<RegisterInputFieldI> = (props) => {
  const elementId = `input-field-${props.name}`;
  return (
    <>
      <label htmlFor={elementId} className="text-xs font-semibold px-1">{props.label}</label>
      <div className="flex">
        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
          {props.icon}
        </div>
        <input id={elementId}
               type={props.inputType}
               ref={props.ref}
               className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
               placeholder={props.placeholder}/>
      </div>
    </>
  );
}

interface RegisterComponentI {

}

const RegisterComponent: React.FC<RegisterComponentI> = () => {

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
                <div className="w-1/2 px-3 mb-5">
                  <RegisterInputField
                    icon={<div className="h-5 w-5">{HeroIcons.user}</div>}
                    name="firstname"
                    label="First name"
                    inputType="text"
                    placeholder="John"/>
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <RegisterInputField
                    icon={<div className="h-5 w-5">{HeroIcons.user}</div>}
                    name="lastname"
                    label="Last name"
                    inputType="text"
                    placeholder="Smith"/>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <RegisterInputField
                    icon={<div className="h-5 w-5">{HeroIcons.email}</div>}
                    name="email"
                    label="Email"
                    inputType="text"
                    placeholder="johnsmith@gmail.com"/>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <RegisterInputField
                    icon={<div className="h-5 w-5">{HeroIcons.email}</div>}
                    name="password"
                    label="Password"
                    inputType="password"
                    placeholder="**********"/>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button
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
}

export default RegisterComponent;
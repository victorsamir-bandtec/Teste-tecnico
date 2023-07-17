import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export type InputProps = {
  password?: boolean;
  label: string;
  id: string;
  errorMsg?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  password,
  id,
  errorMsg,
  label,
  ...rest
}) => {
  const [eye, setEye] = useState<boolean>(false);

  return (
    <>
      <div className="h-24 flex flex-col mb-3">
        <label className="mb-1 ml-1 text-xl font-semibold" htmlFor={id}>
          {label}
        </label>

        <div className="w-full flex items-center justify-between rounded-lg bg-white border border-zinc-600">
          <input
            className="w-[85%] p-2 rounded-lg outline-none bg-white"
            type={eye ? 'text' : 'password'}
            id={id}
            {...rest}
          />

          {password && (
            <>
              {eye ? (
                <div
                  className="text-xl mr-4 cursor-pointer"
                  onClick={() => setEye((prev) => !prev)}
                >
                  <FaEye />
                </div>
              ) : (
                <div
                  className="text-xl mr-4 cursor-pointer"
                  onClick={() => setEye((prev) => !prev)}
                >
                  <FaEyeSlash />
                </div>
              )}
            </>
          )}
        </div>

        {errorMsg && <p className="text-red-700">{errorMsg}</p>}
      </div>
    </>
  );
};

export default Input;

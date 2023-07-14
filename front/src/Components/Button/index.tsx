import React from 'react';

type ButtonProps = {
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ label, ...rest }) => {
  return (
    <button
      {...rest}
      type="button"
      className="bg-violet-900 py-2 px-10 rounded-lg hover:bg-violet-700"
    >
      {label}
    </button>
  );
};

export default Button;

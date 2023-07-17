import React from 'react';

type ButtonProps = {
  label: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ label, loading, ...rest }) => {
  return (
    <button
      {...rest}
      disabled={loading}
      type="button"
      className="w-full bg-violet-900 text-zinc-50 py-2 px-10 rounded-lg disabled:bg-zinc-400 hover:bg-violet-700"
    >
      {!loading && <>{label}</>}
      {loading && <>Carregando</>}
    </button>
  );
};

export default Button;

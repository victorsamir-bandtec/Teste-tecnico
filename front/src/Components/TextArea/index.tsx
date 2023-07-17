import React from 'react';

export type TextAreaProps = {
  label: string;
  id: string;
  errorMsg?: string;
  spanMaxLenght?: boolean;
  length?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: React.FC<TextAreaProps> = ({
  id,
  errorMsg,
  label,
  length = 0,
  maxLength = 256,
  ...rest
}) => {
  return (
    <div className="h-64 flex flex-col mb-3">
      <label className="mb-1 ml-1 text-xl font-semibold" htmlFor={id}>
        {label}
      </label>

      <textarea
        className="h-48 p-2 rounded-lg outline-none resize-none border border-zinc-600 bg-white"
        id={id}
        maxLength={maxLength}
        {...rest}
      />

      <div className="w-full flex justify-end mt-1">
        <p className="text-sm text-zinc-600">{`${length}/${maxLength}`}</p>
      </div>

      {errorMsg && <p className="text-red-700">{errorMsg}</p>}
    </div>
  );
};

export default TextArea;

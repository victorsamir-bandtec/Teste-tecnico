import React from 'react';
import { Control, Controller } from 'react-hook-form';
import TextArea, { TextAreaProps } from '..';

export type TextAreaControlledProps = {
  control: Control<any>;
  name: string;
} & TextAreaProps;

const TextAreaControlled: React.FC<TextAreaControlledProps> = ({
  name,
  control,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <TextArea {...rest} {...field} />}
    />
  );
};

export default TextAreaControlled;

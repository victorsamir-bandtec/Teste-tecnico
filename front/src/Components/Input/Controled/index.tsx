import React from 'react';
import { Control, Controller } from 'react-hook-form';
import Input, { InputProps } from '..';

// import { Container } from './styles';

export type InputControlledProps = {
  control: Control<any>;
  name: string;
} & InputProps;

const InputControled: React.FC<InputControlledProps> = ({
  name,
  control,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Input {...rest} {...field} />}
    />
  );
};

export default InputControled;

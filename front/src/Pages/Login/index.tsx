import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Button from '../../Components/Button';
import InputControled from '../../Components/Input/Controled';

type FormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Por favor informe seu e-mail'),
    password: Yup.string().required('Por favor informe sua senha'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <div className="h-full grid place-items-center">
      <div className="bg-zinc-800 flex h-[80%] w-[90%] rounded-lg shadow-lg">
        <div className="w-full sm:w-[30%] flex-col justify-center p-6 rounded shadow-md bg-zinc-50">
          <h1 className="text-4xl mb-1 text-violet-900 font-semibold">
            Máquina de Posts
          </h1>

          <h4 className="text-sm mb-2 text-zinc-600">
            Faça login ou cadastre-se para obter o melhor da nossa plataforma
          </h4>

          <form className="h-[65%] flex flex-col justify-center space-y-3">
            <h2 className="text-2xl mb-2 text-zinc-800 font-semibold">Login</h2>

            <InputControled
              name="email"
              id="email"
              type="email"
              label="E-mail"
              placeholder="Digite seu e-mail cadastrado"
              control={control}
              errorMsg={errors.email?.message}
            />

            <InputControled
              password
              name="password"
              id="password"
              label="Senha"
              placeholder="Digite a sua senha"
              control={control}
              errorMsg={errors.password?.message}
            />

            <Button label="Entrar" onClick={handleSubmit(onSubmit)} />
          </form>

          <p className="text-zinc-800 font-semibold">
            Ainda não possui cadastro ?{' '}
            <span className="text-blue-800 font-semibold cursor-pointer">
              Cadastre-se aqui
            </span>
          </p>
        </div>
        <div className="flex-1 bg-cover bg-login"></div>
      </div>
    </div>
  );
};

export default Login;

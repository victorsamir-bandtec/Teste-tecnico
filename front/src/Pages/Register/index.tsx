/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import Button from '../../Components/Button';
import InputControled from '../../Components/Input/Controled';

type FormInputs = {
  username: string;
  name: string;
  password: string;
};

const Register: React.FC = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Por favor informe seu username'),
    name: Yup.string().required('Por favor informe seu nome'),
    password: Yup.string().required('Por favor informe sua senha'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const response = await window.FakerApi.post('/register', data);

    if (response.success) {
      toast.success(response.message);
      setTimeout(() => {
        navigate('/');
      }, 1000);
      return;
    }
    toast.error(response.message);
  };

  return (
    <>
      <div className="h-full grid place-items-center">
        <div className="bg-zinc-800 flex h-[80%] w-[90%] rounded-lg shadow-lg">
          <div className="w-full sm:w-[30%] flex-col justify-center p-6 rounded shadow-md bg-zinc-50">
            <h1 className="text-4xl mb-1 text-violet-900 font-semibold">
              Máquina de Posts
            </h1>

            <h4 className="text-sm mb-2 text-zinc-600">
              Faça o seu cadastro para obter acesso a nossa plataforma
            </h4>

            <form className="h-[75%] flex flex-col justify-center space-y-2 mb-2">
              <h2 className="text-2xl font-semibold">Cadastro</h2>

              <InputControled
                name="name"
                id="name"
                type="text"
                label="Nome"
                placeholder="Digite seu nome"
                control={control}
                errorMsg={errors.name?.message}
              />

              <InputControled
                name="username"
                id="username"
                type="text"
                label="Username"
                placeholder="Digite seu nome de usuario"
                control={control}
                errorMsg={errors.username?.message}
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

              <Button
                label="Cadastrar"
                loading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              />
            </form>

            <p className="font-semibold">
              Já tem cadastro ?{' '}
              <span className="text-blue-800 font-semibold cursor-pointer">
                Fazer login
              </span>
            </p>
          </div>
          <div className="flex-1 bg-cover bg-login"></div>
        </div>
      </div>

      <ToastContainer theme="dark" />
    </>
  );
};

export default Register;

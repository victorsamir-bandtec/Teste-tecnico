/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineClose, AiOutlineEdit, AiOutlineSend } from 'react-icons/ai';
import { CgLogOut } from 'react-icons/cg';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import Button from '../../Components/Button';
import InputControled from '../../Components/Input/Controled';
import TextAreaControlled from '../../Components/TextArea/Controlled';
import useSize from '../../Hooks/useSize';

type FormInputs = {
  title: string;
  content: string;
  id?: number;
};

const Home: React.FC = () => {
  const { isMobile } = useSize();
  const navigate = useNavigate();

  const [comentValue, setCommentValue] = useState<string>('');
  const [user, setUser] = useState<UserDTO>();
  const [posts, setPosts] = useState<PostsDTO[]>([]);
  const [reload, setReload] = useState<number>(0);
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number>();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Por favor informe seu titulo'),
    content: Yup.string().required('Por favor informe seu conteúdo'),
  });

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const watchContent = watch('content');

  const reloadList = () => {
    setReload((currentReload) => currentReload + 1);
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await window.FakerApi.get('/me', {});

      if (response.success) {
        setUser(response.data);
        return;
      }

      toast.error(response.message);
    };

    getUser();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const response = await window.FakerApi.get('/posts', {});

      if (response.success) {
        response.data.map(async (post: PostsDTO) => {
          await window.FakerApi.get('/comments', {
            post_id: post.id,
          });
        });

        setPosts(response.data);
        toast.success(response.message);
        return;
      }

      toast.error(response.message);
    };

    getPosts();
  }, [reload]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let response;

    if (data.id && isEditting) {
      response = await window.FakerApi.put('/posts/update', {
        post_id: data.id,
        post: data,
      });
    } else {
      response = await window.FakerApi.post('/posts/create', data);
    }

    if (response.success) {
      toast.success(response.message);
      reset({ content: '', id: undefined, title: '' });
      setIsEditting(false);

      reloadList();
      return;
    }

    toast.error(response.message);
  };

  const handleEditPost = (post: PostsDTO) => {
    setValue('title', post.title);
    setValue('content', post.content);
    setValue('id', post.id);

    setIsEditting(true);
  };

  const handleRemovePost = async (post_id: number) => {
    const response = await window.FakerApi.delete('/posts/remove', { post_id });

    if (response.success) {
      toast.success(response.message);
      reloadList();
      return;
    }

    toast.error(response.message);
  };

  const handleComment = async (post_id: number) => {
    if (comentValue.length === 0) {
      toast.warning('Por favor digite um comentario');
      return;
    }

    let response;

    if (commentId) {
      response = await window.FakerApi.put('/comments/update', {
        post_id,
        comment_id: commentId,
        comment: { content: comentValue },
      });
    } else {
      response = await window.FakerApi.post('/comments/create', {
        post_id,
        comment: { content: comentValue },
      });
    }

    if (response.success) {
      toast.success(response.message);
      setCommentValue('');
      setCommentId(undefined);
      reloadList();
      return;
    }

    toast.error(response.message);
  };

  const handleEditComment = (comment: CommentDTO) => {
    setCommentId(comment.id);
    setCommentValue(comment.content);
  };

  const handleRemoveComment = async (post_id: number, comment_id: number) => {
    const response = await window.FakerApi.delete('/comments/remove', {
      post_id,
      comment_id,
    });

    if (response.success) {
      toast.success(response.message);
      reloadList();
      return;
    }

    toast.error(response.message);
  };

  const handleLogout = async () => {
    const response = await window.FakerApi.post('/logout', {});

    if (response.success) {
      toast.success(response.message);
      navigate('/');
      return;
    }

    toast.error(response.message);
  };

  return (
    <>
      <div className="sm:h-full grid place-items-center bg-zinc-800">
        <div className="w-full flex flex-col sm:flex-row justify-between sm:h-[90vh] sm:w-[90%] p-4 rounded-lg shadow-lg  overflow-auto bg-zinc-50">
          {/* Novo Post */}
          <div className="w-full flex flex-col sm:w-[35%] p-4">
            <div className="flex space-x-2">
              <div className="w-16 h-16 grid place-items-center text-3xl rounded-full text-zinc-100 bg-zinc-700">
                <FaUser />
              </div>

              <div>
                <h2 className="mt-1 text-lg font-semibold">
                  Olá, {user?.name}
                </h2>
                <h2 className="text-lg">
                  {isEditting
                    ? 'Edite o seu post selecionado'
                    : 'Escreva um novo post'}
                </h2>
              </div>

              <div
                className="flex-1 flex justify-end items-center text-4xl text-zinc-700 cursor-pointer"
                onClick={handleLogout}
              >
                <CgLogOut />
              </div>
            </div>

            <form className="flex flex-col mt-10">
              <div className="flex-1">
                <InputControled
                  id="title"
                  name="title"
                  label="Titulo"
                  placeholder="Digite o titulo do seu post"
                  type="text"
                  control={control}
                  errorMsg={errors.title?.message}
                />
              </div>

              <div className="flex-1">
                <TextAreaControlled
                  id="content"
                  name="content"
                  label="Conteúdo"
                  placeholder="Digite o conteúdo do seu post"
                  length={watchContent?.length}
                  control={control}
                  errorMsg={errors.content?.message}
                />
              </div>

              {isEditting && (
                <div className="flex items-center">
                  <span
                    className="text-violet-800 cursor-pointer"
                    onClick={() => {
                      reset({ content: '', id: undefined, title: '' });
                      setIsEditting(false);
                    }}
                  >
                    Cancelar
                  </span>

                  <div className="flex-1 ml-12">
                    <Button label="Editar" onClick={handleSubmit(onSubmit)} />
                  </div>
                </div>
              )}

              {!isEditting && (
                <Button label="Postar" onClick={handleSubmit(onSubmit)} />
              )}
            </form>
          </div>

          {!isMobile && <div className="h-full w-[1px] bg-zinc-400"></div>}
          {isMobile && <div className="w-full h-[1px] my-4 bg-zinc-400"></div>}

          {/* Lista de Posts */}
          <div className="w-full flex flex-col flex-1 p-4 space-y-6 overflow-auto">
            <h2 className="text-2xl mb-3">Lista de Posts</h2>

            {posts.length === 0 && (
              <div className="h-full grid place-items-center p-4 bg-zinc-200 rounded-xl">
                <p>Parece que ainda não tem nenhum post aqui</p>
              </div>
            )}

            {posts.length !== 0 &&
              posts.map((post) => (
                <div key={post.id} className="flex flex-col space-y-4 ">
                  <div className="p-4 rounded-xl bg-zinc-100">
                    <div className="flex items-center justify-between">
                      <h4 className="mb-1 text-lg font-semibold">
                        {post?.title}
                      </h4>

                      <div className="flex space-x-4">
                        <div
                          className="cursor-pointer"
                          onClick={() => handleEditPost(post)}
                        >
                          <AiOutlineEdit />
                        </div>

                        <div
                          className="cursor-pointer"
                          onClick={() => handleRemovePost(post.id)}
                        >
                          <AiOutlineClose />
                        </div>
                      </div>
                    </div>

                    <p>{post?.content}</p>

                    <div className="w-full h-[1px] my-4 bg-zinc-300"></div>

                    <div>
                      <h6 className="mb-1 text-sm font-semibold text-violet-900 cursor-pointer">
                        Comentarios
                      </h6>

                      {!post.comments && (
                        <div className="flex justify-between items-center p-2 text-sm rounded-xl">
                          <p>Nenhum comentario feito nesse post.</p>
                        </div>
                      )}

                      {post?.comments?.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex justify-between items-center p-2 text-sm rounded-xl mb-2 bg-zinc-200"
                        >
                          <p>{comment.content}</p>

                          <div className="flex space-x-4">
                            <div
                              className="cursor-pointer"
                              onClick={() => handleEditComment(comment)}
                            >
                              <AiOutlineEdit />
                            </div>

                            <div
                              className="cursor-pointer"
                              onClick={() =>
                                handleRemoveComment(post.id, comment.id)
                              }
                            >
                              <AiOutlineClose />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      {commentId && (
                        <span className="text-sm font-semibold">
                          Editar comentario
                        </span>
                      )}

                      <div className="flex">
                        <input
                          className="flex-1 px-2 rounded-lg text-sm outline-none border border-zinc-700 bg-white"
                          onChange={(e) => setCommentValue(e.target.value)}
                          value={comentValue}
                          placeholder="Digite o seu comentario"
                        />

                        <div className="ml-2">
                          <button
                            className="p-2 rounded-lg text-zinc-50 bg-violet-800"
                            onClick={() => handleComment(post.id)}
                          >
                            <AiOutlineSend />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <ToastContainer theme="dark" />
    </>
  );
};

export default Home;

'use client';

import { useForm } from 'react-hook-form';
import { useSignUpMutation } from '@/api/sign/queries';
import Button from '../Button';

export default function SignUpForm() {
  const { register, watch, handleSubmit } = useForm();

  const { mutate: onRegister } = useSignUpMutation();

  return (
    <>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(() =>
          onRegister({
            email: watch('email'),
            nickName: watch('nickName'),
            password: watch('password'),
          })
        )}>
        <input className="border-2 border-stroke_grey" {...register('email')} />
        <input
          className="border-2 border-stroke_grey"
          {...register('nickName')}
        />
        <input
          className="border-2 border-stroke_grey"
          {...register('password')}
        />
        <Button type="submit">회원가입</Button>
      </form>
    </>
  );
}
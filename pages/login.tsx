import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MouseEventHandler, useState } from 'react'

import LoginLayout from '@/components/Login/LoginLayout'

import { KeyIcon } from '@heroicons/react/solid'

const LoginPage: NextPage = () => {
  const router = useRouter()

  const [isInForgotPassword, setIsInForgotPassword] = useState<boolean>(false)

  const handleOnClickInputButtonSignIn: MouseEventHandler<HTMLInputElement> = () => {
    if (typeof window !== 'undefined') {
      router.push('/duo')
    }
  }

  const handleOnClickInputButtonForgotPassword: MouseEventHandler<HTMLInputElement> = () => {
    setIsInForgotPassword(!isInForgotPassword)
  }

  return (
    <LoginLayout id="login-layout">
      <Head>
        <title>FDU CampusHub</title>
      </Head>
      <div className="bg-wrapper fixed h-screen w-screen overflow-hidden z-[-1] portrait:hidden">
        <Image
          alt="Login Background"
          src="/static/fdu/login.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="bg-wrapper fixed h-screen w-screen overflow-hidden z-[-1] hidden portrait:block">
        <Image
          alt="Login Background"
          src="/static/fdu/login-vertical.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div
        id="login-wrapper"
        className="flex flex-col items-center justify-center flex-1 px-[20%] py-4 space-y-16"
      >
        <div className="flex flex-col items-center justify-center w-full p-8 space-y-16 bg-white">
          <span className="flex flex-col items-center justify-center w-full space-y-2">
            <KeyIcon width={50} height={50} />
            <span className="font-bold text-center lg:text-lg">
              FDU CampusHub requires you to log in with your NetID
            </span>
          </span>
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
            <form className="flex flex-col justify-between space-y-4">
              <div>
                <label htmlFor="inputTxtFduNetId">FDU NetID</label>
                <input
                  autoComplete="username"
                  name="inputTxtFduNetId"
                  type="text"
                  placeholder="example@student.fdu.edu"
                  className="w-full focus:ring focus:ring-vivid-burgundy"
                />
              </div>
              <div>
                <label htmlFor="inputTxtPassword">Password</label>
                <input
                  autoComplete="current-password"
                  name="inputTxtPassword"
                  type="password"
                  placeholder="Password"
                  className="w-full focus:ring focus:ring-vivid-burgundy"
                />
              </div>
              <span className="col-span-4">
                <input
                  type="button"
                  value="Sign in"
                  onClick={handleOnClickInputButtonSignIn}
                  className="w-full p-2 text-white transition-colors border border-black rounded bg-vivid-burgundy hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                />
              </span>
            </form>
            <div className="flex flex-col justify-around px-4 py-2 space-y-2 border border-black">
              {!isInForgotPassword ? (
                <>
                  <input
                    type="button"
                    value="Forgot password?"
                    onClick={handleOnClickInputButtonForgotPassword}
                    className="p-2 text-white transition-colors border border-black rounded bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                  />
                  <input
                    type="button"
                    value="Non-FDU user login"
                    className="p-2 text-white transition-colors border border-black rounded bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                  />
                </>
              ) : (
                <>
                  <input
                    type="button"
                    value="Reset by security questions"
                    className="p-2 text-white transition-colors border border-black rounded bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                  />
                  <input
                    type="button"
                    value="Reset by recovery email"
                    className="p-2 text-white transition-colors border border-black rounded bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                  />
                  <input
                    type="button"
                    value="Forgot NetID and password"
                    className="p-2 text-white transition-colors border border-black rounded bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                  />
                  <input
                    type="button"
                    value="Back"
                    onClick={handleOnClickInputButtonForgotPassword}
                    className="p-2 text-white transition-colors border border-black rounded bg-vivid-burgundy hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-center justify-between w-full space-y-4 lg:flex-row">
          <div className="w-full p-8 bg-white prose-md lg:max-w-[40%]">
            <p>FDU Technical Assistance Centre (UTAC)</p>
            <p>Email: FDUTAC@fdu.edu</p>
            <p>Phone: (973) 443-8822</p>
          </div>
          <div className="hidden lg:grid w-full grid-cols-2 grid-rows-1 gap-2 p-8 bg-white lg:max-w-[40%]">
            <span className="flex items-center justify-center h-full">
              Download Blackboard App for mobile
            </span>
            <div className="flex flex-col space-y-2">
              <input
                type="button"
                value="iOS"
                className="p-2 text-white transition-colors border border-black rounded bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
              />
              <input
                type="button"
                value="Android"
                className="p-2 text-white transition-colors border border-black rounded bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  )
}

export default LoginPage

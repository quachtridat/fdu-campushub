import { NextPage } from 'next'
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
      <div
        id="login-wrapper"
        className="flex flex-col items-center justify-center flex-1 p-4 space-y-16"
      >
        <div className="flex flex-col items-center justify-center w-full max-w-screen-lg p-8 space-y-16 bg-white">
          <span className="flex flex-col items-center justify-center w-full space-y-2">
            <KeyIcon width={50} height={50} />
            <span className="text-lg font-bold">
              FDU CampusHub requires you to log in with your NetID
            </span>
          </span>
          <div className="grid w-full grid-cols-2 grid-rows-1 gap-8">
            <div className="grid grid-cols-4 gap-2">
              <span className="flex items-center col-span-1">FDU NetID</span>
              <span className="col-span-3">
                <input
                  type="text"
                  placeholder="example@student.fdu.edu"
                  className="w-full focus:ring focus:ring-vivid-burgundy"
                />
              </span>
              <span className="flex items-center col-span-1">Password</span>
              <span className="col-span-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full focus:ring focus:ring-vivid-burgundy"
                />
              </span>
              <span className="col-span-4">
                <input
                  type="button"
                  value="Sign in"
                  onClick={handleOnClickInputButtonSignIn}
                  className="w-full p-2 text-white transition-colors border border-black rounded bg-vivid-burgundy hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                />
              </span>
            </div>
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
                    value="Reset using security questions"
                    className="p-2 text-white transition-colors border border-black rounded bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                  />
                  <input
                    type="button"
                    value="Reset using recovery email"
                    className="p-2 text-white transition-colors border border-black rounded bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                  />
                  <input
                    type="button"
                    value="Forgot FDU NetID and password"
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
        <div className="flex flex-row items-center justify-between w-full max-w-screen-lg">
          <div className="p-8 bg-white prose-md">
            <p>FDU Technical Assistance Centre (UTAC)</p>
            <p>Email: FDUTAC@fdu.edu</p>
            <p>Phone: (973) 443-8822</p>
          </div>
          <div className="grid max-w-sm grid-cols-2 grid-rows-1 gap-2 p-8 bg-white">
            <span className="flex items-center justify-center h-full">
              Download Blackboard App for mobile
            </span>
            <div className="flex flex-col space-y-2">
              <input
                type="button"
                value="App Store"
                className="p-2 text-white transition-colors border border-black rounded bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
              />
              <input
                type="button"
                value="Google Play Store"
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

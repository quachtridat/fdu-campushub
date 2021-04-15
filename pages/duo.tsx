import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'
import Select from 'react-select'

import LoginLayout from '@/components/Login/LoginLayout'
import { signIn } from '@/lib/signIn'

import { KeyIcon, QuestionMarkCircleIcon as QuestionMarkIcon, CogIcon as ConfigIcon } from '@heroicons/react/solid'

const duoMobileDevices: Array<{ value: string; label: string }> = [
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
  { value: 'deviceX', label: 'Device X' },
]

const DuoPage: NextPage = () => {
  const router = useRouter()

  const handleOnClickGenericButton: MouseEventHandler<HTMLInputElement> = () => {
    signIn()
    if (typeof window !== 'undefined') {
      router.push('/')
    }
  }

  return (
    <LoginLayout id="login-layout">
      <div
        id="login-wrapper"
        className="flex flex-col items-center justify-center flex-1 px-[20%] py-4 space-y-16"
      >
        <div className="flex flex-col items-center justify-center w-full p-8 space-y-16 bg-white">
          <span className="flex flex-col items-center justify-center w-full space-y-2">
            <KeyIcon width={50} height={50} />
            <span className="font-bold text-center lg:text-lg">
              2-factor authentication with Duo Mobile
              &nbsp;
              <Link href="https://guide.duo.com/prompt">
                <a className="inline-block align-baseline">
                  <QuestionMarkIcon height="1.25em" />
                </a>
              </Link>
            </span>
          </span>
          <div className="grid w-full grid-cols-4 gap-8">
            <div className="flex-col items-start hidden col-span-1 lg:flex">
              <Image src="/static/fdu/logo.png" width={128} height={128} />
              <Link href="https://guide.duo.com/prompt">
                <a>What is this?</a>
              </Link>
              <Link href="#">
                <a>Add a new device</a>
              </Link>
              <Link href="#">
                <a>My Settings &amp; Devices</a>
              </Link>
              <Link href="#">
                <a>Need help?</a>
              </Link>
            </div>
            <div className="flex flex-col justify-between col-span-4 space-y-2 lg:col-span-3">
              <div className="flex flex-row items-center space-x-2">
                <span>Device: </span>
                <Select
                  instanceId="selectDuoMobileDevice"
                  options={duoMobileDevices}
                  isClearable={false}
                  isSearchable={false}
                  className="flex-1 min-w-[10rem]"
                />
                <span className="p-1 text-white border border-black rounded bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer">
                  <ConfigIcon height="1.5em" />
                </span>
              </div>
              <div className="flex flex-col p-2 space-y-2 border border-black lg:flex-row lg:items-center lg:justify-between lg:space-x-2">
                <span>Send me a &quot;Push&quot;</span>
                <input
                  type="button"
                  value="Push"
                  onClick={handleOnClickGenericButton}
                  className="w-full p-2 text-white transition-colors border border-black rounded lg:w-40 bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                />
              </div>
              <div className="flex flex-col p-2 space-y-2 border border-black lg:flex-row lg:items-center lg:justify-between lg:space-x-2">
                <span>Call me with my phone number</span>
                <input
                  type="button"
                  value="Call"
                  onClick={handleOnClickGenericButton}
                  className="w-full p-2 text-white transition-colors border border-black rounded lg:w-40 bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                />
              </div>
              <div className="flex flex-col p-2 space-y-2 border border-black lg:flex-row lg:items-center lg:justify-between lg:space-x-2">
                <span>Use authentication code</span>
                <input
                  type="button"
                  value="Type code"
                  onClick={handleOnClickGenericButton}
                  className="w-full p-2 text-white transition-colors border border-black rounded lg:w-40 bg-oxford-blue-light hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
                />
              </div>
              <input
                type="button"
                value="Sign in"
                onClick={handleOnClickGenericButton}
                className="w-full p-2 text-white transition-colors border border-black rounded bg-vivid-burgundy hover:bg-oxford-blue-dark focus:ring focus:ring-vivid-burgundy hover:cursor-pointer"
              />
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

export default DuoPage

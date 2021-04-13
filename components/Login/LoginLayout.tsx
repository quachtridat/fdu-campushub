type PropsType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

import Link from 'next/link'
import Image from 'next/image'

const LoginLayout: React.FC<PropsType> = ({
  children,
  className: propClassName,
  ...otherProps
}) => {
  return (
    <div
      id="login-layout"
      className={`flex flex-col flex-1 bg-center bg-cover ${
        propClassName || ''
      }`}
      {...otherProps}
    >
      <div className="top-0 left-0 flex flex-row items-center justify-between flex-shrink-0 w-full p-2 space-x-2 text-center bg-white border-b border-black border-solid">
        <Link href="https://fdu.edu/">
          <a className="w-[300px]">
            <Image
              src="/static/fdu/fdumarkreversed.jpg"
              /* originally 1960x720px */ width={98}
              height={35}
            />
          </a>
        </Link>
        <span className="text-4xl font-bold">Login Authentication</span>
        <Link href="/">
          <a className="w-[300px]">
            <Image
              src="/static/fdu/webcampus.gif"
              /* originally 350x100px */ width={262.5}
              height={75}
            />
          </a>
        </Link>
      </div>
      {children}
      <div className="flex flex-col items-center justify-around p-4 bg-white border-t border-black">
      <p>Written by <Link href="https://github.com/quachtridat"><a className="italic underline">Dat Quach</a></Link>.</p>
        <p className="font-bold">This site is created solely for educational purposes.</p>
      </div>
    </div>
  )
}

export default LoginLayout

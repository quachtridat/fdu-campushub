import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MouseEventHandler } from 'react'
import Select from 'react-select'
import { signOut } from '@/lib/signOut'

interface Props {
  definedSearchOptions?: Array<{ value: string; label: string }>
}

type PropsType = Props &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const predefinedSearchOptions: Array<{ value: string; label: string }> = [
  { value: 'courses', label: 'Courses' },
]

const CampusHubNavBar: React.FC<PropsType> = ({
  definedSearchOptions,
  children: _,
  className: propClassName,
  ...otherProps
}) => {
  const router = useRouter()

  const handleOnClickInputButtonSignOut: MouseEventHandler<HTMLInputElement> = () => {
    signOut()
    if (typeof window !== 'undefined') {
      router.push('/')
    }
  }

  return (
    <div
      {...otherProps}
      className={`${
        propClassName || ''
      } bg-white border-b border-black border-solid py-2 flex flex-row pr-2 space-x-2`}
    >
      <span className="flex items-center justify-around flex-shrink-0 w-40 text-center">
        <Link href="https://fdu.edu/">
          <a>
            <Image
              src="/static/fdu/fdumarkreversed.jpg"
              /* originally 1960x720px */ width={98}
              height={35}
            />
          </a>
        </Link>
      </span>
      <div className="flex flex-row flex-1 h-full space-x-4">
        <form className="flex flex-row flex-1 h-full">
          <fieldset className="flex flex-row items-center flex-1 h-full space-x-2">
            {/* <input type="text" id="txtNavBarSearch" name="txtNavBarSearch" placeholder="Search" className="flex-1 rounded focus:ring-oxford-blue-dark focus:border-oxford-blue-dark" /> */}
            <Select
              instanceId="selectNavBarSearch"
              placeholder="Search"
              isClearable={true}
              options={
                definedSearchOptions
                  ? [...definedSearchOptions, ...predefinedSearchOptions]
                  : predefinedSearchOptions
              }
              className="flex-1 border border-black rounded focus:ring-oxford-blue-dark focus:border-oxford-blue-dark"
            />
            <input
              type="button"
              value="Search"
              className="px-4 py-2 text-white rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark"
            />
          </fieldset>
        </form>
        <span className="flex flex-row items-center h-full p-2 space-x-1 text-white border border-black rounded hover:cursor-pointer bg-oxford-blue-light hover:bg-oxford-blue-dark">
          <Image
            src="/static/profile/datquach.png"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span>Dat Quach</span>
        </span>
        <form className="flex flex-row self-end h-full">
          <fieldset className="flex flex-row items-center flex-1 h-full space-x-2">
            <input
              type="button"
              value="Settings"
              className="px-4 py-2 text-white rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark"
            />
            <input
              type="button"
              value="Sign Out"
              onClick={handleOnClickInputButtonSignOut}
              className="px-4 py-2 text-white rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark"
            />
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default CampusHubNavBar

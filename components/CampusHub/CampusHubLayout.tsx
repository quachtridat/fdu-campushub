import Link from 'next/link'
import CampusHubNavBar from './CampusHubNavBar'

interface Props {
  navDefinedSearchOptions?: Array<{ value: string; label: string }>
}

type PropsType = Props &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const CampusHubLayout: React.FC<PropsType> = ({
  navDefinedSearchOptions,
  children,
  ...otherProps
}) => {
  return (
    <div className="flex flex-col flex-1" {...otherProps}>
      <CampusHubNavBar
        definedSearchOptions={navDefinedSearchOptions}
        className="fixed top-0 z-50 w-full h-[4rem]"
      />
      {children}
      <div className="flex flex-col items-center justify-around p-4 bg-white border-t border-black">
        <p>
          Written by{' '}
          <Link href="https://github.com/quachtridat">
            <a className="italic underline">Dat Quach</a>
          </Link>
          .
        </p>
        <p className="font-bold">
          This site is created solely for educational purposes.
        </p>
      </div>
    </div>
  )
}

export default CampusHubLayout

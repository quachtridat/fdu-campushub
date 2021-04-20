import Link from 'next/link'
import {
  BasicSearchOption,
  BasicSearchOptionGroup,
} from '@/interfaces/search-options'
import CampusHubNavBar from '../Standalones/Navbars/CampusHubNavBar'

interface Props extends React.ComponentProps<'div'> {
  navDefinedSearchOptions?: Array<BasicSearchOption | BasicSearchOptionGroup>
  footerClassName?: string
}

const CampusHubLayout: React.FC<Props> = ({
  navDefinedSearchOptions,
  className: propClassName,
  footerClassName,
  children,
  ...otherProps
}) => {
  return (
    <div
      className={`flex flex-col flex-1 ${propClassName || ''}`}
      {...otherProps}
    >
      <CampusHubNavBar
        definedSearchOptions={navDefinedSearchOptions}
        className="fixed top-0 z-50 w-full h-[4rem]"
      />
      {children}
      <div
        className={`flex flex-col items-center justify-around p-4 bg-white border-t border-black ${
          footerClassName || ''
        }`}
      >
        <p>
          Written by{' '}
          <Link href="https://github.com/quachtridat">
            <a className="italic underline">Dat Quach</a>
          </Link>
          .
        </p>
        <p className="font-bold">
          This site is created for educational purposes.
        </p>
      </div>
    </div>
  )
}

export default CampusHubLayout

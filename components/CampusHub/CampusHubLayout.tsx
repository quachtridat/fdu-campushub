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
    <div {...otherProps} className="flex flex-col flex-1">
      <CampusHubNavBar
        definedSearchOptions={navDefinedSearchOptions}
        className="fixed top-0 z-50 w-full h-[4rem]"
      />
      {children}
    </div>
  )
}

export default CampusHubLayout

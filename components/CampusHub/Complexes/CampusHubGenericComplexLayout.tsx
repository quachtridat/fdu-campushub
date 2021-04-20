export interface Props extends React.ComponentProps<'div'> {
  headLeft?: string | JSX.Element
  headCenter?: string | JSX.Element
  headRight?: string | JSX.Element
  headProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
}

export const CampusHubGenericComplexLayout: React.FC<Props> = ({
  headLeft,
  headCenter,
  headRight,
  headProps,
  children,
  ...otherProps
}) => {
  return (
    <div {...otherProps}>
      <div
        className={`flex flex-row justify-between items-center w-full p-2 text-4xl text-center text-white transition-colors border-t border-l border-r border-black rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark ${
          headProps?.className || ''
        }`}
        {...headProps}
      >
        <span>{headLeft || ''}</span>
        <span>{headCenter || ''}</span>
        <span>{headRight || ''}</span>
      </div>
      {children}
    </div>
  )
}

export default CampusHubGenericComplexLayout

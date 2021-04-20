import Image from 'next/image'

type Props = React.ComponentProps<'div'>

const CampusHubStudentProfileBasicComplex: React.VFC<Props> = ({
  children: _,
  className: propClassName,
  ...otherProps
}) => {
  return (
    <div
      className={`flex flex-row px-4 py-2 space-x-8 border-b border-l border-r border-black max-h-48 rounded-b-xl ${
        propClassName || ''
      }`}
      {...otherProps}
    >
      <span>
        <Image
          src="/static/profile/datquach.png"
          width={150}
          height={150}
          className="rounded-full"
        />
      </span>
      <div className="flex flex-col justify-around flex-1">
        <span>
          <span className="font-bold">Name:</span> Dat Quach{' '}
        </span>
        <span>
          <span className="font-bold">Major:</span> Information Technology
        </span>
        <span>
          <span className="font-bold">Minor:</span> Business Administration
        </span>
      </div>
    </div>
  )
}

export default CampusHubStudentProfileBasicComplex

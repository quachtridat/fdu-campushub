import Link from 'next/link';
import Image from 'next/image';

type PropsType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const CampusHubNavBar: React.FC<PropsType> = ({ children: _, className: propClassName, ...otherProps }) => {
  return (
    <div {...otherProps} className={`${propClassName || ''} bg-white border-b border-black border-solid py-2 flex flex-row pr-2`}>
      <span className="flex items-center justify-around text-center w-36">
        <Link href="https://fdu.edu/">
          <a>
            <Image src="/static/fdu/fdumarkreversed.jpg" /* originally 1960x720px */ width={98} height={35} />
          </a>
        </Link>
      </span>
      <div className="flex flex-row flex-1 h-full space-x-4">
        <form className="flex flex-row flex-1 h-full">
          <fieldset className="flex flex-row items-center flex-1 h-full space-x-2">
            <input type="text" id="txtNavBarSearch" name="txtNavBarSearch" placeholder="Search" className="flex-1 rounded focus:ring-oxford-blue-dark focus:border-oxford-blue-dark" />
            <input type="button" value="Search" className="px-4 py-2 text-white rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark" />
          </fieldset>
        </form>
        <form className="flex flex-row self-end h-full">
          <fieldset className="flex flex-row items-center flex-1 h-full space-x-2">
            <input type="button" value="Settings" className="px-4 py-2 text-white rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark" />
            <input type="button" value="Sign Out" className="px-4 py-2 text-white rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark" />
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default CampusHubNavBar;
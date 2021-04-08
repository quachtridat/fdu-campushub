import { AcademicCapIcon, ClipboardIcon, CubeIcon, HomeIcon, IdentificationIcon } from '@heroicons/react/solid';

interface Props {
  activeTileKey?: string;
}

type PropsType = Props & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface ToolTile {
  key: string;
  icon?: JSX.Element;
  name: string;
}

const tiles: Array<ToolTile> = [
  {key: 'homepage', name: 'Home', icon: (<HomeIcon />) },
  {key: 'courses', name: 'Courses', icon: (<AcademicCapIcon />) },
  {key: 'announcements', name: 'Announcements', icon: (<ClipboardIcon />) },
  {key: 'student-svcs', name: 'Student Services', icon: (<IdentificationIcon />) },
  {key: 'blackboard', name: 'Blackboard', icon: (<CubeIcon />) },
];

const CampusHubVerticalToolBar: React.FC<PropsType> = ({ activeTileKey, children: _, className: propClassName, ...otherProps }) => {
  return (
    <div {...otherProps} className={`${propClassName || ''} w-36 space-y-4 text-white`}>
      <div className="py-2 border-b border-white">
        <form action="#" className="w-full">
          <fieldset className="w-full p-2 space-y-2">
            <legend className="w-full text-center">Filter</legend>
            <input type="text" id="txtToolBarFilter" name="txtToolBarFilter" placeholder="Search Tools" className="w-full text-black rounded focus:ring-vivid-burgundy focus:border-vivid-burgundy" />
            <input type="button" value="Search" className="w-full px-4 py-2 text-white rounded bg-vivid-burgundy hover:cursor-pointer" />
          </fieldset>
        </form>
      </div>
      <div className="space-y-6">
        {
          tiles.map((tile, tileIdx) => {
            return (
              <div key={tileIdx} className={`w-full px-2 border-l-2 ${tile.key === activeTileKey ? 'border-vivid-burgundy' : 'border-transparent'} hover:bg-usafa-blue group`}>
                <div className="flex flex-col items-center justify-around py-2 transition transform hover:cursor-pointer group-hover:translate-y-1">
                  <span className="w-1/2">{tile.icon}</span>
                  <span className="w-full text-center">{tile.name}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default CampusHubVerticalToolBar;
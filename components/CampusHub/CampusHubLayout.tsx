import CampusHubNavBar from "./CampusHubNavBar";
import CampusHubVerticalToolBar from "./CampusHubVerticalToolBar";

interface Props {
  activeToolTileKey?: string;
}

type PropsType = Props & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const CampusHubLayout: React.FC<PropsType> = ({activeToolTileKey, children, ...otherProps}) => {
  return (
    <div {...otherProps} className="flex flex-col flex-1">
      <CampusHubNavBar className="fixed top-0 z-50 w-full h-[4rem]" />
      <div className="flex flex-row flex-1 pl-40 pt-[4rem]">
        <CampusHubVerticalToolBar activeTileKey={activeToolTileKey} className="fixed top-[4rem] left-0 w-40 h-full bg-oxford-blue-dark" />
        {children}
      </div>
    </div>
  );
}

export default CampusHubLayout;
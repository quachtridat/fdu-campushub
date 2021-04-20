import Link from 'next/link'
import { MouseEventHandler, useState } from 'react'
import Select from 'react-select'

export interface ToolTile {
  key: string
  icon?: JSX.Element
  name: string
  link?: string
}

interface Props extends React.ComponentProps<'div'> {
  tiles: Array<ToolTile>
  activeTileKey?: string
}

const CampusHubVerticalToolBar: React.FC<Props> = ({
  tiles,
  activeTileKey,
  children: _,
  className: propClassName,
  ...otherProps
}) => {
  const [filterExpanded, setFilterExpanded] = useState(false)

  const handleToggleFilter: MouseEventHandler = () => {
    setFilterExpanded(!filterExpanded)
  }

  return (
    <div
      className={`min-w-min space-y-4 py-4 bg-oxford-blue-dark text-white flex flex-col flex-1 ${
        propClassName || ''
      }`}
      {...otherProps}
    >
      <div className="flex flex-col border-b border-white">
        <form action="#" className="w-full">
          <fieldset className="w-full p-2 space-y-2">
            <legend className="w-full text-center">Filter</legend>
            {filterExpanded ? (
              <>
                <Select
                  instanceId="selectVerticalToolBarSearch"
                  placeholder="Search Tools"
                  isClearable={true}
                  options={tiles.map<{ value: string; label: string }>(
                    (tile) => ({ value: tile.key, label: tile.name })
                  )}
                  className="w-full text-black rounded focus:ring-vivid-burgundy focus:border-vivid-burgundy"
                />
                <input
                  type="button"
                  value="Search"
                  className="w-full px-4 py-2 text-white rounded bg-vivid-burgundy hover:cursor-pointer"
                />
              </>
            ) : (
              <></>
            )}
          </fieldset>
        </form>
        <span
          className="block px-2 py-1 mt-2 text-center text-black bg-white hover:cursor-pointer"
          onClick={handleToggleFilter}
        >
          {filterExpanded ? <>&uarr;</> : <>&darr;</>}
        </span>
      </div>
      <div className="h-full pb-16 space-y-6 overflow-y-auto">
        {tiles ? (
          tiles.map((tile, tileIdx) => {
            const inner = (
              <div className="flex flex-col items-center justify-around w-20 py-2 mx-auto transition transform group-hover:translate-y-1">
                <span className="w-1/2">{tile.icon}</span>
                <span
                  className={`${activeTileKey === tile.key ? 'font-bold' : ''}`}
                >
                  {tile.name}
                </span>
              </div>
            )
            return (
              <div
                key={tileIdx}
                className={`text-center w-full border-l-2 transition ${
                  tile.key === activeTileKey
                    ? 'border-vivid-burgundy bg-vivid-burgundy'
                    : 'bg-transparent border-transparent'
                } hover:bg-usafa-blue group hover:cursor-pointer`}
              >
                {tile.link ? (
                  <Link href={tile.link}>
                    <a>{inner}</a>
                  </Link>
                ) : (
                  inner
                )}
              </div>
            )
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default CampusHubVerticalToolBar

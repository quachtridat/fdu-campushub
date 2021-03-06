import { MouseEventHandler, useState } from 'react'
import Select from 'react-select'
import { BasicSearchOption } from '@/interfaces/search-options'
import { basicTextMatchers } from '@/globals/match-options/text-matchers'
import { DocumentTextIcon as GenericItemIcon } from '@heroicons/react/solid'
import itemList from '@/data/items/sample'

const textMatchers: Array<BasicSearchOption> = basicTextMatchers.map(
  (entry) => ({ value: entry, label: entry })
)

type Props = React.ComponentProps<'div'>

const CampusHubCourseItemListingComplex: React.VFC<Props> = ({
  children: _,
  ...otherProps
}) => {
  const [isUsingFilters, setIsUsingFilters] = useState(false)

  const handleOnClickButtonFilters: MouseEventHandler<HTMLInputElement> = () => {
    setIsUsingFilters(!isUsingFilters)
  }

  return (
    <div {...otherProps}>
      <div className="p-2 border-b border-l border-r border-black">
        <div className="flex flex-row items-center justify-between flex-1 space-x-4">
          <form className="flex flex-row items-center flex-1 h-full">
            <fieldset className="flex flex-row items-center flex-1 h-full space-x-2">
              <Select
                instanceId="selectCourseItemListingSearch"
                placeholder="Search"
                isClearable={true}
                options={itemList.map<{ value: string; label: string }>(
                  (item) => ({ value: item.id.toString(10), label: item.title })
                )}
                className="flex-1 border border-black rounded focus:ring-oxford-blue-dark focus:border-oxford-blue-dark"
              />
              <input
                type="button"
                value="Search"
                className="px-4 py-2 text-white rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark"
              />
            </fieldset>
          </form>
          <form className="flex flex-row items-center h-full">
            <fieldset className="flex flex-row items-center flex-1 h-full space-x-2">
              <input
                type="button"
                value="Filters"
                onClick={handleOnClickButtonFilters}
                className="h-full px-4 py-2 text-white rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark"
              />
            </fieldset>
          </form>
        </div>
      </div>
      <div
        className={`border-b border-l border-r border-black p-2 ${
          !isUsingFilters && 'hidden'
        }`}
      >
        <form>
          <fieldset className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0">
              <div className="space-x-2 lg:space-x-4">
                <span>Title</span>
                <Select
                  instanceId="selectItemTitleTextMatchers"
                  options={textMatchers}
                  isClearable={false}
                  isSearchable={false}
                  className="inline-block min-w-[10rem]"
                />
              </div>
              <input
                type="text"
                placeholder="Title keywords..."
                className="flex-1 rounded"
              />
            </div>
            <div className="flex flex-row space-x-2 lg:items-center lg:space-x-4">
              <span>Is gradable</span>
              <input type="checkbox" name="chkIsGradable" />
            </div>
            <div className="space-y-2">
              <button className="block w-full p-2 text-white transition-colors rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark">
                Filter
              </button>
              <button className="block w-full p-2 text-white transition-colors rounded bg-vivid-burgundy hover:cursor-pointer hover:bg-oxford-blue-dark">
                Reset
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="p-2 space-y-6 border-b border-l border-r border-black rounded-b">
        {itemList.map((itemEntry, itemIndex) => (
          <div
            key={itemIndex}
            className="w-full px-2 py-4 transition transform border border-black rounded hover:translate-y-1 hover:cursor-pointer group"
          >
            <span className="flex flex-row items-center">
              <span className="inline-flex items-center max-w-xs px-2">
                <GenericItemIcon
                  width={50}
                  height={50}
                  className="inline-block"
                />
              </span>
              <div className="inline-flex flex-col justify-around flex-1 px-2 border-l border-black">
                <span className="text-xl font-bold text-left">
                  {itemEntry.title}
                </span>
                <span className="italic">
                  <span>Created:</span>{' '}
                  {itemEntry.creationDate.toLocaleDateString('en-CA')}{' '}
                  {itemEntry.creationDate.toLocaleTimeString('en-CA')}
                </span>
              </div>
              <span className="text-transparent group-hover:text-vivid-burgundy">
                &rarr;
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CampusHubCourseItemListingComplex

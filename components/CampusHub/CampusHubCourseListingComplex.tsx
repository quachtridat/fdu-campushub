import Link from 'next/link'
import { MouseEventHandler, useState } from 'react'
import Select from 'react-select'

import courseList from '@/data/courses/sample'

import { BookOpenIcon as GenericCourseIcon } from '@heroicons/react/solid'

const textMatchers: Array<{ value: string; label: string }> = [
  { value: 'contains', label: 'contains' },
  { value: 'matches', label: 'matches' },
]

type PropsType = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

const CampusHubCourseListingComplex: React.FC<PropsType> = ({
  className: otherClassName,
  children: _,
  ...otherProps
}) => {
  const [isUsingFilters, setIsUsingFilters] = useState(false)

  const handleOnClickButtonFilters: MouseEventHandler<HTMLInputElement> = () => {
    setIsUsingFilters(!isUsingFilters)
  }

  return (
    <div
      className={`border border-black rounded ${otherClassName}`}
      {...otherProps}
    >
      <div className="p-2 border-b border-black">
        <div className="flex flex-row items-center justify-between flex-1 space-x-4">
          <form className="flex flex-row items-center flex-1 h-full">
            <fieldset className="flex flex-row items-center flex-1 h-full space-x-2">
              <Select
                instanceId="selectCourseListingSearch"
                isClearable={true}
                options={courseList.map<{ label: string; value: string }>(
                  (courseEntry) => ({
                    value: courseEntry.courseId.toString(10),
                    label: `${courseEntry.courseCode} ${courseEntry.courseName}`,
                  })
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
        className={`border-b border-black p-2 ${!isUsingFilters && 'hidden'}`}
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
            <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0">
              <div className="space-x-2 lg:space-x-4">
                <span>Filter X</span>
                <Select
                  instanceId="selectFilterXTextMatchers"
                  options={textMatchers}
                  isClearable={false}
                  isSearchable={false}
                  className="inline-block min-w-[10rem]"
                />
              </div>
              <input
                type="text"
                placeholder="Filter X keywords..."
                className="flex-1 rounded"
              />
            </div>
            <input
              type="button"
              value="Filter"
              className="w-full p-2 text-white rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark"
            />
          </fieldset>
        </form>
      </div>
      <div className="p-2 space-y-6">
        {courseList.map((courseEntry, courseIndex) => (
          <div
            key={courseIndex}
            className="w-full px-2 py-4 transition transform border border-black rounded hover:translate-y-1 hover:cursor-pointer group"
          >
            <Link href={`/course/${courseEntry.courseId}`}>
              <a className="flex flex-row items-center">
                <span className="inline-flex items-center max-w-xs px-2">
                  <GenericCourseIcon
                    width={50}
                    height={50}
                    className="inline-block"
                  />
                </span>
                <div className="inline-flex flex-col justify-around flex-1 px-2 border-l border-black">
                  <span className="text-xl font-bold text-left">
                    {courseEntry.courseCode} {courseEntry.courseName}
                  </span>
                  <span className="italic">
                    <span>Instructors:</span> {courseEntry.instructors}
                  </span>
                </div>
                <span className="text-transparent group-hover:text-vivid-burgundy">
                  &rarr;
                </span>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CampusHubCourseListingComplex

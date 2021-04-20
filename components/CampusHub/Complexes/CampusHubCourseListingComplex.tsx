import Link from 'next/link'
import { MouseEventHandler, useEffect, useState } from 'react'
import Select, { createFilter } from 'react-select'

import Course from '@/interfaces/course'
import SearchBar from '@/components/CampusHub/Standalones/SearchBars/CampusHubSearchBar'
import { basicTextMatchers } from '@/globals/match-options/text-matchers'
import { BasicSearchOption } from '@/interfaces/search-options'
import { BookOpenIcon as GenericCourseIcon } from '@heroicons/react/solid'

const textMatchers: Array<BasicSearchOption> = basicTextMatchers.map(
  (entry) => ({
    value: entry,
    label: entry,
  })
)

interface Props extends React.ComponentProps<'div'> {
  courses: Array<Course>
}

const CampusHubCourseListingComplex: React.VFC<Props> = ({
  courses,
  children: _,
  ...otherProps
}) => {
  const [isUsingFilters, setIsUsingFilters] = useState(false)

  const handleOnClickButtonFilters: MouseEventHandler = () => {
    setIsUsingFilters(!isUsingFilters)
  }

  const [filteredCourses, setFilteredCourses] = useState<Array<Course>>([])
  const [
    courseCodeMatcher,
    setCourseCodeMatcher,
  ] = useState<BasicSearchOption>()
  const [
    courseNameMatcher,
    setCourseNameMatcher,
  ] = useState<BasicSearchOption>()
  const [courseCodeKeywords, setCourseCodeKeywords] = useState<string>('')
  const [courseNameKeywords, setCourseNameKeywords] = useState<string>('')

  useEffect(() => {
    if (courses) setFilteredCourses(courses)
  }, courses)

  const handleOnClickButtonFilter: MouseEventHandler = (e) => {
    e.preventDefault()
    if (courses)
      setFilteredCourses(
        courses.filter((course) => {
          if (courseCodeKeywords && courseCodeMatcher) {
            if (
              (courseCodeMatcher.value === 'contains' &&
                !course.courseCode.includes(courseCodeKeywords)) ||
              (courseCodeMatcher.value === 'matches' &&
                course.courseCode !== courseCodeKeywords)
            ) {
              return undefined
            }
          }
          if (courseNameKeywords && courseNameMatcher) {
            if (
              (courseNameMatcher.value === 'contains' &&
                !course.courseName.includes(courseNameKeywords)) ||
              (courseNameMatcher.value === 'matches' &&
                course.courseName !== courseNameKeywords)
            ) {
              return undefined
            }
          }
          return course
        })
      )
  }

  const handleOnClickButtonReset: MouseEventHandler = (e) => {
    e.preventDefault()
    if (courses) setFilteredCourses(courses)
    setCourseCodeKeywords('')
    setCourseNameKeywords('')
    setCourseCodeMatcher(undefined)
    setCourseNameMatcher(undefined)
  }

  return (
    <div {...otherProps}>
      <div className="p-2 border-b border-l border-r border-black">
        <div className="flex flex-row items-center justify-between flex-1 space-x-4">
          <form className="flex flex-row items-center flex-1 h-full">
            <fieldset className="flex flex-row items-center flex-1 h-full space-x-2">
              <SearchBar
                instanceId="selectCourseListingSearch"
                placeholder="Search"
                isClearable={true}
                filterOption={createFilter({
                  ignoreAccents: true,
                  ignoreCase: true,
                  matchFrom: 'any',
                  trim: true,
                })}
                options={courses.map((courseEntry) => ({
                  value: courseEntry.courseId.toString(10),
                  label: `${courseEntry.courseCode} ${courseEntry.courseName}`,
                  link: `/course/${courseEntry.courseId}/`,
                }))}
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
                <span>Course Code</span>
                <Select
                  instanceId="selectCourseCodeTextMatchers"
                  options={textMatchers}
                  isClearable={false}
                  isSearchable={false}
                  value={courseCodeMatcher || null}
                  onChange={(opt) => opt && setCourseCodeMatcher(opt)}
                  className="inline-block min-w-[10rem]"
                />
              </div>
              <input
                type="text"
                placeholder="Course code keywords..."
                value={courseCodeKeywords}
                onChange={(e) => setCourseCodeKeywords(e.target.value)}
                className="flex-1 rounded"
              />
            </div>
            <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-x-4 lg:space-y-0">
              <div className="space-x-2 lg:space-x-4">
                <span>Course Name</span>
                <Select
                  instanceId="selectCourseNameTextMatchers"
                  options={textMatchers}
                  isClearable={false}
                  isSearchable={false}
                  value={courseNameMatcher || null}
                  onChange={(opt) => opt && setCourseNameMatcher(opt)}
                  className="inline-block min-w-[10rem]"
                />
              </div>
              <input
                type="text"
                placeholder="Course name keywords..."
                value={courseNameKeywords}
                onChange={(e) => setCourseNameKeywords(e.target.value)}
                className="flex-1 rounded"
              />
            </div>
            <div className="space-y-2">
              <button
                onClick={handleOnClickButtonFilter}
                className="block w-full p-2 text-white transition-colors rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark"
              >
                Filter
              </button>
              <button
                onClick={handleOnClickButtonReset}
                className="block w-full p-2 text-white transition-colors rounded bg-vivid-burgundy hover:cursor-pointer hover:bg-oxford-blue-dark"
              >
                Reset
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="p-2 space-y-6 border-b border-l border-r border-black rounded-b">
        {filteredCourses.map((courseEntry, courseIndex) => (
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

import { BookOpenIcon } from '@heroicons/react/solid';
import { MouseEventHandler, useState } from 'react';
import Select from 'react-select';

const textMatchers: Array<{ value: string, label: string}> = [
  { value: 'contains', label: 'contains' },
  { value: 'matches', label: 'matches' },
];

const courseList: Array<{ courseCode: string, courseName: string, instructors: string }> = [
  {
    courseCode: 'FIN-3250-61',
    courseName: 'Principles of Financial Analysis',
    instructors: 'David Goldberg; Yan Yan'
  },
  {
    courseCode: 'INFO-2101-V1',
    courseName: 'Computer Programming for Information Technology',
    instructors: 'Vasudevan Janarthanan'
  },
  {
    courseCode: 'INFO-3201-V1',
    courseName: 'Human Computer Interface',
    instructors: 'Yin Maung'
  },
  {
    courseCode: 'INFO-4102-V1',
    courseName: 'Data Communication and Computer Networks II',
    instructors: 'Sourav Mukherjee'
  },
];

type PropsType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const CampusHubCourseListingComplex: React.FC<PropsType> = ({ children: _, ...otherProps }) => {
  const [isUsingFilters, setIsUsingFilters] = useState(false);

  const handleOnClickButtonFilters: MouseEventHandler<HTMLInputElement> = () => {
    setIsUsingFilters(!isUsingFilters);
  }

  return (
    <div {...otherProps} className="border border-black rounded">
      <div className="p-2 border-b border-black">
        <div className="flex flex-row items-center justify-between flex-1 space-x-4">
          <form className="flex flex-row items-center flex-1 h-full">
            <fieldset className="flex flex-row items-center flex-1 h-full space-x-2">
              <input type="text" id="txtNavBarSearch" name="txtNavBarSearch" placeholder="Search" className="flex-1 rounded focus:ring-oxford-blue-dark focus:border-oxford-blue-dark" />
              <input type="button" value="Search" className="px-4 py-2 text-white rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark" />
            </fieldset>
          </form>
          <form className="flex flex-row items-center h-full">
            <fieldset className="flex flex-row items-center flex-1 h-full space-x-2">
              <input type="button" value="Filters" onClick={handleOnClickButtonFilters} className="h-full px-4 py-2 text-white rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark" />
            </fieldset>
          </form>
        </div>
      </div>
      <div className={`border-b border-black p-2 ${!isUsingFilters && 'hidden'}`}>
        <form>
          <fieldset className="flex flex-col space-y-6">
            <div className="flex flex-row items-center space-x-4">
              <span className="w-40">Course code</span>
              <Select instanceId='selectCourseCodeTextMatchers' options={textMatchers} isClearable={false} isSearchable={false} className="inline-block min-w-[10rem]" />
              <input type="text" placeholder="Keywords" className="flex-1 rounded" />
            </div>
            <div className="flex flex-row items-center space-x-4">
              <span className="w-40">Course name</span>
              <Select instanceId='selectCourseNameTextMatchers' options={textMatchers} isClearable={false} isSearchable={false} className="inline-block min-w-[10rem]" />
              <input type="text" placeholder="Keywords" className="flex-1 rounded" />
            </div>
            <div className="flex flex-row items-center space-x-4">
              <span className="w-40">Filter X</span>
              <Select instanceId='selectFilterXTextMatchers' options={textMatchers} isClearable={false} isSearchable={false} className="inline-block min-w-[10rem]" />
              <input type="text" placeholder="Keywords" className="flex-1 rounded" />
            </div>
            <input type="button" value="Filter" className="w-full p-2 text-white rounded bg-oxford-blue-light hover:cursor-pointer hover:bg-oxford-blue-dark" />
          </fieldset>
        </form>
      </div>
      <div className="p-2 space-y-6">
        {
          courseList.map((courseEntry, courseIndex) => (
            <div key={courseIndex} className="flex flex-row items-center w-full px-2 py-4 transition transform border border-black rounded hover:translate-y-1 hover:cursor-pointer group">
              <span className="inline-flex items-center max-w-xs px-2">
                <BookOpenIcon width={50} height={50} className="inline-block" />
              </span>
              <div className="inline-flex flex-col justify-around flex-1 px-2 border-l border-black">
                <span className="text-xl font-bold text-left">{courseEntry.courseCode} {courseEntry.courseName}</span>
                <span className="italic"><span>Instructors:</span> {courseEntry.instructors}</span>
              </div>
              <span className="text-transparent group-hover:text-vivid-burgundy">&rarr;</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default CampusHubCourseListingComplex;
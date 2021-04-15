import Head from 'next/head'
import Calendar from 'react-calendar'

import type { ToolTile } from '@/components/CampusHub/CampusHubVerticalToolBar'
import CampusHubVerticalToolBar from '@/components/CampusHub/CampusHubVerticalToolBar'
import CampusHubLayout from '@/components/CampusHub/CampusHubLayout'
import CampusHubCourseListingComplex from '@/components/CampusHub/CampusHubCourseListingComplex'
import AnnouncementData from '@/data/announcements/sample'

import {
  HomeIcon as HomeNavIcon,
  AcademicCapIcon as CoursesNavIcon,
  ClipboardIcon as AnnouncementsNavIcon,
  ChartSquareBarIcon as GradesNavIcon,
  IdentificationIcon as StudentServicesNavIcon,
  CubeIcon as BlackboardNavIcon,
  CalendarIcon,
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon
} from '@heroicons/react/outline'

const tiles: Array<ToolTile> = [
  { key: 'homepage', name: 'Home', icon: <HomeNavIcon />, link: '/' },
  { key: 'courses', name: 'Courses', icon: <CoursesNavIcon /> },
  {
    key: 'announcements',
    name: 'Announcements',
    icon: <AnnouncementsNavIcon />,
  },
  {
    key: 'grades',
    name: 'Grades',
    icon: <GradesNavIcon />,
  },
  {
    key: 'calendar',
    name: 'Calendar',
    icon: <CalendarIcon />,
  },
  {
    key: 'student-services',
    name: 'Student Services',
    icon: <StudentServicesNavIcon />,
  },
  { key: 'blackboard', name: 'Blackboard', icon: <BlackboardNavIcon /> },
]

const addSearchOptions: Array<{ value: string; label: string }> = [
  {
    value: 'homepage',
    label: 'Home',
  },
  {
    value: 'courses',
    label: 'Courses',
  },
  {
    value: 'announcements',
    label: 'Announcements',
  },
  {
    value: 'grades',
    label: 'Grades',
  },
  {
    value: 'calendar',
    label: 'Calendar',
  },
  {
    value: 'student-services',
    label: 'Student Services',
  },
  {
    value: 'blackboard',
    label: 'Blackboard',
  },
]

const announcement = AnnouncementData[0]

const CoursesPage: React.FC = () => {
  return (
    <CampusHubLayout
      navDefinedSearchOptions={addSearchOptions}
      footerClassName="pl-40"
    >
      <Head>
        <title>FDU CampusHub</title>
      </Head>
      <div className="flex flex-row flex-1 pl-40 pt-[4rem]">
        <CampusHubVerticalToolBar
          tiles={tiles}
          activeTileKey="courses"
          className="fixed top-[4rem] z-50 left-0 w-40 h-full max-h-full bg-oxford-blue-dark"
        />
        <main className="flex flex-row flex-1">
          <div className="flex flex-col flex-1 w-full p-8 space-y-12">
            <div className="w-full mx-auto">
              <h1 className="w-full p-2 text-4xl text-center text-white transition-colors border border-black rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark">
                Course Listing
              </h1>
              <hr />
              <CampusHubCourseListingComplex className="border-t-0 border-b border-l border-r rounded-t-none rounded-b" />
            </div>
          </div>
          <div className="flex-col items-center hidden w-full max-w-md p-8 space-y-12 lg:flex lg:max-w-lg bg-gray-50">
            <div className="w-full">
              <span className="block w-full p-2 text-4xl text-center text-white transition-colors border-t border-l border-r border-black rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark">
                Calendar
              </span>
              <div className="w-full">
                <Calendar
                  locale="en-US"
                  className="w-full border-0 border-b border-l border-r border-black rounded-b"
                />
              </div>
            </div>
            <div className="w-full">
              <span className="flex flex-row items-center justify-between w-full p-2 text-4xl text-white transition-colors border-t border-l border-r border-black rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark">
                <ArrowCircleLeftIcon height="1em" className="shadow hover:cursor-pointer" />
                <span>Announcements</span>
                <ArrowCircleRightIcon height="1em" className="shadow hover:cursor-pointer" />
              </span>
              <div className="flex flex-col flex-1 w-full max-h-full p-2 space-y-1 bg-white border-b border-l border-r border-black rounded-b">
                <span className="font-bold border-b border-black">
                  {announcement.title}
                </span>
                <span className="border-b border-black">
                  {announcement.announcer}{' '}
                  {announcement.target ? <>&rarr; {announcement.target}</> : ''}
                </span>
                <span className="border-b border-black">
                  {announcement.date}
                </span>
                <p className="w-100 h-100">{announcement.content}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CampusHubLayout>
  )
}

export default CoursesPage

import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Calendar from 'react-calendar'

import type { ToolTile } from '@/components/CampusHub/CampusHubVerticalToolBar'
import CampusHubVerticalToolBar from '@/components/CampusHub/CampusHubVerticalToolBar'
import CampusHubLayout from '@/components/CampusHub/CampusHubLayout'
import CampusHubCourseListingComplex from '@/components/CampusHub/CampusHubCourseListingComplex'
import AnnouncementData from '@/data/announcements/sample'
import { basicConvert, convertGradePoints } from '@/lib/grades'

import {
  HomeIcon as HomeNavIcon,
  AcademicCapIcon as CoursesNavIcon,
  ClipboardIcon as AnnouncementsNavIcon,
  ChartSquareBarIcon as GradesNavIcon,
  IdentificationIcon as StudentServicesNavIcon,
  CubeIcon as BlackboardNavIcon,
  CalendarIcon as CalendarNavIcon,
  ArrowCircleLeftIcon as ArrowCircleLeftNavIcon,
  ArrowCircleRightIcon as ArrowCircleRightNavIcon
} from '@heroicons/react/outline'

const tiles: Array<ToolTile> = [
  { key: 'homepage', name: 'Home', icon: <HomeNavIcon /> },
  {
    key: 'courses',
    name: 'Courses',
    icon: <CoursesNavIcon />,
    link: '/courses',
  },
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
    icon: <CalendarNavIcon />,
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

interface Grade {
  courseCode: string
  courseName: string
  itemName: string
  grade: number | string
}

const recentGradeUpdates: Array<Grade> = [
  {
    courseCode: 'INFO-3201-V1',
    courseName: 'Human Computer Interface',
    itemName: 'Persona',
    grade: `5/5 (${convertGradePoints(5, 5, basicConvert)})`,
  },
  {
    courseCode: 'INFO-3201-V1',
    courseName: 'Human Computer Interface',
    itemName: 'Research Report',
    grade: `25/25 (${convertGradePoints(25, 25, basicConvert)})`,
  },
  {
    courseCode: 'INFO-3201-V1',
    courseName: 'Human Computer Interface',
    itemName: 'Design Brief',
    grade: `7/10 (${convertGradePoints(7, 10, basicConvert)})`,
  },
]

const announcement = AnnouncementData[0]

const MainPage: NextPage = () => {
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
          activeTileKey="homepage"
          className="fixed top-[4rem] z-50 left-0 w-40 h-full max-h-full bg-oxford-blue-dark"
        />
        <main className="flex flex-row flex-1">
          <div className="flex flex-col flex-1 w-full p-8 space-y-12">
            <div>
              <h1 className="w-full p-2 text-4xl text-center text-white transition-colors border border-black rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark">
                Student Profile
              </h1>
              <hr />
              <div className="flex flex-row px-4 py-2 space-x-8 border-b border-l border-r border-black max-h-48 rounded-b-xl">
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
                    <span className="font-bold">Major:</span> Information
                    Technology
                  </span>
                  <span>
                    <span className="font-bold">Minor:</span> Business
                    Administration
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full max-w-3xl mx-auto">
              <h1 className="w-full p-2 text-4xl text-center text-white transition-colors border-t border-l border-r border-black rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark">
                Recently Updated Grades
              </h1>
              <hr />
              <div className="w-full border-b border-l border-r border-black rounded-b">
                {recentGradeUpdates.map((entry, entryIdx) => (
                  <div
                    key={entryIdx}
                    className="flex flex-row justify-between flex-1 p-2 space-x-4 bg-white border-b border-black border-solid hover:bg-gray-50"
                  >
                    <span className="space-x-2">
                      <span>{entry.courseCode}</span>
                      <span>&rarr;</span>
                      <span>{entry.courseName}</span>
                      <span>&rarr;</span>
                      <span>{entry.itemName}</span>
                    </span>
                    <span className="w-20 font-bold text-center">
                      {entry.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full mx-auto">
              <h1 className="w-full p-2 text-4xl text-center text-white transition-colors border-t border-l border-r border-black rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark">
                Course Listing
              </h1>
              <hr />
              <CampusHubCourseListingComplex className="border-t-0 border-b border-l border-r rounded-t-none rounded-b" />
            </div>
          </div>
          <div className="flex-col items-center hidden w-full max-w-md p-8 space-y-12 lg:flex xl:max-w-md 2xl:max-w-lg bg-gray-50">
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
                <ArrowCircleLeftNavIcon height="1em" className="shadow hover:cursor-pointer" />
                <span>Announcements</span>
                <ArrowCircleRightNavIcon height="1em" className="shadow hover:cursor-pointer" />
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

export default MainPage

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
  IdentificationIcon as StudentServicesNavIcon,
  CubeIcon as BlackboardNavIcon,
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
    key: 'student-services',
    name: 'Student Services',
    icon: <StudentServicesNavIcon />,
  },
  { key: 'blackboard', name: 'Blackboard', icon: <BlackboardNavIcon /> },
]

const announcement = AnnouncementData[0]

const CoursesPage: React.FC = () => {
  return (
    <CampusHubLayout>
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
              <CampusHubCourseListingComplex />
            </div>
          </div>
          <div className="flex flex-col items-center w-full max-w-md p-8 space-y-12 lg:max-w-lg bg-gray-50">
            <div className="w-full p-1">
              <span className="block w-full p-2 text-4xl text-center text-white transition-colors border rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark">
                Calendar
              </span>
              <div className="w-full">
                <Calendar locale="en-US" className="w-full" />
              </div>
            </div>
            <div className="w-full p-1">
              <span className="flex flex-row justify-between w-full p-2 text-4xl text-center text-white transition-colors border rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark">
                <span className="shadow hover:cursor-pointer">&larr;</span>
                <span>Announcements</span>
                <span className="shadow hover:cursor-pointer">&rarr;</span>
              </span>
              <div className="flex flex-col flex-1 w-full max-h-full p-2 space-y-1 bg-white border border-black border-solid rounded">
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

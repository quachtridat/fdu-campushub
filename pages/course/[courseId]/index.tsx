import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'node:querystring'

import Calendar from 'react-calendar'
import CampusHubVerticalToolBar, {
  ToolTile,
} from '@/components/CampusHub/CampusHubVerticalToolBar'
import CampusHubLayout from '@/components/CampusHub/CampusHubLayout'
import CampusHubCourseItemListingComplex from '@/components/CampusHub/CampusHubCourseItemListingComplex'

import Announcement from '@/interfaces/announcement'
import Course from '@/interfaces/course'
import sampleAnnoucements from '@/data/announcements/sample'
import sampleCourses from '@/data/courses/sample'

import {
  TemplateIcon as OverviewNavIcon,
  ClipboardIcon as AnnoucementsNavIcon,
  DocumentTextIcon as DocumentsNavIcon,
  PuzzleIcon as AssignmentsNavIcon,
  ChatAlt2Icon as DiscussionsNavIcon,
  ChartSquareBarIcon as GradesIcon,
  HomeIcon as HomeNavIcon,
  CalendarIcon,
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon
} from '@heroicons/react/outline'

interface Props {
  course: Course
}

export interface RouterQuery extends ParsedUrlQuery {
  courseId: string
}

const tiles: Array<ToolTile> = [
  { key: 'homepage', name: 'Home', icon: <HomeNavIcon />, link: '/' },
  { key: 'course.overview', name: 'Course Overview', icon: <OverviewNavIcon /> },
  {
    key: 'course.announcements',
    name: 'Announcements',
    icon: <AnnoucementsNavIcon />,
  },
  { key: 'course.documents', name: 'Documents', icon: <DocumentsNavIcon /> },
  { key: 'course.assignments', name: 'Assignments', icon: <AssignmentsNavIcon /> },
  { key: 'course.discussions', name: 'Discussions', icon: <DiscussionsNavIcon /> },
  { key: 'course.grades', name: 'Grades', icon: <GradesIcon /> },
  { key: 'course.calendar', name: 'Calendar', icon: <CalendarIcon /> },
]

const announcement: Announcement = sampleAnnoucements[0]

export const getStaticPaths: GetStaticPaths<RouterQuery> = async () => {
  return {
    fallback: true,
    paths: [],
  }
}

export const getStaticProps: GetStaticProps<Props, RouterQuery> = async (
  ctx
) => {
  if (!ctx.params)
    return {
      notFound: true,
    }

  const params = ctx.params
  const courseId = Number.parseInt(params.courseId)

  if (!courseId || isNaN(courseId))
    return {
      notFound: true,
    }

  const matchingCourse = sampleCourses.find(
    (course) => course.courseId === courseId
  )
  if (!matchingCourse)
    return {
      notFound: true,
    }

  return {
    props: {
      course: matchingCourse,
    },
  }
}

const navAddSearchOptions: Array<{ value: string; label: string }> = [
  { value: 'course.overview', label: 'Course Overview' },
  { value: 'course.announcements', label: 'Announcements' },
  { value: 'course.documents', label: 'Documents' },
  { value: 'course.assignments', label: 'Assignments' },
  { value: 'course.discussions', label: 'Discussions' },
  { value: 'course.grades', label: 'Grades', },
  { value: 'course.calendar', label: 'Calendar' },
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

export const CoursePage: NextPage<Props> = ({ course: currentCourse }) => {
  const router = useRouter()

  return (
    <CampusHubLayout
      navDefinedSearchOptions={navAddSearchOptions}
      footerClassName="pl-40"
    >
      <Head>
        <title>FDU CampusHub</title>
      </Head>
      <div className="flex flex-row flex-1 pl-40 pt-[4rem]">
        <CampusHubVerticalToolBar
          tiles={tiles && currentCourse ? tiles.map<ToolTile>((tile) => tile.key === 'course.grades' ? { ...tile, link: `/course/${currentCourse.courseId}/grades` } : tile) : tiles}
          activeTileKey="course.overview"
          className="fixed top-[4rem] z-50 left-0 w-40 h-full max-h-full bg-oxford-blue-dark"
        />
        <main className="flex flex-row flex-1">
          <div className="flex flex-col flex-1 w-full p-8 space-y-12">
            {router.isFallback ? (
              <span className="text-4xl">
                Please wait.
                <br />
                Loading...
              </span>
            ) : (
              <>
                <div>
                  <h1 className="w-full p-2 text-4xl text-center text-white transition-colors border border-black rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark">
                    Course Information
                  </h1>
                  <div className="flex flex-row px-4 py-2 space-x-8 border border-black max-h-48 rounded-b-xl">
                    <div className="flex flex-col justify-around flex-1">
                      <span>
                        <span className="font-bold">Course Code:</span>{' '}
                        {currentCourse.courseCode}
                      </span>
                      <span>
                        <span className="font-bold">Course Name:</span>{' '}
                        {currentCourse.courseName}
                      </span>
                      <span>
                        <span className="font-bold">Instructors:</span>{' '}
                        {currentCourse.instructors}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full mx-auto">
                  <h1 className="w-full p-2 text-4xl text-center text-white transition-colors border-t border-l border-r border-black rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark">
                    Course Items
                  </h1>
                  <CampusHubCourseItemListingComplex className="border-t-0 border-b border-l border-r rounded-t-none rounded-b" />
                </div>
              </>
            )}
          </div>
          <div className="flex-col items-center hidden w-full max-w-md p-8 space-y-12 lg:flex xl:max-w-md 2xl:max-w-lg bg-gray-50">
            <div className="w-full p-1">
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
            <div className="w-full p-1">
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

export default CoursePage

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
} from '@heroicons/react/outline'

interface Props {
  course: Course
}

export interface RouterQuery extends ParsedUrlQuery {
  courseId: string
}

const tiles: Array<ToolTile> = [
  { key: 'overview', name: 'Overview', icon: <OverviewNavIcon /> },
  {
    key: 'announcements',
    name: 'Announcements',
    icon: <AnnoucementsNavIcon />,
  },
  { key: 'documents', name: 'Documents', icon: <DocumentsNavIcon /> },
  { key: 'assignments', name: 'Assignments', icon: <AssignmentsNavIcon /> },
  { key: 'discussions', name: 'Discussions', icon: <DiscussionsNavIcon /> },
  { key: 'grades', name: 'Grades', icon: <GradesIcon /> },
  { key: 'homepage', name: 'Home', icon: <HomeNavIcon />, link: '/' },
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
  { value: 'course.overview', label: 'Overview' },
  { value: 'course.announcements', label: 'Announcements' },
  { value: 'course.documents', label: 'Documents' },
  { value: 'course.assignments', label: 'Assignments' },
  { value: 'course.discussions', label: 'Discussions' },
  { value: 'course.grades', label: 'Grades' },
  { value: 'course.homepage', label: 'Home' },
]

export const CoursePage: NextPage<Props> = ({ course: currentCourse }) => {
  const router = useRouter()
  if (currentCourse) {
    const gradesTile = tiles.find((tile) => tile.key === 'grades')
    if (gradesTile) gradesTile.link = `/course/${currentCourse.courseId}/grades`
  }
  return (
    <CampusHubLayout navDefinedSearchOptions={navAddSearchOptions}>
      <Head>
        <title>FDU CampusHub</title>
      </Head>
      <div className="flex flex-row flex-1 pl-40 pt-[4rem]">
        <CampusHubVerticalToolBar
          tiles={tiles}
          activeTileKey="overview"
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
                  <CampusHubCourseItemListingComplex />
                </div>
              </>
            )}
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

export default CoursePage

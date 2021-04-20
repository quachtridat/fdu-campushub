import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'node:querystring'

import Calendar from 'react-calendar'
import CampusHubVerticalToolBar from '@/components/CampusHub/Standalones/Sidebars/CampusHubVerticalToolBar'
import CampusHubLayout from '@/components/CampusHub/Layouts/CampusHubLayout'
import CampusHubCourseItemListingComplex from '@/components/CampusHub/Complexes/CampusHubCourseItemListingComplex'
import AnnouncementsBlock from '@/components/CampusHub/Blocks/CampusHubGenericBasicAnnouncementsBlock'

import Announcement from '@/interfaces/announcement'
import Course from '@/interfaces/course'
import sampleCourses from '@/data/courses/sample'
import { getAnnouncementsHtml } from '@/lib/announcements'
import toolTiles from '@/globals/tooltiles/coursepages.tooltiles'
import { optionGroups as mainSearchOptions } from '@/globals/search-options/mainpages.options'
import { optionGroups as courseSearchOptions } from '@/globals/search-options/coursepages.options'

interface Props {
  course: Course
  announcements: Array<Announcement>
}

export interface RouterQuery extends ParsedUrlQuery {
  courseId: string
}

export const CoursePage: NextPage<Props> = ({
  course: currentCourse,
  announcements,
}) => {
  const router = useRouter()

  return (
    <CampusHubLayout
      navDefinedSearchOptions={[
        ...((currentCourse && courseSearchOptions(currentCourse.courseId)) ||
          []),
        ...mainSearchOptions,
      ]}
      footerClassName="pl-40"
    >
      <Head>
        <title>FDU CampusHub</title>
      </Head>
      <div className="flex flex-row flex-1 pl-40 pt-[4rem]">
        <CampusHubVerticalToolBar
          tiles={(currentCourse && toolTiles(currentCourse.courseId)) || []}
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
            <AnnouncementsBlock
              announcements={announcements}
              className="w-full"
            />
          </div>
        </main>
      </div>
    </CampusHubLayout>
  )
}

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
      announcements: (
        await getAnnouncementsHtml({
          metaPredicate: (meta) =>
            meta.target
              ? meta.target.find(
                  (elem) => elem.courseId == matchingCourse.courseId
                )
                ? true
                : false
              : false,
        })
      ).map((announcement) => ({
        ...announcement,
        postDate: announcement.postDate
          ? typeof announcement.postDate === 'string'
            ? announcement.postDate
            : announcement.postDate.toLocaleString()
          : 'No Date',
      })),
    },
  }
}

export default CoursePage

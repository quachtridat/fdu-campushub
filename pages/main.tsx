import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Calendar from 'react-calendar'

import CampusHubVerticalToolBar from '@/components/CampusHub/Standalones/Sidebars/CampusHubVerticalToolBar'
import Layout from '@/components/CampusHub/Layouts/CampusHubLayout'
import GenericComplexLayout from '@/components/CampusHub/Complexes/CampusHubGenericComplexLayout'
import CourseListingBlock from '@/components/CampusHub/Blocks/CampusHubGenericBasicCourseListingBlock'
import StudentProfileBasicComplex from '@/components/CampusHub/Complexes/CampusHubStudentProfileBasicComplex'
import AnnouncementsBlock from '@/components/CampusHub/Blocks/CampusHubGenericBasicAnnouncementsBlock'
import Course from '@/interfaces/course'
import Announcement from '@/interfaces/announcement'
import { getAnnouncementsHtml } from '@/lib/announcements'
import { basicConvert, convertGradePoints } from '@/lib/grades'
import tiles from '@/globals/tooltiles/mainpages.tooltiles'
import { optionGroups as searchOptions } from '@/globals/search-options/mainpages.options'
import sampleCourses from '@/data/courses/sample'

interface Props {
  courses: Array<Course>
  announcements: Array<Announcement>
}

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

const MainPage: NextPage<Props> = ({ courses, announcements }) => {
  return (
    <Layout navDefinedSearchOptions={searchOptions} footerClassName="pl-40">
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
            <GenericComplexLayout
              headCenter="Student Profile"
              className="w-full mx-auto"
            >
              <StudentProfileBasicComplex />
            </GenericComplexLayout>
            <GenericComplexLayout
              headCenter="Recently Updated Grades"
              className="w-full max-w-3xl mx-auto"
            >
              <div className="w-full border-b border-l border-r border-black rounded-b">
                {recentGradeUpdates.map((entry, entryIdx) => (
                  <div
                    key={entryIdx}
                    className="flex flex-row justify-between flex-1 p-2 space-x-4 bg-white border-t border-black border-solid hover:bg-gray-50"
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
            </GenericComplexLayout>
            <CourseListingBlock courses={courses} className="w-full mx-auto" />
          </div>
          <div className="flex-col items-center hidden w-full max-w-md p-8 space-y-12 lg:flex lg:max-w-lg bg-gray-50">
            <GenericComplexLayout headCenter="Calendar" className="w-full">
              <Calendar
                locale="en-US"
                className="w-full border-0 border-b border-l border-r border-black rounded-b"
              />
            </GenericComplexLayout>
            <AnnouncementsBlock announcements={announcements} />
          </div>
        </main>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      courses: sampleCourses,
      announcements: (await getAnnouncementsHtml()).map((announcement) => ({
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

export default MainPage

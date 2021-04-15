import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'node:querystring'
import { useState, useEffect, MouseEventHandler } from 'react'
import ReactModal from 'react-modal';

import CampusHubVerticalToolBar, {
  ToolTile,
} from '@/components/CampusHub/CampusHubVerticalToolBar'
import CampusHubLayout from '@/components/CampusHub/CampusHubLayout'

import Course from '@/interfaces/course'
import Grade from '@/interfaces/grade'
import sampleCourses from '@/data/courses/sample'
import { getCourseGrades } from '@/lib/grades'
import { convertGradePoints, basicConvert } from '@/lib/grades'

import {
  TemplateIcon as OverviewNavIcon,
  ClipboardIcon as AnnoucementsNavIcon,
  DocumentTextIcon as DocumentsNavIcon,
  PuzzleIcon as AssignmentsNavIcon,
  ChatAlt2Icon as DiscussionsNavIcon,
  ChartSquareBarIcon as GradesIcon,
  HomeIcon as HomeNavIcon,
  CalendarIcon,
  XIcon as CloseIcon
} from '@heroicons/react/outline'

import {
  DocumentReportIcon as GenericGradeIcon,
  FilterIcon,
  MenuAlt2Icon,
} from '@heroicons/react/solid'

interface Props {
  course: Course
}

export interface RouterQuery extends ParsedUrlQuery {
  courseId: string
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
    },
  }
}

const navAddSearchOptions: Array<{ value: string; label: string }> = [
  { value: 'course.overview', label: 'Course Overview' },
  { value: 'course.announcements', label: 'Announcements' },
  { value: 'course.documents', label: 'Documents' },
  { value: 'course.assignments', label: 'Assignments' },
  { value: 'course.discussions', label: 'Discussions' },
  { value: 'course.grades', label: 'Grades' },
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
  { key: 'course.discusisons', name: 'Discussions', icon: <DiscussionsNavIcon /> },
  { key: 'course.grades', name: 'Grades', icon: <GradesIcon /> },
  { key: 'course.calendar', name: 'Calendar', icon: <CalendarIcon /> },
]

export const CourseGradesPage: NextPage<Props> = ({
  course: currentCourse,
}) => {
  const router = useRouter()

  const [grades, setGrades] = useState<Array<Grade>>([])

  useEffect(() => {
    if (currentCourse) setGrades(getCourseGrades(currentCourse.courseId))
  }, [currentCourse])

  const [activeGradeEntryIndex, setActiveGradeEntryIndex] = useState(-1)
  const [activeGradeEntry, setActiveGradeEntry] = useState<Grade>()
  const [shallUseModal, setShallUseModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024/*lg*/) {
      setShallUseModal(true);
    } else setShallUseModal(false);
  })

  const handleOnClickGradeEntry: (
    gradeEntryKey: number,
    gradeEntry: Grade
  ) => MouseEventHandler<HTMLDivElement> = (gradeEntryKey, gradeEntry) => {
    return () => {
      setActiveGradeEntryIndex(gradeEntryKey)
      setActiveGradeEntry(gradeEntry)
      if (shallUseModal) {
        setIsModalOpen(true);
      }
    }
  }

  const handleOnRequestCloseReactModal = (): void => {
    setIsModalOpen(false)
  }

  return (
    <CampusHubLayout navDefinedSearchOptions={navAddSearchOptions}>
      <Head>
        <title>FDU CampusHub</title>
      </Head>
      <div className="flex flex-row flex-1 pl-40 pt-[4rem]">
        <CampusHubVerticalToolBar
          tiles={tiles && currentCourse ? tiles.map<ToolTile>((tile) => tile.key === 'course.overview' ? { ...tile, link: `/course/${currentCourse.courseId}/` } : tile) : tiles}
          activeTileKey="course.grades"
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
                  <span className="flex flex-row justify-between w-full p-2 text-4xl text-white transition-colors border-t border-l border-r border-black rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark">
                    <span className="h-full shadow hover:cursor-pointer">
                      <FilterIcon className="h-full" />
                    </span>
                    <span>Grades</span>
                    <span className="h-full shadow hover:cursor-pointer">
                      <MenuAlt2Icon className="h-full" />
                    </span>
                  </span>
                  <div className="p-2 space-y-6 border-b border-l border-r border-black rounded-b-xl">
                    {grades ? (
                      grades.length > 0 ? (
                        grades.map((gradeEntry, gradeIndex) => (
                          <div
                            key={gradeIndex}
                            onClick={handleOnClickGradeEntry(
                              gradeIndex,
                              gradeEntry
                            )}
                            className={`flex flex-col w-full px-2 py-4 space-y-2 transition transform border border-black rounded hover:translate-y-1 hover:cursor-pointer ${
                              activeGradeEntryIndex == gradeIndex
                                ? 'ring ring-vivid-burgundy'
                                : ''
                            } group`}
                          >
                            <span className="flex flex-row items-center justify-between">
                              <span className="inline-flex items-center max-w-xs px-2">
                                <GenericGradeIcon
                                  width={50}
                                  height={50}
                                  className="inline-block"
                                />
                              </span>
                              <div className="inline-flex flex-col justify-around flex-1 px-2 border-l border-black">
                                <span className="text-xl font-bold text-left">
                                  {gradeEntry.item.title}
                                </span>
                                <span className="italic">
                                  <span>Due:</span>{' '}
                                  {gradeEntry.gradable.dueDate.toDateString()}
                                </span>
                              </div>
                              <span className="flex flex-col items-center justify-center w-20">
                                <span className="text-lg text-bold">
                                  {convertGradePoints(
                                    gradeEntry.gradable.grade,
                                    gradeEntry.gradable.maxGrade,
                                    basicConvert
                                  )}
                                </span>
                                <span>{`${gradeEntry.gradable.grade}/${gradeEntry.gradable.maxGrade}`}</span>
                              </span>
                            </span>
                            <span className="w-full mt-2 text-sm italic text-center lg:hidden">
                              Tap to view comments from instructors
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="block w-full px-2 py-4">
                          No grades.
                        </span>
                      )
                    ) : (
                      <span className="block w-full px-2 py-4">
                        Loading grades...
                      </span>
                    )}
                  </div>
                  <ReactModal
                    isOpen={isModalOpen}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    shouldReturnFocusAfterClose={true}
                    onRequestClose={handleOnRequestCloseReactModal}
                    className="top-[5rem] left-44 right-8 border border-black rounded bg-white absolute"
                  >
                    <CloseIcon width="2em" className="absolute bottom-auto left-auto right-1 top-1 hover:cursor-pointer" onClick={handleOnRequestCloseReactModal} />
                    <div className="p-1 text-xs text-center text-gray-400 hover:cursor-pointer" onClick={handleOnRequestCloseReactModal}>
                      To close, tap the X button
                    </div>
                    <div className="w-full max-w-xl px-4 pt-6 pb-6 mx-auto space-y-2">
                      <p className="w-full p-2 text-2xl font-bold text-center text-white bg-oxford-blue-light">Comments from instructors</p>
                      <hr />
                      <p>
                        {
                          activeGradeEntry && activeGradeEntry.gradable.comments && activeGradeEntry.gradable.comments.length > 0 ?
                          activeGradeEntry.gradable.comments :
                          <span className="block w-full italic text-center">
                            **No comments have been given**
                          </span>
                        }
                      </p>
                    </div>
                  </ReactModal>
                </div>
              </>
            )}
          </div>
          <div className="flex-col items-center hidden w-full max-w-md p-8 space-y-12 lg:flex xl:max-w-md 2xl:max-w-lg bg-gray-50">
            <div className="w-full p-1">
              <span className="block w-full p-2 text-4xl text-center text-white transition-colors border-t border-l border-r border-black rounded-t-xl bg-oxford-blue-light hover:bg-oxford-blue-dark">
                Comments
              </span>
              <div className="flex flex-col flex-1 w-full max-h-full p-2 space-y-1 bg-white border-b border-l border-r border-black border-solid rounded-b">
                {activeGradeEntry ? (
                  <>
                    <span className="font-bold border-b border-black">
                      {activeGradeEntry.item.title}
                    </span>
                    <span className="border-b border-black">
                      {activeGradeEntry.course.instructors}
                    </span>
                    <span className="border-b border-black">
                      {activeGradeEntry.gradable.dueDate.toDateString()}
                    </span>
                    <p className="w-100 h-100">
                      {activeGradeEntry.gradable.comments || '**No comments**'}
                    </p>
                  </>
                ) : (
                  <>
                    <span className="w-full text-center">
                      Select a grade entry to view comments from instructors.
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </CampusHubLayout>
  )
}

export default CourseGradesPage

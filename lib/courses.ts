import Course from '@/interfaces/course'

import courseList from '@/data/courses/sample'

export function getCourses(): Array<Course> {
  return courseList
}

export function getCourse(courseId: number): Course | undefined {
  return getCourses().find((course) => course.courseId == courseId)
}

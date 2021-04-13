import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import Course from '@/interfaces/course'
import { getCourses } from '@/lib/courses'

interface RequestQuery {
  id?: string
}

const handler: NextApiHandler<Array<Course>> = (
  req: NextApiRequest,
  res: NextApiResponse<Array<Course>>
) => {
  const query = (req.query as unknown) as RequestQuery
  const targetCourseId = query.id ? Number.parseInt(query.id) : undefined
  if (!targetCourseId || isNaN(targetCourseId)) {
    res.status(200).json(getCourses())
    return
  }
  res
    .status(200)
    .json(getCourses().filter((course) => course.courseId == targetCourseId))
}

export default handler

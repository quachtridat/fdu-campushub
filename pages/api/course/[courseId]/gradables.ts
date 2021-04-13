import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import Gradable from '@/interfaces/gradable'

import { getCourseGradables } from '@/lib/gradables'

interface RequestQuery {
  courseId: number
}

const handler: NextApiHandler<Array<Gradable>> = (
  req: NextApiRequest,
  res: NextApiResponse<Array<Gradable>>
) => {
  const query = (req.query as unknown) as RequestQuery
  const targetCourseId = query.courseId
  res.status(200).json(getCourseGradables(targetCourseId))
}

export default handler

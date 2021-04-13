import { Grade } from '@/interfaces/grade'
import { getCourseGradables } from './gradables'
import { getCourse } from './courses'
import { getCourseItems } from './items'

export function getCourseGrades(courseId: number): Array<Grade> {
  return getCourseGradables(courseId).map(
    (gradable) =>
      ({
        course: getCourse(courseId),
        gradable: gradable,
        item: getCourseItems(courseId).find(
          (item) => item.id == gradable.itemId
        ),
      } as Grade)
  )
}

export async function getCourseGradesAsync(
  courseId: number
): Promise<Array<Grade>> {
  return getCourseGrades(courseId)
}

export function calcGradePct(points: number, maxPoints: number): number {
  return points / maxPoints
}

export function convertGradePoints<TargetType>(
  points: number,
  maxPoints: number,
  mapping: (p: number, maxP: number) => TargetType
): TargetType {
  return mapping(points, maxPoints)
}

export function basicConvert(points: number, maxPoints: number): string {
  const pct = calcGradePct(points, maxPoints)

  if (pct < 0.6) return 'F'
  if (pct < 0.7) return 'D'
  if (pct < 0.73) return 'C-'
  if (pct < 0.77) return 'C'
  if (pct < 0.8) return 'C+'
  if (pct < 0.83) return 'B-'
  if (pct < 0.87) return 'B'
  if (pct < 0.9) return 'B+'
  if (pct < 0.93) return 'A-'

  return 'A'
}

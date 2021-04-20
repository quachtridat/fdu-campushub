import GenericComplexLayout, {
  Props as GenericComplexLayoutProps,
} from '@/components/CampusHub/Complexes/CampusHubGenericComplexLayout'
import CourseListingComplex from '@/components/CampusHub/Complexes/CampusHubCourseListingComplex'
import Course from '@/interfaces/course'

interface Props extends GenericComplexLayoutProps {
  courses: Array<Course>
}

const CampusHubGenericBasicCourseListingBlock: React.VFC<Props> = ({
  children: _,
  courses,
  className: propClassName,
  ...otherProps
}) => {
  return (
    <GenericComplexLayout
      headCenter="Course Listing"
      className={propClassName}
      {...otherProps}
    >
      <CourseListingComplex courses={courses} />
    </GenericComplexLayout>
  )
}

export default CampusHubGenericBasicCourseListingBlock

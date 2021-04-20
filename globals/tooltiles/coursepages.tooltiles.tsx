import { ToolTile } from '@/components/CampusHub/Standalones/Sidebars/CampusHubVerticalToolBar'
import {
  TemplateIcon as OverviewNavIcon,
  ClipboardIcon as AnnoucementsNavIcon,
  DocumentTextIcon as DocumentsNavIcon,
  PuzzleIcon as AssignmentsNavIcon,
  ChatAlt2Icon as DiscussionsNavIcon,
  ChartSquareBarIcon as GradesIcon,
  HomeIcon as HomeNavIcon,
  CalendarIcon,
} from '@heroicons/react/outline'

const tiles: (courseId: number) => Array<ToolTile> = (courseId) => [
  {
    key: 'homepage',
    name: 'Home',
    icon: <HomeNavIcon />,
    link: '/',
  },
  {
    key: 'course.overview',
    name: 'Course Overview',
    icon: <OverviewNavIcon />,
    link: `/course/${courseId}/`,
  },
  {
    key: 'course.announcements',
    name: 'Announcements',
    icon: <AnnoucementsNavIcon />,
    link: `/course/${courseId}/announcements`,
  },
  {
    key: 'course.documents',
    name: 'Documents',
    icon: <DocumentsNavIcon />,
    link: `/course/${courseId}/documents`,
  },
  {
    key: 'course.assignments',
    name: 'Assignments',
    icon: <AssignmentsNavIcon />,
    link: `/course/${courseId}/assignments`,
  },
  {
    key: 'course.discussions',
    name: 'Discussions',
    icon: <DiscussionsNavIcon />,
    link: `/course/${courseId}/discussions`,
  },
  {
    key: 'course.grades',
    name: 'Grades',
    icon: <GradesIcon />,
    link: `/course/${courseId}/grades`,
  },
  {
    key: 'course.calendar',
    name: 'Calendar',
    icon: <CalendarIcon />,
    link: `/course/${courseId}/calendar`,
  },
]

export default tiles

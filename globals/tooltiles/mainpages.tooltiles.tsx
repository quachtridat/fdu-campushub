import { ToolTile } from '@/components/CampusHub/Standalones/Sidebars/CampusHubVerticalToolBar'

import {
  HomeIcon as HomeNavIcon,
  AcademicCapIcon as CoursesNavIcon,
  ClipboardIcon as AnnouncementsNavIcon,
  ChartSquareBarIcon as GradesNavIcon,
  IdentificationIcon as StudentServicesNavIcon,
  CubeIcon as BlackboardNavIcon,
  CalendarIcon as CalendarNavIcon,
} from '@heroicons/react/outline'

const tiles: Array<ToolTile> = [
  {
    key: 'homepage',
    name: 'Home',
    icon: <HomeNavIcon />,
    link: '/main',
  },
  {
    key: 'courses',
    name: 'Courses',
    icon: <CoursesNavIcon />,
    link: '/courses',
  },
  {
    key: 'announcements',
    name: 'Announcements',
    icon: <AnnouncementsNavIcon />,
    link: '/announcements',
  },
  {
    key: 'grades',
    name: 'Grades',
    icon: <GradesNavIcon />,
  },
  {
    key: 'calendar',
    name: 'Calendar',
    icon: <CalendarNavIcon />,
  },
  {
    key: 'student-services',
    name: 'Student Services',
    icon: <StudentServicesNavIcon />,
  },
  { key: 'blackboard', name: 'Blackboard', icon: <BlackboardNavIcon /> },
]

export default tiles

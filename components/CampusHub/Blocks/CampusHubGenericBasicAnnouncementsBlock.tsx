import { MouseEventHandler, useState, useEffect } from 'react'
import GenericComplexLayout, {
  Props as GenericComplexLayoutProps,
} from '@/components/CampusHub/Complexes/CampusHubGenericComplexLayout'
import CampusHubAnnouncementComplex from '@/components/CampusHub/Complexes/CampusHubAnnouncementComplex'
import Announcement from '@/interfaces/announcement'
import { hasNextIndex, hasPreviousIndex } from '@/lib/helpers'

import {
  ArrowCircleLeftIcon as ArrowCircleLeftNavIcon,
  ArrowCircleRightIcon as ArrowCircleRightNavIcon,
} from '@heroicons/react/outline'

interface Props extends GenericComplexLayoutProps {
  announcements: Array<Announcement>
}

const CampusHubGenericBasicAnnouncementsBlock: React.VFC<Props> = ({
  children: _,
  announcements,
  className: propClassName,
  ...otherProps
}) => {
  const [hasAnnouncements, setHasAnnouncements] = useState<boolean>(false)
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement>()
  const [
    currentAnnouncementIndex,
    setCurrentAnnouncementIndex,
  ] = useState<number>(0)

  const handleOnClickPrevAnnouncement: MouseEventHandler = () => {
    if (!announcements) return
    if (hasPreviousIndex(currentAnnouncementIndex, announcements)) {
      const nextAnnouncementIndex = currentAnnouncementIndex - 1
      setCurrentAnnouncementIndex(nextAnnouncementIndex)
      setCurrentAnnouncement(announcements[nextAnnouncementIndex])
    }
  }

  const handleOnClickNextAnnouncement: MouseEventHandler = () => {
    if (!announcements) return
    if (hasNextIndex(currentAnnouncementIndex, announcements)) {
      const nextAnnouncementIndex = currentAnnouncementIndex + 1
      setCurrentAnnouncementIndex(nextAnnouncementIndex)
      setCurrentAnnouncement(announcements[nextAnnouncementIndex])
    }
  }

  useEffect(() => {
    if (announcements && announcements.length > 0) {
      const idx = 0
      setCurrentAnnouncementIndex(0)
      setCurrentAnnouncement(announcements[idx])
      setHasAnnouncements(true)
    }
  }, [announcements])

  return (
    <GenericComplexLayout
      headLeft={
        <button className="shadow hover:cursor-pointer">
          <ArrowCircleLeftNavIcon
            width="1.5em"
            onClick={handleOnClickPrevAnnouncement}
            className={`${
              hasPreviousIndex(currentAnnouncementIndex, announcements)
                ? 'text-white'
                : 'text-gray-400'
            }`}
          />
        </button>
      }
      headCenter={
        <span className="flex flex-col items-center justify-between">
          <span>Announcements</span>
          <span className="text-xs italic">
            {announcements && announcements.length > 0 ? (
              <>
                Announcement {currentAnnouncementIndex + 1} of{' '}
                {announcements.length}
              </>
            ) : (
              <>No announcements</>
            )}
          </span>
        </span>
      }
      headRight={
        <button className="shadow hover:cursor-pointer">
          <ArrowCircleRightNavIcon
            width="1.5em"
            onClick={handleOnClickNextAnnouncement}
            className={`shadow hover:cursor-pointer ${
              hasNextIndex(currentAnnouncementIndex, announcements)
                ? 'text-white'
                : 'text-gray-400'
            }`}
          />
        </button>
      }
      className={`${propClassName || ''}`}
      {...otherProps}
    >
      {currentAnnouncement ? (
        <CampusHubAnnouncementComplex
          announcement={currentAnnouncement}
          contentAsHtml={true}
        />
      ) : (
        <div className="w-full min-h-[1em] p-2 space-y-1 bg-white border-b border-l border-r border-black rounded-b">
          {hasAnnouncements ? (
            <span>Loading...</span>
          ) : (
            <span>No announcements</span>
          )}
        </div>
      )}
    </GenericComplexLayout>
  )
}

export default CampusHubGenericBasicAnnouncementsBlock

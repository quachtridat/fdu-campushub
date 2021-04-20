import Course from './course'

export type AnnouncementTarget = Array<Course>

export interface AnnouncementMeta {
  __interfaceAnnouncementMeta?: 'AnnouncementMeta'
  title?: string
  announcer?: string
  target?: AnnouncementTarget
  postDate?: Date | string
}

export interface AnnouncementMetaMarkdown {
  __interfaceAnnouncementMeta?: 'AnnouncementMetaMarkdown'
  title?: string
  announcer?: string
  target?: string
  postDate?: string
}

export interface Announcement extends AnnouncementMeta {
  __interfaceAnnouncement?: 'Announcement'
  id: number
  content?: string
}

export default Announcement

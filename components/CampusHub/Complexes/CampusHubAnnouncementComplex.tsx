import Announcement from '@/interfaces/announcement'

interface Props extends React.ComponentProps<'div'> {
  announcement: Announcement
  contentAsHtml?: boolean
}

const CampusHubAnnouncementComplex: React.VFC<Props> = ({
  announcement,
  contentAsHtml,
  children: _,
  className: propClassName,
  ...otherProps
}) => {
  return announcement ? (
    <div
      className={`flex flex-col flex-1 w-full max-h-full p-2 space-y-1 bg-white border-b border-l border-r border-black rounded-b ${propClassName}`}
      {...otherProps}
    >
      <span className="font-bold border-b border-black">
        {announcement.title}
      </span>
      <span className="border-b border-black">
        {announcement.announcer}{' '}
        {announcement.target ? (
          <>
            &rarr;{' '}
            {announcement.target.map((elem) => elem.courseName).join('; ')}
          </>
        ) : (
          ''
        )}
      </span>
      <span className="border-b border-black">
        {announcement.postDate
          ? announcement.postDate instanceof Date
            ? announcement.postDate.toLocaleString()
            : typeof announcement.postDate === 'string'
            ? announcement.postDate
            : ''
          : ''}
      </span>
      {contentAsHtml && contentAsHtml == true && announcement.content ? (
        <p
          className="prose w-100 h-100"
          dangerouslySetInnerHTML={{ __html: announcement.content }}
        />
      ) : (
        <p className="prose w-100 h-100">{announcement.content}</p>
      )}
    </div>
  ) : (
    <></>
  )
}

export default CampusHubAnnouncementComplex

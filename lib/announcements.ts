import fs from 'fs'
import path from 'path'
import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import rehypeSanitize from 'rehype-sanitize'
import toVfile from 'to-vfile'
import vfileMatter from 'vfile-matter'
import Announcement, {
  AnnouncementMeta,
  AnnouncementMetaMarkdown,
  AnnouncementTarget,
} from '@/interfaces/announcement'
import { getCourse } from './courses'

export async function getAnnouncementsHtml(options?: {
  metaPredicate?: (value: AnnouncementMeta) => boolean
  announcementPredicate?: (value: Announcement) => boolean
}): Promise<Array<Announcement>> {
  let ret: Array<Announcement> = []

  const dataPath = getAnnouncementsPath()

  const filenames = await fs.promises.readdir(dataPath)

  for (const [fileIdx, filename] of filenames.entries()) {
    const filepath = path.join(dataPath, filename)

    const file = await toVfile.read(filepath)

    vfileMatter(file, { strip: true })

    const { matter: frontmatter } = file.data as {
      matter: AnnouncementMetaMarkdown
    }
    const metadata: AnnouncementMeta = {
      announcer: frontmatter.announcer,
      title: frontmatter.title,
    }
    metadata.target = parseAnnouncementTarget(frontmatter.target)
    metadata.postDate = frontmatter.postDate && new Date(frontmatter.postDate)

    if (options && options.metaPredicate && !options.metaPredicate(metadata))
      continue

    let err: any = undefined

    const fileNoFrontmatter = await unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(file)
      .catch((error) => (err = error))

    if (err) {
      // ret.push(err)
      // console.log(err)
      continue
    } else {
      ret.push({
        id: fileIdx,
        content: String(fileNoFrontmatter),
        ...metadata,
      } as Announcement)
    }
  }

  if (options && options.announcementPredicate)
    ret = ret.filter(options.announcementPredicate)
  if (options && options.metaPredicate) ret = ret.filter(options.metaPredicate)

  return ret
}

export function getAnnouncementsPath(): string {
  const sampleAnnoucementsMdPath = path.join(
    process.cwd(),
    'data',
    'announcements',
    'markdown'
  )
  return process.env.ANNOUNCEMENTS_PATH || sampleAnnoucementsMdPath
}

export function parseAnnouncementTarget(target?: string): AnnouncementTarget {
  const res: AnnouncementTarget = []
  if (!target || target.length < 1) return res
  const entityFrags = target.split(';')
  if (!entityFrags || entityFrags.length < 1) return res
  for (const entityFrag of entityFrags) {
    const subFrags = entityFrag.split('.')
    if (!subFrags || subFrags.length < 1) continue
    const entityType = subFrags[0]
    if (entityType === 'course') {
      if (subFrags.length < 2) continue
      const courseIds = subFrags[1]
        .split(',')
        .map((courseId) => Number.parseInt(courseId, 10))
      for (const courseId of courseIds) {
        if (courseId && !isNaN(courseId)) {
          const course = getCourse(courseId)
          if (course) {
            res.push(course)
          }
        }
      }
    }
  }
  return res
}

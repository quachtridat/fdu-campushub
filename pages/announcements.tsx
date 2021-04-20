import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Calendar from 'react-calendar'

import CampusHubVerticalToolBar from '@/components/CampusHub/Standalones/Sidebars/CampusHubVerticalToolBar'
import CampusHubLayout from '@/components/CampusHub/Layouts/CampusHubLayout'
import GenericComplexLayout from '@/components/CampusHub/Complexes/CampusHubGenericComplexLayout'
import AnnouncementsBlock from '@/components/CampusHub/Blocks/CampusHubGenericBasicAnnouncementsBlock'
import Announcement from '@/interfaces/announcement'
import { getAnnouncementsHtml } from '@/lib/announcements'
import tiles from '@/globals/tooltiles/mainpages.tooltiles'
import { optionGroups as searchOptions } from '@/globals/search-options/mainpages.options'

interface Props {
  announcements: Array<Announcement>
}

const AnnouncementsPage: NextPage<Props> = ({ announcements }) => {
  return (
    <CampusHubLayout
      navDefinedSearchOptions={searchOptions}
      footerClassName="pl-40"
    >
      <Head>
        <title>FDU CampusHub</title>
      </Head>
      <div className="flex flex-row flex-1 pl-40 pt-[4rem]">
        <CampusHubVerticalToolBar
          tiles={tiles}
          activeTileKey="announcements"
          className="fixed top-[4rem] z-50 left-0 w-40 h-full max-h-full bg-oxford-blue-dark"
        />
        <main className="flex flex-row flex-1">
          <div className="flex flex-col flex-1 w-full p-8 space-y-12">
            <AnnouncementsBlock
              announcements={announcements}
              className="w-full"
            />
          </div>
          <div className="flex flex-col items-center w-full max-w-md p-8 space-y-12 lg:max-w-lg bg-gray-50">
            <GenericComplexLayout headCenter="Calendar" className="w-full">
              <Calendar
                locale="en-US"
                className="w-full border-0 border-b border-l border-r border-black rounded-b"
              />
            </GenericComplexLayout>
          </div>
        </main>
      </div>
    </CampusHubLayout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      announcements: (await getAnnouncementsHtml()).map((announcement) => ({
        ...announcement,
        postDate: announcement.postDate
          ? typeof announcement.postDate === 'string'
            ? announcement.postDate
            : announcement.postDate.toLocaleString()
          : 'No Date',
      })),
    },
  }
}

export default AnnouncementsPage

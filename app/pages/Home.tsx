import { useNavigate } from '@remix-run/react'
import { motion } from 'framer-motion'

import Categories from '~/components/events/Categories'
import EventCard from '~/components/events/EventCard'
import { MotionAvatar } from '~/components/motion'
import Avatar from '~/components/ui/Avatar'
import Badge from '~/components/ui/Badge'
import Button from '~/components/ui/Button'
import Figure from '~/components/ui/Figure'
import Pagination from '~/components/ui/Pagination'
import { transitionVariants } from '~/utils/motion'

const trendingEvents = [
  {
    name: 'Online Concert to support the project',
  },
  {
    name: 'Online Innings Festival Concert',
  },
  {
    name: 'Offline Concert',
  },
]

const trendingArtists = [
  {
    name: 'Davig Guetta',
  },
  {
    name: 'Imagine Dragons',
  },
  {
    name: 'Feid',
  },
  {
    name: 'Metallica',
  },
]

const avatarImg = 'https://avatars.githubusercontent.com/u/2154886?s=40&v=4'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <section className="container mx-auto py-8 md:py-12 lg:px-14">
      <div className="flex flex-col rounded-xl bg-[#FAFAFA] dark:border-gray-700 dark:bg-slate-900 lg:flex-row">
        <div className="flex items-center justify-center p-5 lg:w-1/3 md:px-16 ml-0 lg:-ml-10 xl:-ml-5 2xl:-ml-16">
          <Figure
            imgSrc="/assets/welcome.png"
            imgAlt="ConcertX"
            imgClass="h-auto min-w-[250px] max-w-full md:min-w-[320px] xl:min-w-[460px]"
          />
        </div>
        <div className="ml-0 flex-1 flex w-full flex-col p-5 xl:ml-5 lg:p-10">
          <MotionAvatar
            variants={transitionVariants}
            initial="fadeOut"
            animate="fadeIn"
            exit="fadeOut"
            img="https://avatars.githubusercontent.com/u/2154886?s=40&v=4"
            name="J.D Nicholls"
            details="@jdnichollsc"
          />
          <motion.h1
            layout="position"
            layoutId="event-title"
            initial={false}
            className="mt-5 text-3xl font-bold tracking-tight text-dark-gray dark:text-dark md:text-2xl lg:text-3xl xl:text-5xl"
          >
            Acoustical Sessions
          </motion.h1>
          <motion.p
            layout="position"
            layoutId="event-subtitle"
            className="mt-2 text-sm font-medium text-gray-500 group-hover:text-gray-700"
          >
            Online Event
          </motion.p>
          <motion.p
            layout="position"
            layoutId="event-description"
            className="mt-6 text-sm font-normal text-dark-gray dark:text-dark"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </motion.p>
          <div className="mt-3 flex flex-row">
            <Badge className="mr-2">
              #PopRock
            </Badge>
            <Badge className="mr-2">
              #AlternativeRock
            </Badge>
          </div>
          <div className="mt-10 flex max-w-2xl flex-col divide-y divide-gray-300 lg:flex-row lg:divide-y-0 lg:divide-x">
            <div className="py-5 lg:py-0 lg:px-5 xl:px-10 first:pl-0 first:pt-0">
              <h2 className="text-sm font-semibold uppercase text-dark-gray dark:text-dark">
                Total Raised
              </h2>
              <p className="mt-4 text-3xl font-bold tracking-tight text-dark-gray dark:text-dark">
                40
              </p>
              <p className="mt-1 text-sm font-normal tracking-tight text-gray-600 dark:text-medium">
                $369,99
              </p>
            </div>
            <div className="py-5 lg:py-0 lg:px-5 xl:px-10">
              <h2 className="text-sm font-semibold uppercase text-dark-gray dark:text-dark">
                Total Goal
              </h2>
              <p className="mt-4 text-3xl font-bold tracking-tight text-dark-gray dark:text-dark">
                40
              </p>
              <p className="mt-1 text-sm font-normal tracking-tight text-gray-600 dark:text-medium">
                $369,99
              </p>
            </div>
            <div className="py-5 lg:py-0 lg:px-5 xl:px-10">
              <h2 className="text-sm font-semibold uppercase text-dark-gray dark:text-dark">
                Ending
              </h2>
              <p className="mt-4 text-3xl font-bold tracking-tight text-dark-gray dark:text-dark">
                20h 49m 24s
              </p>
            </div>
          </div>
          <Button
            className="mt-10 max-w-[10rem]"
            onClick={() => navigate('/event')}
          >
            View Details
          </Button>
        </div>
      </div>
      <Pagination className="mt-3 flex justify-end" />
      <section className="mt-20 px-5 md:px-0">
        <div className="flex flex-row flex-wrap justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-dark-gray dark:text-dark">
            Trending Events
          </h2>
          <div className="relative flex flex-none flex-row items-baseline ml-auto gap-2">
            <Categories />
            <a
              href="#"
              className="h-full text-sm font-semibold leading-6 text-dark-gray dark:text-dark md:text-base"
            >
              View all <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <ul
          role="list"
          className="mt-3 md:mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
        >
          {trendingEvents.map((event) => (
            <li key={event.name} className="mx-auto max-w-sm">
              <EventCard avatarImg={avatarImg} name={event.name} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 px-5 md:px-0">
        <div className="flex flex-row flex-wrap justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-dark-gray dark:text-dark">
            Trending Artists
          </h2>
          <div className="relative flex flex-none flex-row items-center ml-auto">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-dark-gray dark:text-dark md:text-base"
            >
              View all <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <ul
          role="list"
          className="mt-3 md:mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {trendingArtists.map((artist) => (
            <li
              key={artist.name}
              className="border border-gray-300 bg-white px-4 py-5 dark:border-gray-700 dark:bg-slate-900 sm:rounded-lg sm:px-6"
            >
              <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
                <Avatar
                  img={avatarImg}
                  name="J.D Nicholls"
                  details="@jdnichollsc"
                  className="flex-1 w-full"
                >
                  <div className="mt-4 divide-y divide-gray-300">
                    <p className="text-sm text-dark-gray dark:text-dark">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                      quam corrupti consectetur.
                    </p>
                    <div className="mt-4 flex flex-row gap-5 pt-4 xl:gap-10">
                      <div className="flex-none">
                        <h2 className="text-xs font-semibold uppercase text-dark-gray dark:text-dark">
                          Category
                        </h2>
                        <p className="mt-1 text-xs font-normal tracking-tight text-gray-600 dark:text-medium">
                          #Rock
                        </p>
                      </div>
                      <div className="flex-none">
                        <h2 className="text-xs font-semibold uppercase text-dark-gray dark:text-dark">
                          Followers
                        </h2>
                        <p className="mt-1 text-xs font-normal tracking-tight text-gray-600 dark:text-medium">
                          26
                        </p>
                      </div>
                      <div className="flex flex-1 justify-end">
                        <Button
                          className="px-3.5 py-2.5"
                          onClick={() => navigate('/artist')}
                        >
                          Follow
                        </Button>
                      </div>
                    </div>
                  </div>
                </Avatar>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}

export default HomePage

import { useNavigate } from '@remix-run/react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

import { MotionAvatar } from '~/components/motion'
import Button from '~/components/ui/Button'
import { transitionVariants } from '~/utils/motion'
import { Tab } from '@headlessui/react'
import { cn } from '~/utils/styles'

const events = [
  {
    id: 1,
    title: 'Acoustical Sessions',
    totalRaised: 40,
    totalRaisedUsd: '$369.99',
    totalGoal: 250,
    totalGoalUsd: '$2,312.41',
    endingIn: '2h 9m 21s',
    image: '/assets/acoustical-sessions.jpg'
  },
  {
    id: 2,
    title: 'Online Innings Festival Concert',
    totalRaised: 169491,
    totalRaisedUsd: '$1,599,950.4',
    totalGoal: 350,
    totalGoalUsd: '$3,304',
    endingIn: '3h 7m 14s',
    image: '/assets/innings-festival.jpg'
  },
  {
    id: 3,
    title: 'Cover concert',
    totalRaised: 158.89,
    totalRaisedUsd: '$1,499,921.6',
    status: 'Ended',
    endDate: '16/11/21',
    image: '/assets/cover-concert.jpg'
  }
]

const activities = [
  {
    id: 1,
    type: 'contribution',
    amount: '0.1 SOL',
    date: new Date(),
    event: 'Acoustical Sessions'
  },
  {
    id: 2,
    type: 'created',
    date: new Date(),
    event: 'Online Summer Festival'
  }
]

const followers = [
  {
    id: 1,
    name: 'Alice Cooper',
    username: '@alicecooper',
    avatar: 'https://avatars.githubusercontent.com/u/2154886?s=40&v=4'
  },
  {
    id: 2,
    name: 'David Gilmour',
    username: '@dgilmour',
    avatar: 'https://avatars.githubusercontent.com/u/2154886?s=40&v=4'
  }
]

const AuthorPage = () => {
  const navigate = useNavigate()

  const handleViewEvent = () => {
    navigate('/event')
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Left Column - Author Profile */}
          <aside className="md:w-80">
            {/* Author Image */}
            <div className="mb-6">
              <img
                src="https://avatars.githubusercontent.com/u/2154886?s=400&v=4"
                alt="Josephine Lee"
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>

            {/* Author Info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Josephine Lee
              </h1>
              <div className="mt-1 flex items-center gap-x-2 text-sm text-gray-500">
                <span>@Josephine_Lee</span>
                <span>·</span>
                <span>Joined Aug 31st 2021</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="mb-6 flex items-center gap-6">
              <div className="flex items-center gap-1">
                <span className="text-base font-semibold text-gray-900 dark:text-white">9</span>
                <span className="text-sm text-gray-500">Following</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-base font-semibold text-gray-900 dark:text-white">294</span>
                <span className="text-sm text-gray-500">Followers</span>
              </div>
              <Button
                className="ml-auto rounded-full bg-gray-900 px-4 py-1 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={() => {}}
              >
                Follow
              </Button>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h2 className="mb-2 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                BIO
              </h2>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              </p>
            </div>

            {/* Wallet Address */}
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                ADDRESS
              </h2>
              <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  nickname.near
                </span>
                <button
                  type="button"
                  className="ml-auto text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={() => {}}
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column - Content */}
          <div className="flex-1">
            <Tab.Group as="div">
              <Tab.List className="flex space-x-1 border-b border-gray-200">
                {['Events', 'Activity', 'Followers'].map((tab) => (
                  <Tab
                    key={tab}
                    className={({ selected }) =>
                      cn(
                        'relative min-w-0 flex-1 overflow-hidden py-4 text-sm font-medium text-center focus:z-10 focus:outline-none',
                        selected
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
                      )
                    }
                  >
                    {tab}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels className="mt-6">
                <Tab.Panel>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {events.map((event) => (
                      <motion.div
                        key={event.id}
                        className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md dark:bg-slate-900"
                        onClick={handleViewEvent}
                      >
                        <div className="aspect-w-16 aspect-h-9">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-dark-gray dark:text-dark">
                            {event.title}
                          </h3>
                          {event.status ? (
                            <div className="mt-2 flex justify-between">
                              <span className="text-sm text-red-500">{event.status}</span>
                              <span className="text-sm text-gray-500">{event.endDate}</span>
                            </div>
                          ) : (
                            <div className="mt-4">
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <p className="text-xs font-medium uppercase text-gray-500">Total Raised</p>
                                  <p className="mt-1 text-base font-semibold text-dark-gray dark:text-dark">
                                    {event.totalRaised}
                                  </p>
                                  <p className="text-xs text-gray-500">{event.totalRaisedUsd}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium uppercase text-gray-500">Total Goal</p>
                                  <p className="mt-1 text-base font-semibold text-dark-gray dark:text-dark">
                                    {event.totalGoal}
                                  </p>
                                  <p className="text-xs text-gray-500">{event.totalGoalUsd}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium uppercase text-gray-500">Ending in</p>
                                  <p className="mt-1 text-base font-semibold text-dark-gray dark:text-dark">
                                    {event.endingIn}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="rounded-lg bg-white p-4 shadow-sm dark:bg-slate-900"
                      >
                        <div className="flex flex-col">
                          <p className="text-sm text-dark-gray dark:text-dark">
                            {activity.type === 'contribution'
                              ? `Contributed ${activity.amount} to`
                              : 'Created'}{' '}
                            <span className="font-semibold">{activity.event}</span>
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {format(activity.date, 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {followers.map((follower) => (
                      <div
                        key={follower.id}
                        className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-900"
                      >
                        <img
                          src={follower.avatar}
                          alt={follower.name}
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-dark-gray dark:text-dark">
                            {follower.name}
                          </h3>
                          <p className="text-sm text-gray-500">{follower.username}</p>
                        </div>
                        <Button
                          className="px-4 py-2 text-sm"
                          onClick={() => {}}
                        >
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorPage

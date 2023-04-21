import { EyeIcon, HeartIcon, ShareIcon } from '@heroicons/react/20/solid'
import { useNavigate } from '@remix-run/react'
import { motion } from 'framer-motion'

import Layout from '~/components/Layout'
import { MotionAvatar } from '~/components/motion'
import Badge from '~/components/ui/Badge'
import Button from '~/components/ui/Button'
import Figure from '~/components/ui/Figure'
import { transitionVariants } from '~/utils/motion'

export default function Index() {
  const navigate = useNavigate()
  return (
    <Layout>
      <section className="container mx-auto px-5 lg:px-0">
        <motion.h1
          layout="position"
          layoutId="event-title"
          className="mt-10 text-3xl font-bold tracking-tight text-gray-900 md:text-2xl lg:text-3xl xl:text-5xl"
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
        <div className="grid grid-cols-1 gap-x-8 py-12 lg:grid-cols-3">
          <div>
            <MotionAvatar
              variants={transitionVariants}
              initial="growOut"
              animate="growIn"
              exit="growOut"
              img="https://avatars.githubusercontent.com/u/2154886?s=40&v=4"
              name="J.D Nicholls"
              details="@jdnichollsc"
            />
            <motion.p
              layout="position"
              layoutId="event-description"
              className="mt-6 text-sm font-normal text-gray-900"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </motion.p>
            <div className="mt-3 flex flex-row">
              <Badge className="mr-2">#PopRock</Badge>
              <Badge className="mr-2">#AlternativeRock</Badge>
            </div>
            <div className="mt-3 flex flex-row">
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-gray-900"
              >
                <EyeIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                200 Views
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-gray-900"
              >
                <HeartIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                226 Likes
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-gray-900"
              >
                <ShareIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                Share
              </button>
            </div>
            <div className="mt-5 flex flex-col border border-gray-300 bg-white px-4 py-5 dark:border-gray-700 dark:bg-gray-800 sm:rounded-lg sm:px-6">
              <h2 className="text-sm font-semibold uppercase text-gray-900">
                NFT Details
              </h2>
            </div>
          </div>
          <div className="mt-5 flex min-h-full w-full items-center lg:mt-0">
            <Figure
              imgSrc="/assets/welcome.png"
              imgAlt="ConcertX"
              className="w-full"
            />
          </div>
          <div className="mt-10 flex flex-col lg:mt-0">
            <div className="flex flex-col border border-gray-300 bg-white px-4 py-5 dark:border-gray-700 dark:bg-gray-800 sm:rounded-lg sm:px-6">
              <div className="flex max-w-2xl flex-col gap-5 divide-y divide-gray-300 lg:flex-row lg:divide-y-0 lg:divide-x">
                <div className="flex-none">
                  <h2 className="text-sm font-semibold uppercase text-gray-900">
                    Total Raised
                  </h2>
                  <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                    40
                  </p>
                  <p className="mt-1 text-sm font-normal tracking-tight text-gray-600">
                    $369,99
                  </p>
                </div>
                <div className="flex-1 pt-5 lg:px-5 lg:pt-0 xl:px-10">
                  <h2 className="text-sm font-semibold uppercase text-gray-900">
                    Ending
                  </h2>
                  <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                    20h 49m 24s
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-row flex-wrap items-end justify-between gap-y-3">
                <p>
                  <strong className="font-semibold">Total Goal</strong>: 250 /
                  $2022.00
                </p>
                <Button onClick={() => navigate('/checkout')}>
                  Make a contribution
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

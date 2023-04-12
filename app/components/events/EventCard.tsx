import { HeartIcon, ShareIcon } from '@heroicons/react/20/solid'
import React from 'react'

import Avatar from '../ui/Avatar';

type EventCardProps = {
  name: string;
  avatarImg: string;
}

const EventCard: React.FC<EventCardProps> = ({
  name,
  avatarImg,
}) => {
  return (
    <article className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <a href="#">
        <img className="rounded-t-lg" src="/assets/welcome.png" alt="" />
      </a>
      <div className="flex w-full items-center justify-between space-x-6 p-3 pb-0">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h3 className="text-base font-semibold text-gray-900">
              {name}
            </h3>
          </div>
        </div>
        <div className="flex flex-row">
          <HeartIcon className="m-2 h-5 w-5 text-gray-900" aria-hidden="true" />
          <ShareIcon className="m-2 h-5 w-5 text-gray-900" aria-hidden="true" />
        </div>
      </div>
      <div className="flex w-full items-center justify-between space-x-6 p-3">
        <Avatar img={avatarImg} name="J.D Nicholls" details="@jdnichollsc" />
        <div>
          <h2 className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            Ending in
          </h2>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
            40 min
          </p>
        </div>
      </div>
    </article>
  )
}

export default EventCard

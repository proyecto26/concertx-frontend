import { motion } from "framer-motion";
import { useGetAllNFTs } from "~/hooks";

export type AuthorPageProps = {
  address: string;
  username?: string;
  imgSrc?: string;
}

const AuthorPage: React.FC<AuthorPageProps> = ({
  address,
  username = '@jdnichollsc',
  imgSrc = "https://avatars.githubusercontent.com/u/2154886?s=200&v=4"
}) => {
  const { status, data } = useGetAllNFTs({ address });
  const nfts = data?.result ?? [];
  return (
    <section className="container mx-auto px-5 py-8 md:py-12 lg:px-14 flex">
      <aside className="w-1/4">
        <div>
          <img
            className="inline-block h-24 w-24 rounded-full"
            src={imgSrc}
            alt=""
          />
          <motion.h1
            layout="position"
            layoutId="author-name"
            className="pt-8 text-3xl font-bold tracking-tight text-dark-gray dark:text-dark md:text-2xl lg:text-3xl xl:text-5xl"
          >
            Author
          </motion.h1>
          <div>
            <p className="text-base font-semibold text-dark-gray dark:text-dark">
              {username}
            </p>
          </div>
          <motion.p
            layout="position"
            layoutId="event-description"
            className="mt-6 text-sm font-normal text-dark-gray dark:text-dark"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </motion.p>
        <div className="mt-3 flex flex-row">
          
        </div>
          <div className="mt-3 flex flex-row">
            <div className="py-5 lg:py-0 lg:px-5 xl:px-10 first:pl-0 first:pt-0">
              <h2 className="text-sm font-semibold uppercase text-dark-gray dark:text-dark">
                Following
              </h2>
              <p className="mt-4 text-2xl font-bold tracking-tight text-dark-gray dark:text-dark">
                40
              </p>
            </div>
            <div className="py-5 lg:py-0 lg:px-5 xl:px-10 first:pl-0 first:pt-0">
              <h2 className="text-sm font-semibold uppercase text-dark-gray dark:text-dark">
                Followers
              </h2>
              <p className="mt-4 text-2xl font-bold tracking-tight text-dark-gray dark:text-dark">
                40
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-dark-gray dark:text-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-gray-900"
            >
              Follow
            </button>
          </div>
        </div>
      </aside>

      <section className="w-3/4 mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
        <h2>
          Products
        </h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
          {nfts.map(({ mint, name, image_uri, attributes }) => (
            <article key={mint} className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-slate-900">
              <a href={`/product/${mint}`}>
                <img className="rounded-t-lg" src={image_uri} alt={name} />
              </a>
              <div className="flex w-full items-center justify-between space-x-6 p-3 pb-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-base font-semibold text-dark-gray dark:text-dark">
                      {name}
                    </h3>
                  </div>
                </div>
                {/* <div className="flex flex-row">
                  <HeartIcon className="m-2 h-5 w-5 text-dark-gray dark:text-dark" aria-hidden="true" />
                  <ShareIcon className="m-2 h-5 w-5 text-dark-gray dark:text-dark" aria-hidden="true" />
                </div> */}
              </div>
              <div className="flex w-full items-center justify-between space-x-6 p-3">
                <div className="pt-3">
                  <h2 className="text-sm font-medium text-gray-700 dark:text-medium group-hover:text-gray-900">
                    {attributes.artist}
                  </h2>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

export default AuthorPage

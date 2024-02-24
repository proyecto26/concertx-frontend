import type { MetaDescriptor } from "@remix-run/react"

export function getGlobalMetaTags({
  image = '',
  url = 'https://www.concertx.com',
  title = 'ConcertX - The Crowdfunding Platform for Music Artists and Fans',
  description = `ConcertX is a revolutionary crowdfunding platform for Musical Artists.
  Our platform uses blockchain technology to enable trusted transactions between musicians and their backers, and also allows musicians to share their rehearsals and broadcast live to their fans.
  Support your favorite musicians and bring unique concerts to life with ConcertX.`,
  charset = 'utf-8',
  viewport = 'width=device-width,initial-scale=1,viewport-fit=cover',
  keywords = 'crowdfunding, musicians, concerts, blockchain, smart contracts, live broadcasting, virtual reality, music industry, recording studios, rewards, fans, backers',
  referrer = 'strict-origin-when-cross-origin',
}: {
  url?: string
  image?: string
  title?: string
  description?: string
  keywords?: string,
  charset?: 'utf-8',
  viewport?: string,
  referrer?: string,
}): MetaDescriptor[] {
  return [
    { name: 'title', content: title },
    { name: 'charset', content: charset },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'referrer', content: referrer },
    { name: 'viewport', content: viewport },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
    { property: 'twitter:creator', content: '@proyecto_26' },
    { property: 'twitter:site', content: '@proyecto_26' },
    { property: 'twitter:title', content: title },
    { property: 'twitter:description', content: description },
    { property: 'twitter:image', content: image },
    { property: 'twitter:alt', content: title },
    { name: 'theme-color', content: '#dd9c27' },
  ]
}
export function getSocialMetas({
  image = '',
  url = 'https://www.concertx.com',
  title = 'ConcertsX - The Crowdfunding Platform for Musicians',
  description = `ConcertsX is a revolutionary crowdfunding platform for musicians.
  Our platform uses blockchain technology to enable trusted transactions between musicians and their backers, and also allows musicians to share their rehearsals and broadcast live to their fans.
  Support your favorite musicians and bring unique concerts to life with ConcertsX.`,
  charset = 'utf-8',
  viewport = 'width=device-width,initial-scale=1,viewport-fit=cover',
  keywords = 'crowdfunding, musicians, concerts, blockchain, smart contracts, live broadcasting, virtual reality, music industry, recording studios, rewards, fans, backers',
}: {
  url: string
  image?: string
  title?: string
  description?: string
  keywords?: string,
  charset?: 'utf-8',
  viewport?: string,
}) {
  return {
    charset,
    viewport,
    title,
    description,
    keywords,
    image,
    'og:url': url,
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'twitter:card': image ? 'summary_large_image' : 'summary',
    'twitter:creator': '@proyecto_26',
    'twitter:site': '@proyecto_26',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:alt': title,
    'theme-color': '#dd9c27',
  }
}
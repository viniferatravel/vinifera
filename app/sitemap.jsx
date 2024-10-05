export default function sitemap() {
    return [
      {
        url: 'https://www.prosperaahospitality.com/',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: 'https://www.prosperaahospitality.com/about-us',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: 'https://www.prosperaahospitality.com/our-services',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ]
  }
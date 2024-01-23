export const siteMetadata: ISiteMetadata = {
  title: 'MT ASTRO',
  content: {
    contentDirectory: 'src/content',
  },
  tmpPath: '.tmp',
  siteUrl: 'https://thadaw.com',
  components: {
    hero: {
      title: `Hi 👋 I\'m Thada, DevOps & SRE Lead, welcome to my blog. `,
      tagline: `TypeScript, Azure, Creator of Nammatham, Serverless.`,
    },
    footer: {
      sinceYear: 2015,
      copyright: 'thadaw.com',
      tagline: '<a href="https://github.com/mildronize/mt-astro-template" target="_blank">MT ASTRO v7.0.0</a> Built with ❤️ by Thada Wangthammang'
    },
  },
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: 'GitHub',
      url: 'https://github.com/mildronize',
      iconClassName: 'fab fa-github',
    },
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/mildronize/',
      iconClassName: 'fab fa-facebook',
    },
    {
      label: 'Twitter',
      url: 'https://twitter.com/mildronize',
      iconClassName: 'fab fa-twitter',
    },
    {
      label: 'Email',
      url: 'mailto:thada.wth@gmail.com',
      iconClassName: 'fas fa-envelope',
    },
    {
      label: 'Linkedin',
      url: 'https://www.linkedin.com/in/thada-wangthammang-281894a6/',
      iconClassName: 'fab fa-linkedin',
    },
    {
      label: 'Medium',
      url: 'https://thadaw.medium.com/',
      iconClassName: 'fab fa-medium',
    },
    {
      label: 'RSS',
      url: '/rss',
      iconClassName: 'fas fa-rss',
    },
  ],
};

export interface ISiteMetadata {
  title: string;
  content: {
    /** the root of content directory, it can contains various type of contents e.g. 
    posts, pages */
    contentDirectory: string;
  };
  tmpPath: string;
  siteUrl: string;
  components: {
    hero: Hero;
    footer: Footer;
  };
  userLinks: UserLink[];
}

export interface Hero {
  title: string;
  tagline: string;
}

export interface UserLink {
  label: string;
  url: string;
  iconClassName: string;
}

export interface Footer {
  sinceYear: number;
  copyright: string;
  tagline: string;
}

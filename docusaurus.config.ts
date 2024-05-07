import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Electron Forge',
  tagline: 'Electron Forge is an all-in-one tool for packaging and distributing Electron applications.',
  favicon: 'favicon/favicon.ico',
  url: 'https://www.electronforge.io/',
  baseUrl: '/',
  organizationName: 'electron',
  projectName: 'forge', // Usually your repo name.

  // onBrokenLinks: 'throw',
  // onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/electron-forge/electron-forge-docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Electron Forge',
      logo: {
        alt: 'Electron Forge Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href: 'https://github.com/electron/forge',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://discord.com/invite/APGC3k5yaH',
          label: 'Discord',
          position: 'right',
        },
        {
          href: 'https://js.electronforge.io/',
          label: 'API',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.nightOwlLight,
      darkTheme: prismThemes.nightOwl,
      // theme: prismThemes.duotoneLight,
      // darkTheme: prismThemes.duotoneDark,
      additionalLanguages: ["json", "bash"]
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    require.resolve('docusaurus-lunr-search')
  ]
};

export default config;

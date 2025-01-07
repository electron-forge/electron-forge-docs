import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Electron Forge',
  tagline: 'Documentation for Electron Forge',
  favicon: 'img/favicon.ico',
  url: 'https://your-electron-forge-site.example.com',
  baseUrl: '/',
  organizationName: 'your-github-organization',  // Update with your GitHub org
  projectName: 'electron-forge-docs',  // Update with your repo name
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),  // Make sure to adjust this path
          editUrl: 'https://github.com/your-github-organization/electron-forge-docs/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/your-github-organization/electron-forge-docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',  // Adjust this to your sidebar ID
          position: 'left',
          label: 'Documentation',
        },
        { to: '/blog', label: 'Blog', position: 'left' }, // Remove if not needed
        {
          href: 'https://github.com/your-github-organization/electron-forge-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',  // Adjust to your first doc page
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/your-github-organization/electron-forge-docs',
            },
            {
              label: 'Discord',
              href: 'https://discord.com/invite/your-invite-link',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Electron Forge, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
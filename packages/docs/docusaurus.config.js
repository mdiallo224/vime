module.exports = {
  title: 'Vime',
  tagline: 'Build and customize your own media player with web components.',
  url: 'https://vimejs.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'vime-js',
  projectName: 'vime',
  themeConfig: {
    navbar: {
      title: 'Vime',
      logo: {
        alt: 'Vime Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'demo/',
          activeBasePath: 'demo',
          label: 'Demo',
          position: 'right',
        },
        {
          href: 'https://github.com/vime-js/vime',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          homePageId: 'introduction',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/vime-js/vime/edit/master/packages/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

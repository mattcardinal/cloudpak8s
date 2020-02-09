module.exports = {
  siteMetadata: {
    title: 'CloudPak Implementation Guide',
    description: 'CloudPak Implementation Residency Documentation',
    keywords: 'cloudpak, openshift, ocp4',
  },
  pathPrefix: `/cloudpak8s`,
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Carbon Design Gatsby Theme',
        short_name: 'Gatsby Theme Carbon',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#0062ff',
        display: 'browser',
      },
    },
    {
      resolve: 'gatsby-theme-carbon',
      options: {
        isSearchEnabled: true,
        repository: {
          baseUrl:
            'https://github.com/vbudi000/cloudpak8s',
          subDirectory: '',
        },
      },
    },
  ],
};

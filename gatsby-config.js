module.exports = {
  siteMetadata: {
    title: 'CloudPak Residency',
    description: 'A documentation of CloudPak implementation',
    keywords: 'cloudpak, openshift, ocp',
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
          baseUrl: 'https://github.com/vbudi000/cloudpak8s',
          subDirectory: '',
        },
      },
    },
  ],
};

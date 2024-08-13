const fs = require('fs');
const path = require('path');

const baseUrl = 'https://swrbackend.azurewebsites.net';  // Replace with your domain

const routes = [
  '/',
  '/login',
  '/signup',
  '/signupComapny',
  '/forgotpassword',
  '/resetPassword/:resetCode',
  '/jobs/application',
  '/setting',
  '/jobs/application/review',
  '/user/:id',
  '/contact',
  '/dashboard/jobapplied',
  '/notification-center',
  '/dashboard/notification',
  '/dashboard/savedjobs',
  '/application/overview',
  '/vuex',
  '/dashboard',
  '/users',
  '/skills',
  '/categories',
  '/jobs',
  '/about',
  '/job/:id',
  '/category/:id',
  '/findJob',
  '/category',  // Redirect /category to /categories in the sitemap
  '/not_authorized',
  '/terms_and_conditions',
  '/:pathName(.*)'  // 404 page
];

const generateSitemap = () => {
  const sitemapContent = createSitemapContent(routes);
  fs.writeFileSync(path.resolve(__dirname, 'public', 'sitemap.xml'), sitemapContent);
};

const createSitemapContent = (routes) => {
  const urls = routes.map(route => {
    // Replace dynamic parameters with example values (optional)
    const formattedRoute = route
      .replace(':id', 'example-id')
      .replace(':resetCode', 'example-resetCode')
      .replace(':pathName(.*)', 'not_found');

    const url = `${baseUrl}${formattedRoute}`;
    return `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('')}
</urlset>`;
};

generateSitemap();

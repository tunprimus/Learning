// @ts-check
/**
 * Adapted from "FullStack - How to create a working blogging website with pure HTML, CSS and JS in 2021."
 * @author Modern Web
 * @link https://dev.to/themodernweb/fullstack-how-to-create-a-working-blogging-website-with-pure-html-css-and-js-in-2021-9di/
 */

const blogSection = document.querySelector('.blog-section');

db.collection('blogs').get().then((blogs) => {
  blogs.forEach(blog => {
    if (blog.id !== decodeURI(location.pathname.split('/').pop())) {
      createBlog(blog);
    }
  });
});

const createBlog = (blog) => {
  let data = blog.data();
  blogSection.innerHTML += `
  <div class="blog-card">
    <img src="${data.bannerImage}" class="blog-image" alt="">
    <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
    <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
    <a href="/${blog.id}" class="btn heading-btn blog-btn dark">read</a>
  </div>
  `;
};

// @ts-check
/**
 * Adapted from "FullStack - How to create a working blogging website with pure HTML, CSS and JS in 2021."
 * @author Modern Web
 * @link https://dev.to/themodernweb/fullstack-how-to-create-a-working-blogging-website-with-pure-html-css-and-js-in-2021-9di/
 */

let blogId = decodeURI(location.pathname.split('/').pop());

let docRef = db.collection('blogs').doc(blogId);

docRef.get().then((doc) => {
  if (doc.exists) {
    setupBlog(doc.data());
  } else {
    location.replace('/')
  }
});

const setupBlog = (data) => {
  const banner = document.querySelector('.banner');
  const blogTitle = document.querySelector('.title');
  const titleTag = document.querySelector('title');
  const publish = document.querySelector('published');

  banner.style.backgroundImage = `url(${data.bannerImage})`;

  titleTag.innerHTML += blogTitle?.innerHTML = data.title;
  publish.innerHTML += data.publishedAt;

  const article = document.querySelector('article');
  addArticle(article, data.article);
};

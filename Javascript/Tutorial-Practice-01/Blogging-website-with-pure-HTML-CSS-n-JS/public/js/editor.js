// @ts-check
/**
 * Adapted from "FullStack - How to create a working blogging website with pure HTML, CSS and JS in 2021."
 * @author Modern Web
 * @link https://dev.to/themodernweb/fullstack-how-to-create-a-working-blogging-website-with-pure-html-css-and-js-in-2021-9di/
 */

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');

const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector('.banner');
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
  uploadImage(bannerImage, 'banner');
});

uploadInput.addEventListener('change', () => {
  uploadImage(uploadInput, 'image');
});

const uploadImage = (uploadFile, uploadType) => {
  const [file] = uploadFile.files;
  if (file && file.type.includes('image')) {
    const formdata = new FormData();
    formdata.append('image', file);

    fetch('/upload', {
      method: 'POST',
      body: formdata,
    }).then(res => res.json())
    .then(data => {
      if (uploadType === 'image') {
        addImage(data, file.name);
      } else {
        bannerPath = `${location.origin}/${data}`;
        banner.style.backgroundImage = `url('${bannerPath}')`;
      }
    });
  } else {
    alert('Upload image only');
  }
};

const addImage = (imagePath, alt) => {
  let curPos = articleField.selectionStart;
  let textToInsert = `\r![${alt}](${imagePath})\r`;
  articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

publishBtn?.addEventListener('click', () => {
  if (articleField.value.length && blogTitleField.value.length) {
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let blogTitle = blogTitleField.value.split(' ').join('-');
    let id = '';
    for (let i = 0; i < 4; i++) {
      id += letters[Math.floor(Math.random() * letters.length)];
    }

    let docName = `${blogTitle}-${id}`;
    let publishDate = new Date();

    db.collection('blog').doc(docName).set({
      title: blogTitleField.value,
      article: articleField.value,
      bannerImage: bannerPath,
      publishAt: `${publishDate.getDate()} ${months[publishDate.getMonth()]} ${publishDate.getFullYear()}`,
    }).then(() => {
      location.href = `/${docName}`;
    }).catch(err => {
      console.error(err);
    });
  }
});

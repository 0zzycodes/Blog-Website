const postLink = document.querySelectorAll('#post-link')
const blogTitle = document.querySelector('#blog-title')
const authorImage = document.querySelector('#author-image')
const blogAuthor = document.querySelector('#blog-author')
const blogDate = document.querySelectorAll('#blog-date')
const blogImage = document.querySelector('.post-image')
const blogContent = document.querySelector('#blog-content')
const blogTag = document.querySelector('#blog-tag')
const pageTag = document.querySelector('#page-tag')

const getFullPost = async () => {
    const post = JSON.parse(localStorage.getItem('post'))
    const {
        title,
        likes,
        views,
        updated_at,
        comment,
        date,
        image,
        tag,
        content
    } = post

    const convertedDate = new Date(updated_at * 1000).toUTCString()

    pageTag.textContent = tag.toUpperCase()
    blogTitle.textContent = title;
    blogContent.textContent = content;
    blogTag.textContent = tag.toUpperCase();
    authorImage.innerHTML = `<img src="${image}" alt="Profile Image">`
    blogImage.innerHTML = `<img src="${image}" alt="Blog Image" id="blog-image">`
    blogDate.forEach(item => item.textContent = convertedDate)
}
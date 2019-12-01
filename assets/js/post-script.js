const postLink = document.querySelectorAll('#post-link')
const blogTitle = document.querySelector('#blog-title')
const authorImage = document.querySelector('#author-image')
const blogAuthor = document.querySelector('#blog-author')
const blogDate = document.querySelectorAll('#blog-date')
const blogImage = document.querySelector('.post-image')
const blogContent = document.querySelector('#blog-content')
const blogTag = document.querySelector('#blog-tag')
const pageTag = document.querySelector('#page-tag')
const blogViews = document.querySelector('#blog-views')
const blogComments = document.querySelector('#blog-comments')
let Ip,
    blog_views = []

function getIP(json) {
    Ip = json.ip
}
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

    const view = {
        views: [Ip],
        id: title
    }
    database.collection("blog_views").doc(title).get().then(function (doc) {
        if (doc.exists) {
            doc.data().views.forEach(item => {
                if (item !== Ip) {
                    blog_views = doc.data().views
                    blog_views.push(Ip)
                    database.collection("blog").where("title", "==", doc.id).get().then(querySnapshot => {
                        querySnapshot.forEach((doc) => {
                            const updater = database.collection("blog").doc(doc.id)
                            updater.update({
                                views: blog_views.length
                            })
                        })
                    })
                }
            })

        } else {
            blog_views.push(Ip)
            database.collection("blog_views").doc(title).set(view)
            database.collection("blog").where("title", "==", doc.id).get().then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    const updater = database.collection("blog").doc(doc.id)
                    updater.update({
                        views: blog_views.length
                    })
                })
            })
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    const convertedDate = new Date(updated_at * 1000).toUTCString()
    pageTag.textContent = tag.toUpperCase()
    blogTitle.textContent = title;
    blogContent.textContent = content;
    blogViews.textContent = views;
    blogComments.textContent = comment;
    blogTag.innerHTML = `<small>CATEGORY: </small>${tag.toUpperCase()}`;
    authorImage.innerHTML = `<img src="${image}" alt="Profile Image">`
    blogImage.innerHTML = `<img src="${image}" alt="Blog Image" id="blog-image">`
    blogDate.forEach(item => item.textContent = convertedDate)
}
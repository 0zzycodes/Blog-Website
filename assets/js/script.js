const Output = document.querySelector('#outputs')
const aTag = document.querySelectorAll('.dropdown-menu a')
const categoryItem = document.querySelectorAll('.category-item')
// console.log(window.location);
// if (window.location.pathname === '/category-page.html')

aTag.forEach(item => {
    item.addEventListener('click', e => e.preventDefault())
})
const outputBlogPosts = querySnapshot => {
    querySnapshot.forEach((doc) => {
        const {
            title,
            views,
            likes,
            comments,
            content,
            image,
            tag
        } = doc.data()
        if (window.location.pathname === '/index.html')
            Output.innerHTML += `
                <div class="col-lg-4 col-md-6">
                    <div class="card h-100">
                        <div class="single-post post-style-1">
                            <div class="blog-image"><img src=${image}></div>
                            <div class="blog-info">
                                <h4 class="title"><a href="#"><b>${title}</b></a></h4>
                            <span class="badge badge-pill badge-warning">${tag}</span>
                                <ul class="post-footer">
                                    <li><a href="#"><i class="icon ion-md-heart"></i>${likes}</a></li>
                                    <li><a href="#"><i class="icon ion-md-chatbubbles"></i>${ comments?Object.keys(comments).length: 0 }</a></li>
                                    <li><a href="#"><i class="icon ion-md-eye"></i>${views}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                `
    })
}
const getBlogByCategory = async () => {
    const category = `${await localStorage.getItem('name')}`
    let blog = []
    database.collection("blog").where("tag", "==", category).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
            blog.push(doc.data())
        })
        localStorage.setItem('category', JSON.stringify(blog))
        window.location.pathname = '/category-page.html'
    })
}


const changeRoute = name => {
    localStorage.setItem('name', name)
    // CategoryOutput.innerHTML = ''
    return getBlogByCategory()
}

// categoryItem.forEach(item => {
//     item.addEventListener('click', changeRoute)
// })


database.collection("blog").get().then((querySnapshot) => {
    outputBlogPosts(querySnapshot)
})
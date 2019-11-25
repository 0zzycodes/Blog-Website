const CategoryOutput = document.querySelector('#category-outputs')
const categoryTitle = document.querySelector('#category-title')

const getCategoryBlogs = () => {
    categoryTitle.innerHTML = localStorage.getItem('name').toUpperCase()

    const categoryBlogs = JSON.parse(localStorage.getItem('category'))
    categoryBlogs.forEach((doc) => {
        const {
            title,
            views,
            likes,
            comments,
            content,
            image,
            tag
        } = doc
        CategoryOutput.innerHTML += `
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
    // const {
    //     title,
    //     views,
    //     likes,
    //     comments,
    //     content,
    //     image,
    //     tag
    // } = categoryBlogs

}
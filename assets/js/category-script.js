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
            tag,
            updated_at
        } = doc
        const date = new Date(updated_at.seconds * 1000),
            months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            currentMonth = months[date.getMonth()],
            currentDate = date.getDate()
        CategoryOutput.innerHTML += `
                        <div class="col-lg-4 col-md-6">
                            <div class="card h-100">
                                <div class="single-post post-style-1">
                                    <div class="blog-image">
                                        <img src=${image}>
                                        <button class="btn btn-primary btn-md date-created">
                                            ${currentDate}
                                            <br>
                                            ${currentMonth}
                                        </button>
                                        </div>
                                        <div class="blog-info">
                                        <h4 class="date" id="post-link"><a href="post-page.html" onclick="setPost('${title}', '${likes}', '${views}', '${updated_at.seconds}', '${comments}', '${image}', '${tag}', '${content}')"><b>${title}</b></a></h4>
                                        <h6 class="date author">by Jimoh Abdul-Rahman</h6>
                                        <span class="btn btn-tag btn-sm"> <strong>category:</strong> ${tag}</span>
                                        <ul class="post-footer">
                                            <li><a href="#" onclick="addLike('${title}')"><i class="icon ion-md-heart"></i>${likes}</a></li>
                                            <li><a href="#"><i class="icon ion-md-chatbubbles"></i>${comments}</a></li>
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
const Output = document.querySelector('#outputs')
const LoadMore = document.querySelector('#load-more')
document.querySelectorAll('.dropdown-menu a').forEach(removeDefault)
if (window.location.pathname === '/index.html')
    document.querySelector('.prevent a').addEventListener('click', e => e.preventDefault())
document.querySelectorAll('.footer-section a', '.post-footer a').forEach(removeDefault)
const categoryItem = document.querySelectorAll('.category-item')

function removeDefault(item) {
    item.addEventListener('click', e => e.preventDefault())
}
const setPost = (title, likes, views, updated_at, comment, image, tag, content) => {
    const post = {
        title,
        likes,
        views,
        updated_at,
        comment,
        image,
        tag,
        content
    }
    localStorage.setItem('post', JSON.stringify(post))
    localStorage.setItem('title', title)
    window.location.pathname = `/post-page.html`
}
const outputBlogPosts = querySnapshot => {
    querySnapshot.forEach((doc) => {
        const {
            title,
            views,
            likes,
            comments,
            content,
            image,
            tag,
            updated_at
        } = doc.data()

        const date = new Date(updated_at.seconds * 1000),
            months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            currentMonth = months[date.getMonth()],
            currentDate = date.getDate()
        if (window.location.pathname === '/index.html')
            Output.innerHTML += `
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
        const postATag = document.querySelectorAll('.single-post a')
        postATag.forEach(item => {
            item.addEventListener('click', e => e.preventDefault())
        })

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
let limit = 2,
    cLimit = 2

function getDataFromFirebase(limit) {
    const first = database.collection("blog").orderBy("updated_at")
    // .limit(2);
    first.get().then((querySnapshot) => {
        outputBlogPosts(querySnapshot)
    })

}
if (window.location.pathname === '/index.html')
    LoadMore.addEventListener('click', () => {
        let next = database.collection("blog")
            .orderBy("updated_at")
            .startAt(3)
            .limit(2);
        next.get().then((querySnapshot) => {
            outputBlogPosts(querySnapshot)
        })
        cLimit += limit
    })
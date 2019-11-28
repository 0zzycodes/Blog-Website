const commentArea = document.querySelector('#comment-output');
const commentNum = document.querySelector('.comment-num');
(async function () {
    const blogTitle = localStorage.getItem('title')
    const blogTitleString = JSON.stringify(blogTitle)
    Pusher.logToConsole = true;
    let serverUrl = 'http://localhost:9000/comment',
        oldComment = [],
        numComment = 0,
        comments = [],
        pusher = new Pusher('e57d1047972bccbd25e9', {
            cluster: 'eu',
            forceTLS: true
        }),
        channel = pusher.subscribe('blog'),
        commentForm = document.querySelector('#comment-form')

    channel.bind('comment', newCommentReceived);
    commentForm.addEventListener('submit', addNewComment);

    const docRef = database.collection("blog_comments").doc(blogTitle);

    function oldCommentReceived(firebaseData) {

        commentNum.innerHTML = `<b>COMMENTS(${firebaseData.length})</b>`
        firebaseData.forEach(item => {
            const {
                name,
                commented_at,
                comment
            } = item
            commentArea.innerHTML += `
        <div class="comment">
            <div class="post-info">
                <div class="">
                    <a class="name" href="#"><b>${name}</b></a>
                    <br>
                    <h6 class="date">${commented_at}</h6>
                </div>   
            </div>
            <p class="comment-text">${comment}</p>
        </div>
        `
        })
    }

    docRef.get().then(function (doc) {
        if (doc.exists) {
            oldCommentReceived(doc.data().comments)
            oldComment = doc.data().comments
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    })

    function newCommentReceived(data) {
        comments.push(data)
        const newComment = {
            id: blogTitle,
            comments: comments
        }

        const documentRef = database.collection("blog_comments").doc(blogTitle)

        documentRef.get().then(function (doc) {
            if (doc.exists) {
                oldComment = doc.data().comments
                oldComment.push(data)

                console.log("old", oldComment);

                numComment = oldComment.length
                commentNum.innerHTML = `<b>COMMENT(${numComment})</b>`
                const updater = database.collection("blog_comments").doc(blogTitle)
                updater.update({
                    comments: oldComment
                })

            } else {
                console.log("No such document!");
                database.collection("blog_comments").doc(blogTitle).set(newComment)
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
        database.collection("blog").where("title", "==", blogTitle).get().then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                const updaterTwo = database.collection("blog").doc(doc.id)
                updaterTwo.update({
                    comments: numComment
                })
            })
        })

        const {
            name,
            commented_at,
            comment
        } = data
        commentArea.innerHTML += `
        <div class="comment">
            <div class="post-info">
                <div class="">
                    <a class="name" href="#"><b>${name}</b></a>
                    <h6 class="date">${commented_at}</h6>
                </div>   
            </div>
            <p class="comment-text">${comment}</p>
        </div>
        `


    }

    function addNewComment(event) {
        event.preventDefault();
        const newComment = {
            name: document.querySelector('#new_comment_name').value,
            email: document.querySelector('#new_comment_email').value,
            comment: document.querySelector('#new_comment_text').value,
            commented_at: new Date().toUTCString()
        };
        fetch(serverUrl, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            })
            .then(response => response.json())
            .then(response => {
                console.log('Comment successful');

            })
    }
})();
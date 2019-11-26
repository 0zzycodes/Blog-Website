const commentArea = document.querySelector('#comment-output');
(function () {
    Pusher.logToConsole = true;
    let serverUrl = 'http://localhost:9000/comment',
        comments = [],
        pusher = new Pusher('e57d1047972bccbd25e9', {
            cluster: 'eu',
            forceTLS: true
        }),
        channel = pusher.subscribe('blog'),
        commentForm = document.querySelector('#comment-form')

    channel.bind('comment', newCommentReceived);
    commentForm.addEventListener('submit', addNewComment);


    function newCommentReceived(data) {
        comments.push(data)
        commentArea.innerHTML += `
        <div class="comment">
            <div class="post-info">
                <div class="">
                    <a class="name" href="#"><b>${data.name}</b></a>
                    <h6 class="date">${data.commented_at}</h6>
                </div>   
                <div class="right-area">
                    <h5 class="reply-btn" ><a href="#"><b>REPLY</b></a></h5>
                </div>   
            </div>
            <p class="comment-text">${data.comment}</p>
        </div>
        `
        console.log(data);
    }

    function addNewComment(event) {
        // const date = 
        event.preventDefault();
        const newComment = {
            name: document.querySelector('#new_comment_name').value,
            email: document.querySelector('#new_comment_email').value,
            comment: document.querySelector('#new_comment_text').value,
            commented_at: new Date().toUTCString()
        };
        console.log(event);


        fetch(serverUrl, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
    }
})();
// Initialize Cloud Firestore through Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBZSP7CF1qWOUtI7710O6eT_SJPzm2ow1k",
    authDomain: "blog-test-cf27d.firebaseapp.com",
    databaseURL: "https://blog-test-cf27d.firebaseio.com",
    projectId: "blog-test-cf27d",
    storageBucket: "blog-test-cf27d.appspot.com",
    messagingSenderId: "712716765117",
    appId: "1:712716765117:web:757aed783e2814d70eb4d4",
    measurementId: "G-3E2DRSVVNM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
const Output = document.querySelector('#outputs')
// window.addEventListener('load', () => {
//     console.log('load')
// })
database.collection("blog").get().then((querySnapshot) => {
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
    });
})
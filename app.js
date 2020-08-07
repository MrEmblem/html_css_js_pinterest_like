import PostsView from './componants/posts-view.js'
import LikesCounter from './componants/likesCounter.js'

customElements.define('likes-counter', LikesCounter)
customElements.define('posts-view', PostsView)
const main = document.querySelector('.grille')
const counter = document.querySelector('likes-counter')
let posts = []
let likedPosts = []

const getPosts = () => {
  fetch('http://127.0.0.1/rendu_1/api.php') // requête http
    .then((response) => {
      // réponse du serveur
      return response.json() // récupération du json dans la réponse et conversion en objet js
    })
    .then((json) => {
      // récupération de l’objet js
      
      posts = json

      json.forEach((post) => {
        const newElement = document.createElement('posts-view')
        newElement.post = post

        newElement.isliked = likedPosts.some(
          (likedPost) => likedPost === post.id
        )

        likeHandler(newElement)
        likeNumberUpdate()
        main.appendChild(newElement)
      })
    })
}


getPosts()

const likeNumberUpdate = () =>{
  let nbrlikes = likedPosts.length
  counter.setAttribute('nbrlikes',nbrlikes)
}

const likeHandler = (element) =>{
  element.addEventListener('like',(event) => {
    console.log('post:', event.detail.postId)
    console.log('liked:', event.detail.isliked)
    if (event.detail.isliked) {
      likedPosts.push(event.detail.postId)
    }
    else{
      
        
        likedPosts = likedPosts.filter((likedPost) => likedPost !== event.detail.postId)
        
      
        
    }
    likeNumberUpdate()
    console.log('post:', likedPosts)
  })
}

import PostsView from './componants/posts-view.js'
import LikesCounter from './componants/likesCounter.js'
import PostsFinder from './componants/post-finder.js'

customElements.define('likes-counter', LikesCounter)
customElements.define('posts-view', PostsView)
customElements.define('posts-finder', PostsFinder)
const main = document.querySelector('.grille')
const counter = document.querySelector('likes-counter')
const postfinder = document.querySelector('posts-finder')
let posts = []
let likedPosts = []
if (localStorage.getItem("likes") !== null) {
  likedPosts = JSON.parse(localStorage.getItem("likes"));
}

const getPosts = () => {
  fetch('http://127.0.0.1/rendu_1/api.php') // requête http
    .then((response) => {
      // réponse du serveur
      return response.json() // récupération du json dans la réponse et conversion en objet js
    })
    .then((json) => {
      // récupération de l’objet js
      
      posts = json

      posts.forEach((post) => {
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

counter.addEventListener('getlikes',(event) => {
  fetch('http://127.0.0.1/rendu_1/api.php') // requête http
    .then((response) => {
      // réponse du serveur
      return response.json() // récupération du json dans la réponse et conversion en objet js
    })
    .then((json) => {
      // récupération de l’objet js
      
      posts = json
      main.innerHTML = ''
      posts.forEach((post) => {
        if (likedPosts.includes(post.id)) {
        
          const newElement = document.createElement('posts-view')
          newElement.post = post

          newElement.isliked = likedPosts.some(
            (likedPost) => likedPost === post.id
          )
          
          likeHandler(newElement)
          likeNumberUpdate()
          main.appendChild(newElement)
        }
        

      })
      if (main.innerHTML == ''){
        console.log("ici")
        main.innerHTML = "<p>il n'y a aucun like sur les publications :(</p>";

      }

    })
})

postfinder.addEventListener('queryupdate',(event) => {
  const {querystring} = event.detail
  querypost(querystring)
})

const querypost = (query) => {

  fetch(`http://127.0.0.1/rendu_1/api.php?tag=${query}`) // requête http
    .then((response) => {
      // réponse du serveur
      return response.json() // récupération du json dans la réponse et conversion en objet js
    })
    .then((json) => {
      // récupération de l’objet js
      
      
      main.innerHTML = ''
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

const postfind = () => {
  counter.setAttribute('nbrlikes',input)
}

const storelike = () => {
  localStorage.setItem("likes", JSON.stringify(likedPosts));
}




const likeNumberUpdate = () =>{
  let nbrlikes = likedPosts.length
  counter.setAttribute('nbrlikes',nbrlikes)
}



const likeHandler = (element) =>{
  element.addEventListener('like',(event) => {
    
    if (event.detail.isliked) {
      likedPosts.push(event.detail.postId)
    }
    else{
      
        
        likedPosts = likedPosts.filter((likedPost) => likedPost !== event.detail.postId)
        
      
        
    }
    likeNumberUpdate()
    storelike()
  })

  
}

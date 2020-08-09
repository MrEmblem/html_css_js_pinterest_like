
export default class PostsView extends HTMLElement {
    

    
    
    constructor() {
        super()
        this.__root = this.attachShadow({
            mode: 'open'
        })
        console.log('constructeur de PostsView')
    }

    



    connectedCallback() {
        const { title, img, tags } = this.post

        const arraytags = tags.split(',')
        
        let contentTags = ''

        arraytags.forEach(tag => {
            contentTags = `${contentTags} <a href="#">#${tag}</a>`
        });

        this.__root.innerHTML = `
          <style>
            
            @import "./styles/shadow.css";
            
            
            
          </style>
          <div class="shadowbox">
                <h2><b>${title}</b></h2>
                <img src="./img/${img}" alt="image1">
                <p class="like red">
                    <img src="./img/icons8-heart-50.png">
                    <span>J’aime</span>
                </p>
                <p class='tags'>${contentTags}</p>
          </div>            
          
          `

        
        
        this.likeButton = this.__root.querySelector('.like')

        this.renderLike()
        
        this.likeButton.addEventListener('click', (event) => {
            
            this.isliked = !this.isliked
            this.renderLike()
            // Envoyer un événement personnalisé like ou pas like
            this.like()
        })



    }
    renderLike() {
                const imgLike = this.__root.querySelector('.like > img')
                const spanLike = this.__root.querySelector('.like > span')

                const like = './img/icons8-heart-50filled.png'
                const dislike = './img/icons8-heart-50.png'

                if (this.isliked) {
                    
                    spanLike.innerText = 'Je n’aime plus'
                    imgLike.src = like
                    this.likeButton.classList.add('gray')
                    this.likeButton.classList.remove('red')
                  } else {
                    spanLike.innerText =  "J'aime"
                    imgLike.src = dislike
                    this.likeButton.classList.remove('gray')
                    this.likeButton.classList.add('red')
                    
                  }
            }
            
    like(){
        const likeEvent = new CustomEvent('like', {
            detail: {
                postId: this.post.id,
                isliked: this.isliked,
            },
        })
        this.dispatchEvent(likeEvent)
    }
}

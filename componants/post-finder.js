
export default class PostFinder extends HTMLElement{

    constructor(){
        super()
        this.__root = this.attachShadow({
            mode: 'open'
        })
        this.update = null
        console.log('constructeur de Postsfinder')
    }

    
    
    connectedCallback() {

        this.__root.innerHTML =
        `
        <input type="search" placeholder="rechercher par hashtags" >
        `
        this.inputquery = this.__root.querySelector("input")

        this.inputquery.addEventListener("input",(event) => {

            console.log(this.inputquery.value)
            clearTimeout(this.update)

            this.update = setTimeout(() => {
                const updateEvent = new CustomEvent('queryupdate',{
                    detail: {
                        querystring: this.inputquery.value,
                    }
                });
                this.dispatchEvent(updateEvent)
                this.inputquery.value = ''
            } ,750)
        })

    }


}
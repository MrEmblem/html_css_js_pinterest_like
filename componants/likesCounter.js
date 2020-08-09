
export default class LikesCounter extends HTMLElement {

    constructor() {
        super()
        this.__root = this.attachShadow({
            mode: 'open'
        })
        console.log('constructeur de compteur')
    }

    static get observedAttributes() {
        return ['nbrlikes']
    }
    //TODO ajouter une fonction pour cliquer sur l'element et trier les posts likés
    //TODO Stocker les likes dans le local storage
    attributeChangedCallback(attribute, oldValue, newValue) {
        /* Une propriété portant le nom de l’attribut observé est
        ajoutée au composant. Si l’attribut transmis au composant
        s’appelle user, la propriété user est alors ajoutée
        au composant */
        this[attribute] = newValue
        this.__root.innerHTML = 
        
            `
            <style>
                span{
                    cursor: pointer;
                }
                
            </style>
            <span> <img src="./img/icons8-heart-50.png" style="width: 35px;"> ${newValue}</span>`

            this.counter = this.__root.querySelector('span')
        this.counter.addEventListener('click', (event) => {
            
            const counterEvent = new CustomEvent('getlikes', {
                detail: {
                    
                },
            })
            this.dispatchEvent(counterEvent)
        })
        /*
        1. Le premier argument de la méthode est le nom de l’attribut,
        2. le deuxième argument est l’ancienne valeur de l’attribut,
        3. le troisième argument est la nouvelle valeurr de l’attribut.
        */
        // console.log('attribute', attribute)
        // console.log('oldValue', oldValue)
        // console.log('newValue', newValue)
        }

    connectedCallback() {
        
    }
    


}
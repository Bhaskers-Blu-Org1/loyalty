class Account extends HTMLElement {

    constructor() {
        // Always call super first in constructor
        super();

        let template = document.getElementById('accountview');
        let templateContent = template.content;
  
        const shadow = this.attachShadow({mode: 'open'})
          .appendChild(templateContent.cloneNode(true));
    }
}

try {
    customElements.define('account-element', Account);
} catch (err) {
    const h3 = document.createElement('h3')
    h3.innerHTML = err
    document.body.appendChild(h3)
}
class Btn2 extends HTMLElement {
  constructor() {
    super()
    // shallow DOM: 样式隔离
    const shallowDom = this.attachShadow({ mode: 'open' })
    this.template = this.h('template')
    this.template.innerHTML = `
      <style>
      p {
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
      }
      </style>
      <p>d2vue Btn2</p>`
    shallowDom.appendChild(this.template.content.cloneNode(true))
  }

  h /**HyperScript */(el) {
    return document.createElement(el)
  }

  connectedCallback() {
    console.log('Connected')
  }

  disconnectedCallback() {
    console.log('Disconnect')
  }

  adoptedCallback() {
    console.log('Adopted')
  }

  attributeChangedCallback() {
    console.log('Attribute changed')
  }
}

window.customElements.define('d2vue-btn2', Btn2)

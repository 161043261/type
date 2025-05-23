class Btn extends HTMLElement {
  constructor() {
    super();
    // shallow DOM: 样式隔离
    const shallowDom = this.attachShadow({ mode: "open" });
    this.p = this.h("p");
    this.p.innerText = "d2vue Btn";
    this.p.setAttribute(
      "style",
      `width: 100px;
       height: 30px;
       line-height: 30px;
       text-align: center;
       border: 1px solid #ccc;
       border-radius: 5px;
       cursor: pointer;
       `,
    );
    shallowDom.appendChild(this.p);
  }

  h /**HyperScript */(el) {
    return document.createElement(el);
  }
}

window.customElements.define("d2vue-btn", Btn);

class RefreshButton extends HTMLElement {
  #eventListener;

  set eventListener(event) {
    this.#eventListener = event;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    this.classList.add("refresh-button");

    const wrapper = document.createElement("div");
    wrapper.classList.add("refresh-container");

    const button = document.createElement("button");
    button.classList.add("refresh-element");
    button.innerHTML = `
      Refresh
    `;
    button.addEventListener("click", this.#eventListener);

    const style = document.createElement("style");
    style.textContent = `
      .refresh-container{
        display: flex;
        justify-content: center;
        margin: 50px;
      }
      .refresh-element{
        background: #8a2be2;
        padding: 8px;
        border-radius: 8px;
        color: #FFFFFF;
        border: none;
        cursor: pointer;
      }
    `;

    wrapper.appendChild(button);
    shadow.appendChild(wrapper);
    shadow.appendChild(style);
  }
}

customElements.define("refresh-button", RefreshButton);

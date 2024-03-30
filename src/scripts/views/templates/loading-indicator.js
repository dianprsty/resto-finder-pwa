class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.classList.add("loading-container");

    const indicator = document.createElement("div");
    indicator.classList.add("loading-element");

    this.classList.add("loading-indicator");

    const style = document.createElement("style");
    style.textContent = `
    .loading-container {
      display: flex;
      justify-content: center;
      margin: 50px;
    }

    .loading-element{
      width: 24px;
      height: 24px;
      border: 4px solid #8a2be2;
      border-right: 4px solid #ecd0ff;
      border-radius: 50%;
      animation: spin 1s infinite linear;
    }

    @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
    }
    `;

    wrapper.appendChild(indicator);
    shadow.appendChild(wrapper);
    shadow.appendChild(style);
  }
}

customElements.define("loading-indicator", LoadingIndicator);

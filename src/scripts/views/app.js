import routes from "../routes/routes";
import urlParser from "../routes/url-parser";
import DrawerInitiator from "../utils/drawer-initiator";

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = urlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipToContent = document.getElementById("skip-link");
    const mainContent = document.getElementById("content");
    skipToContent.addEventListener("click", (event) => {
      event.preventDefault();
      mainContent.focus();
    });
  }
}

export default App;

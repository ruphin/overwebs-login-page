import { GluonElement, html } from '../gluonjs/gluon.js';
import '../overwebs-button/overwebs-button.js';
import '../overwebs-fonts/overwebs-fonts.js';

class OverwebsLoginPage extends GluonElement {
  get template() {
    // TODO: Migrate to --overwebs-window-size
    return html`
    <style>
    :host {
      display: flex;
      flex-flow: column;
      position: relative;
      overflow: auto;
      width: 100vw;
      height: 100vh;
      align-items: center;
      justify-content: flex-end;
      letter-spacing: calc(1 / 2560 * var(--overwebs-window-size, 1920px));
    }
    #form {
      width: calc(400 / 2560 * var(--overwebs-window-size, 1920px));
      display: flex;
      flex-flow: column;
      margin-bottom: calc(88 / 2560 * var(--overwebs-window-size, 1920px));
    }
    label {
      margin-bottom: calc(14 / 2560 * var(--overwebs-window-size, 1920px));
      font-family: overwebs-futura;
      font-size: calc(24 / 2560 * var(--overwebs-window-size, 1920px));
      color: #FFFFFF;
      text-align: center;
      text-transform: uppercase;
      pointer-events: none;
    }
    #input {
      height: calc(66 / 2560 * var(--overwebs-window-size, 1920px));
      margin-bottom: calc(47 / 2560 * var(--overwebs-window-size, 1920px));
      background: #D1D1D4;
      border-radius: calc(9 / 2560 * var(--overwebs-window-size, 1920px));
      border: none;
      text-align: center;
      font-family: overwebs-futura;
      font-size: calc(28 / 2560 * var(--overwebs-window-size, 1920px));
      transition: background-color linear 0.08s;
      box-shadow: inset 0 0 calc(1 / 2560 * var(--overwebs-window-size, 1920px)) calc(2 / 2560 * var(--overwebs-window-size, 1920px)) #FFFFFF;
    }
    #input:hover, #input:focus {
      background: #FFFFFF;
    }
    #input:focus {
      outline: none;
      box-shadow: inset 0 0 calc(1 / 2560 * var(--overwebs-window-size, 1920px)) calc(2 / 2560 * var(--overwebs-window-size, 1920px)) #FFFFFF, 0 0 0 calc(1 / 2560 * var(--overwebs-window-size, 1920px)) #FFFFFF;
    }
    #loginButton {
      margin-bottom: calc(47 / 2560 * var(--overwebs-window-size, 1920px));
    }
    </style>
    <form id="form" action="/main" method="get">
      <label for="input">Username</label>
      <input type="text" id="input" pattern="^[a-zA-Z]+(#[0-9]+)?$" autofocus></input>
      <overwebs-button block big bigtext yellow id="loginButton" disabled><button type="submit">Login</button></overwebs-button>
      <overwebs-button block big bigtext yellow id="anonymousButton"><button type="submit">Anonymous</button></overwebs-button>
    </form>
    `;
  }

  constructor() {
    super();
    this.loginValid = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.input.addEventListener('input', () => this._inputChanged());

    this.$.form.addEventListener('submit', e => {
      e.preventDefault();
      this._login();
    });
  }

  get _anonymous() {
    return this.$.input.value === '' || !this.$.input.validity.valid;
  }

  _login() {
    if (this._anonymous) {
      this.dispatchEvent(new CustomEvent('login', { detail: { anonymous: true } }));
    } else {
      let [userName, battleTag] = this.$.input.value.split('#');
      this.dispatchEvent(new CustomEvent('login', { detail: { userName: userName, battleTag: `${userName}#${battleTag}` } }));
    }
  }

  _inputChanged() {
    if (this._anonymous) {
      this.$.loginButton.setAttribute('disabled', '');
      this.$.anonymousButton.removeAttribute('disabled');
    } else {
      this.$.loginButton.removeAttribute('disabled');
      this.$.anonymousButton.setAttribute('disabled', '');
    }
  }
}

customElements.define(OverwebsLoginPage.is, OverwebsLoginPage);

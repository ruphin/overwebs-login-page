import { GluonElement, html } from '../gluonjs/gluon.js';
import '../overwebs-button/overwebs-button.js';
import '../overwebs-loading-spinner/overwebs-loading-spinner.js';
import '../overwebs-fonts/overwebs-fonts.js';

class OverwebsLoginPage extends GluonElement {
  get template() {
    return html`
    <style>
    :host {
      display: flex;
      flex-flow: column;
      position: fixed;
      overflow: hidden;
      width: 100%;
      min-height: 100%;
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
    overwebs-loading-spinner {
      margin-bottom: calc(22 / 2560 * var(--overwebs-window-size, 1920px));
    }
    label, .loadingMessage {
      margin-bottom: calc(14 / 2560 * var(--overwebs-window-size, 1920px));
      font-family: overwebs-futura;
      font-size: calc(24 / 2560 * var(--overwebs-window-size, 1920px));
      color: #FFFFFF;
      text-align: center;
      text-transform: uppercase;
      pointer-events: none;
    }
    overwebs-button, input {
      width: 100%;
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
    :host(:not([logging-in])) .loggingIn, :host([logging-in]) .notLoggingIn {
      display: none;
    }

    .loggingIn, .notLoggingIn {
      display: flex;
      flex-flow: column;
      align-items: center;
    }

    </style>
    <form id="form" action="/main" method="get">
      <div class="loggingIn">
        <overwebs-loading-spinner white size="64"></overwebs-loading-spinner>
        <div class="loadingMessage">Connecting...</div>
        <overwebs-button block big bigtext yellow id="cancelButton"><button type="submit">Cancel</button></overwebs-button>
      </div>
      <div class="notLoggingIn">
        <label for="input">Username</label>
        <input type="text" id="input" pattern="^[a-zA-Z]+(#[0-9]+)?$" autofocus autocomplete="off"></input>
        <overwebs-button block big bigtext yellow id="loginButton" disabled><button type="submit">Login</button></overwebs-button>
        <overwebs-button block big bigtext yellow id="anonymousButton"><button type="submit">Anonymous</button></overwebs-button>
      </div>
    </form>
    `;
  }

  constructor() {
    super();
    this.loginValid = false;
  }

  static get observedAttributes() {
    return ['logging-in'];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === 'logging-in') {
      this.render();
    }
  }

  get loggingIn() {
    return this.getAttribute('logging-in') !== null;
  }

  set loggingIn(value) {
    if (value) {
      this.setAttribute('logging-in', '');
    } else {
      this.removeAttribute('logging-in');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.$.form.addEventListener('submit', e => {
      console.log('SUBMIT');
      e.preventDefault();
      this._login();
    });

    this.addEventListener('input', () => this._inputChanged());
  }

  get _anonymous() {
    return this.$.input.value === '' || !this.$.input.validity.valid;
  }

  _login() {
    console.log('test');
    if (this.loggingIn) {
      this.dispatchEvent(new Event('cancelLogin'));
      this.removeAttribute('logging-in');
    } else {
      if (this._anonymous) {
        this.dispatchEvent(new CustomEvent('login', { detail: { anonymous: true } }));
      } else {
        let [userName, battleTag] = this.$.input.value.split('#');
        this.dispatchEvent(new CustomEvent('login', { detail: { userName: userName, battleTag: battleTag } }));
      }
      this.setAttribute('logging-in', '');
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

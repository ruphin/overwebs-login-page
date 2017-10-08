import{GluonElement,html}from'../gluonjs/gluon.js';import'../overwebs-button/overwebs-button.js';import'../overwebs-fonts/overwebs-fonts.js';class OverwebsLoginPage extends GluonElement{get template(){return html`
    <style>
    :host {
      display: flex;
      flex-flow: column;
      position: fixed;
      overflow: hidden;
      width: 100%;
      height: 100%;
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
    `}constructor(){super(),this.loginValid=!1}connectedCallback(){super.connectedCallback(),this.$.input.addEventListener('input',()=>this._inputChanged()),this.$.form.addEventListener('submit',(a)=>{a.preventDefault(),this._login()})}get _anonymous(){return''===this.$.input.value||!this.$.input.validity.valid}_login(){if(this._anonymous)this.dispatchEvent(new CustomEvent('login',{detail:{anonymous:!0}}));else{let[a,b]=this.$.input.value.split('#');this.dispatchEvent(new CustomEvent('login',{detail:{userName:a,battleTag:b}}))}}_inputChanged(){this._anonymous?(this.$.loginButton.setAttribute('disabled',''),this.$.anonymousButton.removeAttribute('disabled')):(this.$.loginButton.removeAttribute('disabled'),this.$.anonymousButton.setAttribute('disabled',''))}}customElements.define(OverwebsLoginPage.is,OverwebsLoginPage);
//# sourceMappingURL=overwebs-login-page.js.map

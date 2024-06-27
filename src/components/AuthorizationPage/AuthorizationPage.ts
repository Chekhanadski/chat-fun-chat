import Router from '../../Router';
import Button from '../Button/Button';
import './styles.css';

interface Page {
  init: () => void;
}

export default class AuthenticationPage implements Page {
  private router: Router;

  private container: HTMLDivElement;

  private header: HTMLHeadingElement;

  private form: HTMLFormElement;

  private nameInputGroup: HTMLDivElement;

  private passwordInputGroup: HTMLDivElement;

  private nameInput!: HTMLInputElement;

  private passwordInput!: HTMLInputElement;

  private authActions: HTMLDivElement;

  private loginButton: Button;

  private infoButton: HTMLButtonElement;

  private nameError!: HTMLSpanElement;

  private passwordError!: HTMLSpanElement;

  constructor(router: Router) {
    this.router = router;
    this.container = document.createElement('div');
    this.header = document.createElement('h2');
    this.form = document.createElement('form');
    this.nameInputGroup = this.createInputGroup('Name', 'Enter name');
    this.passwordInputGroup = this.createInputGroup(
      'Password',
      'Enter password',
      'password',
    );
    this.authActions = document.createElement('div');
    this.loginButton = new Button('Log in to the app', 'login-btn');
    this.infoButton = AuthenticationPage.createButton('Info', 'info-btn');

    this.loginButtonClickHandler = this.loginButtonClickHandler.bind(this);
  }

  init() {
    this.loginButton.element.disabled = true;
    this.loginButton.element.style.backgroundColor = '#cccccc';

    this.container.className = 'auth-container';
    this.container.append(this.header);

    this.header.textContent = 'Authentication';
    this.header.className = 'auth-header';

    this.container.append(this.form);
    this.form.append(this.nameInputGroup);
    this.form.append(this.passwordInputGroup);

    this.authActions.className = 'auth-actions';
    this.form.append(this.authActions);

    this.loginButton.render(this.authActions);
    this.loginButton.element.removeEventListener(
      'click',
      this.loginButtonClickHandler,
    );
    this.loginButton.element.addEventListener(
      'click',
      this.loginButtonClickHandler,
    );

    this.infoButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '#/info';
    });
    this.authActions.append(this.infoButton);

    document.body.append(this.container);

    this.nameInput.addEventListener('input', () => {
      if (
        this.nameInput.value &&
        this.nameInput.value.length > 4 &&
        this.nameInput.value[0] === this.nameInput.value[0].toUpperCase() &&
        this.passwordInput.value.length > 4 &&
        /[a-z]/.test(this.passwordInput.value) &&
        /[A-Z]/.test(this.passwordInput.value)
      ) {
        this.loginButton.element.disabled = false;
        this.loginButton.element.style.backgroundColor = '';
      } else {
        this.loginButton.element.disabled = true;
        this.loginButton.element.style.backgroundColor = '#cccccc';
      }
    });

    this.passwordInput.addEventListener('input', () => {
      const latinLetterCheck = /^[A-Za-z0-9]+$/;
      if (
        this.nameInput.value.length > 4 &&
        this.nameInput.value[0] === this.nameInput.value[0].toUpperCase() &&
        this.passwordInput.value.length > 4 &&
        /[a-z]/.test(this.passwordInput.value) &&
        /[A-Z]/.test(this.passwordInput.value) &&
        latinLetterCheck.test(this.passwordInput.value)
      ) {
        this.loginButton.element.disabled = false;
        this.loginButton.element.style.backgroundColor = '';
        this.passwordError.textContent = '';
      } else {
        this.loginButton.element.disabled = true;
        this.loginButton.element.style.backgroundColor = '#cccccc';
        if (!latinLetterCheck.test(this.passwordInput.value)) {
          this.passwordError.textContent =
            'Enter only Latin letters and numbers';
        } else if (this.passwordInput.value.length <= 4) {
          this.passwordError.textContent =
            'Password must be more than 4 characters';
        } else if (
          !(
            /[a-z]/.test(this.passwordInput.value) &&
            /[A-Z]/.test(this.passwordInput.value)
          )
        ) {
          this.passwordError.textContent =
            'Use both lowercase and uppercase letters';
        }
      }
    });
  }

  loginButtonClickHandler(e: Event) {
    e.preventDefault();
    const login = this.nameInput.value;
    const password = this.passwordInput.value;
    this.router.authenticateUser(login, password);
    window.location.href = '#/chat';
    this.nameInput.value = '';
    this.passwordInput.value = '';
  }

  createInputGroup(
    labelText: string,
    placeholder: string,
    type: string = 'text',
  ): HTMLDivElement {
    const group = document.createElement('div');
    group.className = 'input-group';

    const label = document.createElement('label');
    label.textContent = labelText;
    group.append(label);

    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    group.append(input);

    const error = document.createElement('span');
    error.className = 'error-message';
    group.append(error);

    input.addEventListener('input', () => {
      if (labelText === 'Name') {
        if (input.value[0] && input.value[0] !== input.value[0].toUpperCase()) {
          error.textContent = 'Name must start with a capital letter';
        } else if (input.value.length <= 4) {
          error.textContent = 'Name must be more than 4 characters';
        } else {
          error.textContent = '';
        }
      } else if (labelText === 'Password') {
        if (input.value.length <= 4) {
          error.textContent = 'Password must be more than 4 characters';
        } else if (!(/[a-z]/.test(input.value) && /[A-Z]/.test(input.value))) {
          error.textContent = 'Use both lowercase and uppercase letters';
        } else {
          error.textContent = '';
        }
      }
    });

    if (labelText === 'Name') {
      this.nameInput = input;
      this.nameError = error;
    } else if (labelText === 'Password') {
      this.passwordInput = input;
      this.passwordError = error;
    }

    return group;
  }

  static createButton(text: string, className: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    return button;
  }
}

window.onload = () => {
  const router = new Router();
  const authPage = new AuthenticationPage(router);
  authPage.init();
};

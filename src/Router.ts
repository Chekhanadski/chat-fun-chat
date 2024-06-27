import AuthenticationPage from './components/AuthorizationPage/AuthorizationPage';
import ChatPage from './components/ChatPage/ChatPage';
import InfoPage from './components/InfoPage/InfoPage';
import Modal from './components/Modal/Modal';

export interface Page {
  init: () => void;
}

export default class Router {
  routes: Record<string, Page>;

  socket: WebSocket;

  isAuthenticated: boolean;

  currentUser: string | null;

  currentPassword: string | null;

  private modal: Modal;

  constructor() {
    this.modal = new Modal();

    this.socket = new WebSocket('ws://127.0.0.1:4000/');

    this.socket.addEventListener('close', () => {
      const modal = new Modal();
      modal.show('Connection lost. Trying to reconnect...');
      this.reconnect();
    });

    this.socket = new WebSocket('ws://127.0.0.1:4000/');

    this.currentUser = sessionStorage.getItem('currentUser');
    this.currentUser = null;
    this.currentPassword = null;

    this.routes = {
      '#/': new AuthenticationPage(this),
      '#/chat': new ChatPage(
        this.currentUser || 'userDefault',
        this.currentPassword || 'passwordDefault',
        this,
      ),
      '#/info': new InfoPage(this),
    };
    this.isAuthenticated = false;
    window.addEventListener('hashchange', () =>
      this.navigate(window.location.hash),
    );
    this.navigate(window.location.hash);

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'USER_LOGIN') {
        this.isAuthenticated = data.payload.user.isLogined;
        sessionStorage.setItem('isAuthenticated', 'true');
        this.currentUser = data.payload.user.login;
        this.routes['#/chat'] = new ChatPage(
          this.currentUser || 'empty',
          this.currentPassword || 'empty',
          this,
        );
        window.location.href = '#/chat';
      } else if (data.type === 'ERROR') {
        this.isAuthenticated = false;
        const modal = new Modal();
        modal.show(data.payload.error);
      }
    });

    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      this.isAuthenticated = true;
      window.location.href = '#/chat';
    } else {
      this.isAuthenticated = false;
      window.location.href = '#/';
    }

    this.socket.addEventListener('open', () => {
      this.getUsers();
    });
  }

  reconnect() {
    const interval = setInterval(() => {
      if (this.socket.readyState === WebSocket.CLOSED) {
        this.socket = new WebSocket('ws://127.0.0.1:4000/');
        this.socket.addEventListener('open', () => {
          if (this.currentUser !== null && this.currentPassword !== null) {
            this.authenticateUser(this.currentUser, this.currentPassword);
          }
          this.modal.close();
          clearInterval(interval);
        });
      }
    }, 1000);
  }

  static generateUniqueId() {
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => `0${dec.toString(16)}`.substr(-2)).join(
      '',
    );
  }

  getUsers() {
    const activeUsersMessage = {
      id: Router.generateUniqueId(),
      type: 'USER_ACTIVE',
      payload: null,
    };

    const inactiveUsersMessage = {
      id: Router.generateUniqueId(),
      type: 'USER_INACTIVE',
      payload: null,
    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(activeUsersMessage));
      this.socket.send(JSON.stringify(inactiveUsersMessage));
    }
  }

  markMessageAsRead(messageId: string) {
    const readStatusRequest = {
      id: Router.generateUniqueId(),
      type: 'MSG_READ',
      payload: {
        message: {
          id: messageId,
        },
      },
    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(readStatusRequest));
    }
  }

  authenticateUser(login: string, password: string) {
    const authMessage = {
      id: login,
      type: 'USER_LOGIN',
      payload: {
        user: {
          login,
          password,
        },
      },
    };

    sessionStorage.setItem('currentPassword', password);
    sessionStorage.setItem('currentUser', login);

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(authMessage));
    }
  }

  logoutUser() {
    this.currentUser = sessionStorage.getItem('currentUser') || '';
    this.currentPassword = sessionStorage.getItem('currentPassword') || '';

    const logoutMessage = {
      id: this.currentUser,
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login: this.currentUser,
          password: this.currentPassword,
        },
      },
    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(logoutMessage));
    } else {
      throw new Error(
        `Socket is not open. Current state is: ${this.socket.readyState}`,
      );
    }

    this.isAuthenticated = false;
    sessionStorage.setItem('isAuthenticated', 'false');
  }

  getMessageHistory(userLogin: string) {
    const messageHistoryRequest = {
      id: Router.generateUniqueId(),
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login: userLogin,
        },
      },
    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(messageHistoryRequest));
    }
  }

  navigate(hash: string) {
    if (hash === '#/chat') {
      if (!this.isAuthenticated) {
        window.location.hash = '#/';
        return;
      }
    }
    const page = this.routes[hash];
    if (page) {
      document.body.innerHTML = '';
      page.init();
    } else {
      window.location.hash = '#/';
    }
  }
}

import './styles.css';
import Button from '../Button/Button';
import Router from '../../Router';

interface User {
  login: string;
  isLogined: boolean;
}

interface Message {
  from: string;
  datetime: string;
  text: string;
  isDelivered: boolean;
}

export default class ChatPage {
  private wrapper: HTMLElement;

  private header: HTMLElement;

  private footer: HTMLElement;

  private userDiv: HTMLElement;

  private userSpan: HTMLElement;

  private userNameSpan: HTMLElement;

  private headerBtnBlock: HTMLElement;

  private chatName: HTMLElement;

  private chatNameSpan: HTMLElement;

  private mainBlock: HTMLElement;

  private users: HTMLElement;

  private searchUserForm: HTMLElement;

  private inputSearchUser: HTMLInputElement;

  private userList: HTMLElement;

  private messageBlock: HTMLElement;

  private currentUserBlock: HTMLElement;

  private currentUserName: HTMLElement;

  private currentStatusUser: HTMLElement;

  private messages: HTMLElement;

  private formMessages: HTMLElement;

  private inputMessages: HTMLInputElement;

  private infoBtn: Button;

  private exitBtn: Button;

  private sendBtn: Button;

  private currentUser: string;

  private currentPassword: string;

  private router: Router;

  private logoBlock: HTMLElement;

  private myGitHubBlock: HTMLElement;

  private yearBlock: HTMLElement;

  private myGitHub: HTMLAnchorElement;

  private selectedUser!: string;

  messageHandlerAdded = false;

  constructor(currentUser: string, currentPassword: string, router: Router) {
    this.currentUser = currentUser;
    this.currentPassword = currentPassword;
    this.router = router;

    this.wrapper = document.createElement('div');
    this.wrapper.className = 'wrapper';

    this.header = document.createElement('header');
    this.header.className = 'header';

    this.userDiv = document.createElement('div');
    this.userDiv.classList.add('user', 'inner-header-elem');

    this.userSpan = document.createElement('span');
    this.userSpan.textContent = 'User:';

    this.userNameSpan = document.createElement('span');
    this.userNameSpan.classList.add('user-name');
    this.userNameSpan.textContent = ` ${this.currentUser}`;

    this.headerBtnBlock = document.createElement('div');
    this.headerBtnBlock.classList.add('header-Btn-block', 'inner-header-elem');

    this.chatName = document.createElement('div');
    this.chatName.className = 'chat-name';

    this.chatNameSpan = document.createElement('span');
    this.chatNameSpan.textContent = 'Fun Chat';

    this.infoBtn = new Button('Info', 'btn');
    this.exitBtn = new Button('Exit', 'btn');

    this.mainBlock = document.createElement('main');
    this.mainBlock.className = 'main-block';

    this.users = document.createElement('aside');
    this.users.className = 'users';

    this.searchUserForm = document.createElement('form');
    this.searchUserForm.className = 'search-user';

    this.inputSearchUser = document.createElement('input');
    this.inputSearchUser.className = 'input-search-user';
    this.inputSearchUser.type = 'text';
    this.inputSearchUser.placeholder = 'search user...';

    this.userList = document.createElement('ul');
    this.userList.className = 'user-list';

    this.messageBlock = document.createElement('div');
    this.messageBlock.className = 'message-block';

    this.currentUserBlock = document.createElement('div');
    this.currentUserBlock.className = 'current-user-block';

    this.currentUserName = document.createElement('div');
    this.currentUserName.className = 'current-user';
    this.currentUserName.textContent = '';

    this.currentStatusUser = document.createElement('div');
    this.currentStatusUser.className = 'current-status-user';

    this.currentStatusUser.textContent = '';

    this.messages = document.createElement('div');
    this.messages.className = 'messages';

    this.formMessages = document.createElement('form');
    this.formMessages.className = 'form-messages';

    this.inputMessages = document.createElement('input');
    this.inputMessages.className = 'input-messages';
    this.inputMessages.type = 'text';
    this.inputMessages.placeholder = 'message...';

    this.sendBtn = new Button('Send', 'btn');

    this.footer = document.createElement('footer');
    this.footer.className = 'footer';

    this.logoBlock = document.createElement('div');
    this.logoBlock.className = 'logo-block';
    this.logoBlock.textContent = 'RSScool';

    this.myGitHubBlock = document.createElement('div');
    this.myGitHubBlock.className = 'current-status-user';

    this.myGitHub = document.createElement('a');
    this.myGitHub.className = 'myGitHub';
    this.myGitHub.href = 'https://github.com/Chekhanadski';
    this.myGitHub.textContent = 'Chekhanadski Andrei';
    this.myGitHubBlock.append(this.myGitHub);

    this.yearBlock = document.createElement('div');
    this.yearBlock.className = 'yearBlock';
    this.yearBlock.textContent = '2024';
  }

  createMessageElement(message: Message) {
    const messageElement = document.createElement('div');

    if (message.from === this.currentUser) {
      messageElement.className = 'message message-outgoing';
    } else {
      messageElement.className = 'message message-incoming';
    }

    const senderElement = document.createElement('div');
    senderElement.className = 'message-sender';
    senderElement.textContent =
      message.from === this.currentUser ? 'YOU' : message.from;

    const datetimeElement = document.createElement('div');
    datetimeElement.className = 'message-datetime';
    datetimeElement.textContent = message.datetime;

    const textElement = document.createElement('div');
    textElement.className = 'message-text';
    textElement.textContent = message.text;

    const statusElement = document.createElement('div');
    statusElement.className = 'message-status';

    if (message.from === this.currentUser) {
      statusElement.textContent = message.isDelivered ? 'delivered' : 'sent';
    }

    messageElement.append(senderElement);
    messageElement.append(datetimeElement);
    messageElement.append(textElement);
    messageElement.append(statusElement);

    this.messages.append(messageElement);
    messageElement.scrollIntoView();
  }

  logoutUser() {
    this.router.logoutUser();
  }

  updateUserList(users: User[], currentUser: string) {
    this.userList.innerHTML = '';

    users.forEach((user: User) => {
      if (user.login !== currentUser) {
        const userListItem = document.createElement('li');

        const statusIndicator = document.createElement('span');
        statusIndicator.style.width = '10px';
        statusIndicator.style.height = '10px';
        statusIndicator.style.borderRadius = '50%';
        statusIndicator.style.display = 'inline-block';
        statusIndicator.style.marginRight = '5px';

        if (user.isLogined) {
          statusIndicator.style.backgroundColor = 'green';
        } else {
          statusIndicator.style.backgroundColor = 'red';
        }

        userListItem.append(statusIndicator);
        userListItem.append(document.createTextNode(user.login));

        const unreadCount = document.createElement('span');
        unreadCount.className = 'unread-count';
        unreadCount.textContent = '0';

        userListItem.append(unreadCount);

        this.sendBtn.element.disabled = true;
        this.sendBtn.element.classList.add('disabled');

        userListItem.addEventListener('click', () => {
          const currentUserDiv = document.querySelector('.current-user');
          const statusCurrentUserDiv = document.querySelector(
            '.current-status-user',
          );
          if (currentUserDiv && statusCurrentUserDiv) {
            currentUserDiv.textContent = user.login;
            statusCurrentUserDiv.textContent = user.isLogined
              ? 'online'
              : 'offline';
            this.selectedUser = user.login;

            this.messages.innerHTML = '';
            const firstMessage = document.createTextNode(
              'Write your first message...',
            );
            this.messages.appendChild(firstMessage);
            this.messages.classList.add('center-text');

            this.sendBtn.element.disabled = true;
            this.sendBtn.element.classList.add('disabled');
          }

          this.inputMessages.disabled = false;
          if (this.messages.textContent === 'Please select a recipient...') {
            this.messages.textContent = '';
            this.messages.classList.remove('center-text');
          }
          this.router.getMessageHistory(this.selectedUser);
        });
        this.userList.append(userListItem);
      }
    });
  }

  sendMessage = (e: Event) => {
    e.preventDefault();

    const messageText = this.inputMessages.value;

    if (!messageText) {
      return;
    }

    const messageToSend = {
      id: Router.generateUniqueId(),
      to: this.selectedUser,
      text: messageText,
    };

    if (this.router.socket.readyState === WebSocket.OPEN) {
      this.router.socket.send(
        JSON.stringify({
          id: Router.generateUniqueId(),
          type: 'MSG_SEND',
          payload: { message: messageToSend },
        }),
      );
    }

    this.inputMessages.value = '';
  };

  init() {
    this.userDiv.append(this.userSpan);
    this.userDiv.append(this.userNameSpan);
    this.header.append(this.userDiv);

    this.chatName.append(this.chatNameSpan);
    this.header.append(this.chatName);
    this.infoBtn.render(this.headerBtnBlock);
    this.infoBtn.onClick(() => {
      window.location.href = '#/info';
    });
    this.exitBtn.render(this.headerBtnBlock);

    this.header.append(this.headerBtnBlock);

    this.searchUserForm.append(this.inputSearchUser);
    this.users.append(this.searchUserForm);

    this.users.append(this.userList);

    this.currentUserBlock.append(this.currentUserName);
    this.currentUserBlock.append(this.currentStatusUser);
    this.messageBlock.append(this.currentUserBlock);
    this.messageBlock.append(this.messages);

    this.formMessages.append(this.inputMessages);
    this.sendBtn.render(this.formMessages);

    this.sendBtn.element.removeEventListener('click', this.sendMessage);
    this.sendBtn.element.addEventListener('click', this.sendMessage);

    this.messageBlock.append(this.formMessages);

    this.mainBlock.append(this.users);
    this.mainBlock.append(this.messageBlock);

    this.wrapper.append(this.header);
    this.wrapper.append(this.mainBlock);
    this.wrapper.append(this.footer);
    this.footer.append(this.logoBlock);
    this.footer.append(this.myGitHubBlock);
    this.footer.append(this.yearBlock);

    document.body.append(this.wrapper);

    if (this.selectedUser && this.messages.children.length === 0) {
      this.messages.textContent = 'Write your first message...';
      this.messages.classList.add('center-text');
    }

    if (!this.selectedUser) {
      this.sendBtn.element.disabled = true;
      this.inputMessages.disabled = true;
      this.messages.textContent = 'Please select a recipient...';
      this.messages.classList.add('center-text');
    }

    this.router.socket.addEventListener('open', this.authenticate);

    this.router.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'MSG_FROM_USER') {
        this.messages.innerHTML = '';

        if (data.payload.messages.length === 0) {
          this.messages.textContent = 'Write your first message...';
          this.messages.classList.add('center-text');
        } else {
          data.payload.messages.forEach((message: Message) => {
            this.createMessageElement(message);
          });
        }
      }

      if (data.type === 'MSG_SEND') {
        const messageData = {
          from: data.payload.message.from,
          to: data.payload.message.to,
          text: data.payload.message.text,
          datetime: new Date(data.payload.message.datetime).toLocaleString(),
          isDelivered: data.payload.message.status.isDelivered,
        };

        if (
          messageData.to === this.currentUser ||
          messageData.from === this.currentUser
        ) {
          this.createMessageElement(messageData);
        }
      }
    });

    this.inputMessages.addEventListener('input', () => {
      if (this.inputMessages.value.trim() !== '' && this.selectedUser) {
        this.sendBtn.element.disabled = false;
        this.sendBtn.element.classList.remove('disabled');
      } else {
        this.sendBtn.element.disabled = true;
        this.sendBtn.element.classList.add('disabled');
      }
    });

    this.currentUser = sessionStorage.getItem('currentUser') || 'empty';
    this.userNameSpan.textContent = ` ${this.currentUser}`;

    this.currentPassword = sessionStorage.getItem('currentPassword') || 'empty';

    this.exitBtn.element.addEventListener('click', () => {
      this.logoutUser();
      sessionStorage.clear();
      window.location.href = '#/';
    });

    const inputSearchUser = document.querySelector('.input-search-user');

    if (inputSearchUser) {
      inputSearchUser.addEventListener('input', (event) => {
        const searchValue = (
          event.target as HTMLInputElement
        ).value.toLowerCase();

        const userItems = document.querySelectorAll('.user-list li');

        userItems.forEach((item: Element) => {
          const htmlItem = item as HTMLElement;

          if (
            htmlItem.textContent &&
            htmlItem.textContent.toLowerCase().includes(searchValue)
          ) {
            htmlItem.style.display = '';
          } else {
            htmlItem.style.display = 'none';
          }
        });
      });
    }

    let allUsers: User[] = [];

    this.router.socket.addEventListener('message', (event) => {
      const response = JSON.parse(event.data);
      if (
        response.type === 'USER_ACTIVE' ||
        response.type === 'USER_INACTIVE'
      ) {
        allUsers = allUsers.concat(response.payload.users);
        this.updateUserList(allUsers, this.currentUser);
      }
    });

    this.router.getUsers();
  }

  authenticate = () => {
    const user = sessionStorage.getItem('currentUser');
    const password = sessionStorage.getItem('currentPassword');

    if (this.router.socket.readyState === WebSocket.OPEN) {
      this.router.socket.send(
        JSON.stringify({
          id: Router.generateUniqueId(),
          type: 'USER_LOGIN',
          payload: { user: { login: user, password } },
        }),
      );
    }
  };
}

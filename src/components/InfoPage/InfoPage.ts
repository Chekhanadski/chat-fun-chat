import './styles.css';
import Button from '../Button/Button';
import Router, { Page } from '../../Router';

export default class InfoPage implements Page {
  private wrapper: HTMLElement;

  private wrapperContent: HTMLElement;

  private title: HTMLElement;

  private text: HTMLElement;

  private link: HTMLAnchorElement;

  private goBackBtn: Button;

  private router: Router;

  constructor(router: Router) {
    this.router = router;
    this.wrapper = document.createElement('div');
    this.wrapperContent = document.createElement('div');
    this.title = document.createElement('h1');
    this.text = document.createElement('p');
    this.link = document.createElement('a');
    this.goBackBtn = new Button('Go Back', 'btn');
    this.goBackBtn.onClick(() => {
      if (this.router.isAuthenticated) {
        window.location.href = '#/chat';
      } else {
        window.location.href = '#/';
      }
    });
  }

  init() {
    this.wrapper.className = 'wrapper';
    this.wrapperContent.className = 'wrapper-content';
    this.title.className = 'h1';
    this.title.textContent = 'Fun Chat';
    this.text.className = 'text';
    this.text.textContent =
      'The application is designed for demonstrating the Fun Chat task as part of the RSSchool JS/FE 2023Q4 course.';
    this.link.className = 'git-hub-link';
    this.link.href = 'www.google.com';
    this.link.textContent = 'Chekhanadski Andrei';
    this.wrapperContent.append(this.title);
    this.wrapperContent.append(this.text);
    this.wrapperContent.append(this.link);
    this.wrapper.append(this.wrapperContent);
    this.goBackBtn.render(this.wrapper);
    this.wrapperContent.append(this.goBackBtn.element);
    document.body.append(this.wrapper);
  }
}

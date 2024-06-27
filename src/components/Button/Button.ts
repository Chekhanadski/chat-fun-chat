import './styles.css';

export default class Button {
  element: HTMLButtonElement;

  constructor(text: string, className: string) {
    this.element = document.createElement('button');
    this.element.textContent = text;
    this.element.className = 'btn';
  }

  onClick(callback: () => void) {
    this.element.addEventListener('click', callback);
  }

  render(parent: HTMLElement) {
    parent.append(this.element);
  }
}

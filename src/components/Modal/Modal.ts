import './styles.css';
import Button from '../Button/Button';

export default class Modal {
  private modal: HTMLDivElement;

  private modalContent: HTMLDivElement;

  private errorMessage: HTMLParagraphElement;

  private okButton: Button;

  constructor() {
    this.modal = document.createElement('div');
    this.modal.className = 'modal';

    this.modalContent = document.createElement('div');
    this.modalContent.className = 'modal-content';

    this.errorMessage = document.createElement('p');
    this.modalContent.append(this.errorMessage);

    this.okButton = new Button('OK', 'ok-button');
    this.okButton.element.addEventListener('click', () => {
      this.close();
    });
    this.modalContent.append(this.okButton.element);

    this.modal.append(this.modalContent);
    document.body.append(this.modal);
  }

  show(message: string) {
    this.errorMessage.textContent = message;
    this.modal.style.display = 'flex';
  }

  close() {
    this.modal.style.display = 'none';
  }
}

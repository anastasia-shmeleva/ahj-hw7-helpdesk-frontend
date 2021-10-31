/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import engine from '../../lib/engine/engine';
import template from '../Ticket/Ticket.template';
import itemBtns from '../Ticket/itemBtns';
import statusBtn from '../Ticket/statusBtn';

export default class Table {
  constructor(table, addBtn, tooltip, ticketController) {
    if (typeof table === 'string') {
      table = document.querySelector(table);
    }

    this.table = table;
    this.popup = document.querySelector('.popup');
    this.tooltip = tooltip;
    this.ticketController = ticketController;

    this.addBtn = addBtn;
    this.saveBtn = this.popup.querySelector('.btn__save');
    this.cancelBtn = this.popup.querySelector('.btn__cancel');

    this.onAdd = this.onAdd.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.addBtn.addEventListener('click', this.onAdd);
    this.saveBtn.addEventListener('click', this.onSave);
    this.cancelBtn.addEventListener('click', this.onCancel);
  }

  async render() {
    this.table.style.display = 'table';
    const tbody = document.createElement('tbody');
    this.table.appendChild(tbody);

    this.ticketController.getTickets();
    const tickets = await this.ticketController.tickets.then((array) => array);

    if (tickets.length < 1) {
      tbody.innerText = 'No tickets yet';
      return;
    }

    tickets.forEach((ticket) => {
      const good = engine(template([ticket.name, ticket.created]));
      this.table.querySelector('tbody').appendChild(good);
      const btn = statusBtn();
      const btns = itemBtns();
      this.table.querySelector('tbody').lastElementChild.appendChild(btn);
      this.table.querySelector('tbody').lastElementChild.appendChild(btns);
      if (ticket.status === true) btn.querySelector('button').classList.add('btn__status_active');
    });
    // this.statusBtns = this.table.querySelectorAll('.btn__status');
    // this.onStatusChange = this.onStatusChange.bind(this);
    // this.statusBtns.forEach((btn) => btn.addEventListener('click', this.onStatusChange));
  }

  onAdd() {
    this.popup.style.display = 'block';
  }

  onSave() {
    const name = this.popup.querySelector('.title__input').value;
    const description = this.popup.querySelector('.description__input').value;
    const date = new Date();
    const day = [date.getDate(), date.getMonth(), date.getFullYear()].join('.');
    const time = [date.getHours(), ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes())].join(':');
    const created = `${day} ${time}`;

    if (this.popup.querySelector('.title__input').validity.valueMissing) {
      this.tooltip.addTooltip('Введите название');
      return;
    }

    if (this.table.children.length === 0) {
      this.table.style.display = 'table';
      const tbody = document.createElement('tbody');
      this.table.appendChild(tbody);
    }

    if (this.ticketController.target !== undefined) { // update
      this.ticketController.target.then((target) => {
        const { id } = target;
        this.ticketController.updateTicket({ id, name, description });
      });
      this.onCancel();
      return;
    }
    // create new
    const good = engine(template([name, created]));
    this.table.querySelector('tbody').appendChild(good);

    const btn = statusBtn();
    const btns = itemBtns();
    this.table.querySelector('tbody').lastElementChild.appendChild(btn);
    this.table.querySelector('tbody').lastElementChild.appendChild(btns);

    this.onCancel();
    this.ticketController.createTicket({ name, description, created });
  }

  onCancel() {
    this.popup.style.display = 'none';
    this.popup.querySelector('.title__input').value = '';
    this.popup.querySelector('.description__input').value = '';
  }

  // onStatusChange(e) {
  //   console.log(e.target);
  // }
}

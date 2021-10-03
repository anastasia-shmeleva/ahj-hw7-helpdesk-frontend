import Table from './components/Table/Table';
import TicketController from './components/Ticket/TicketController';
import Tooltip from './components/Tooltip/Tooltip';

const addBtn = document.querySelector('.btn__add');
const tooltip = new Tooltip();
const ticketController = new TicketController();

const table = new Table('.table', addBtn, tooltip, ticketController);
table.render();

window.table = table;

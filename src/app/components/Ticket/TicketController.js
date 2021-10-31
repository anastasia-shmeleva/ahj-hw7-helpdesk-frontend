/* eslint-disable class-methods-use-this */
export default class TicketController {
  getTickets() {
    this.tickets = (async () => {
      const result = await fetch('http://localhost:7070/?method=allTickets');

      const response = await result.json();

      return response;
    })();
  }

  deleteTicket(id) {
    return fetch(`http://localhost:7070/?method=deleteTicket&id=${id}`, {
      method: 'DELETE',
      body: id,
    });
  }

  ticketById(id) {
    this.target = (async () => {
      const result = await fetch(`http://localhost:7070/?method=ticketById&id=${id}`);

      const response = await result.json();

      return response;
    })();
  }

  updateTicket({ id, name, description }) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('description', description);

    fetch('http://localhost:7070/?method=updateTicket', {
      method: 'PUT',
      body: new URLSearchParams(formData),
    });
  }

  createTicket({ name, description, created }) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('created', created);

    fetch('http://localhost:7070/?method=createTicket', {
      method: 'POST',
      body: new URLSearchParams(formData),
    });
  }

  changeStatus({ id, status }) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);

    fetch('http://localhost:7070/?method=changeStatus', {
      method: 'PATCH',
      body: new URLSearchParams(formData),
    });
  }
}

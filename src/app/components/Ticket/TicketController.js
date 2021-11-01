export default class TicketController {
  constructor(baseUrl) {
    this.baseURL = baseUrl;
  }

  getTickets() {
    this.tickets = (async () => {
      const result = await fetch(`${this.baseURL}?method=allTickets`);

      const response = await result.json();

      return response;
    })();
  }

  deleteTicket(id) {
    return fetch(`${this.baseURL}?method=deleteTicket&id=${id}`, {
      method: 'DELETE',
      body: id,
    });
  }

  ticketById(id) {
    this.target = (async () => {
      const result = await fetch(`${this.baseURL}?method=ticketById&id=${id}`);

      const response = await result.json();

      return response;
    })();
  }

  updateTicket({ id, name, description }) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('description', description);

    fetch(`${this.baseURL}?method=updateTicket`, {
      method: 'PUT',
      body: new URLSearchParams(formData),
    });
  }

  createTicket({ name, description, created }) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('created', created);

    fetch(`${this.baseURL}?method=createTicket`, {
      method: 'POST',
      body: new URLSearchParams(formData),
    });
  }

  changeStatus({ id, status }) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);

    fetch(`${this.baseURL}?method=changeStatus`, {
      method: 'PATCH',
      body: new URLSearchParams(formData),
    });
  }
}

/* eslint-disable class-methods-use-this */
export default class TicketController {
  getTickets() {
    this.tickets = (async () => {
      const result = await fetch('http://localhost:7070/?method=allTickets');

      const response = await result.json();

      return response.body.default.tickets;
    })();
  }

  deleteTicket(id) {
    return fetch(`http://localhost:7070/?method=deleteTicket&id=${id}`, {
      method: 'DELETE',
      body: id,
    });
  }

  createTicket({ name, description, created }) {
    async function postData(url = 'http://localhost:7070/?method=createTicket', data = { name, description, created }) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      return response.json();
    }

    postData('http://localhost:7070/?method=createTicket', { name, description, created })
      .then((data) => {
        console.log(data);
      });
  }
}

const ticketTemplate = (ticket) => ({
  block: 'tr',
  cls: 'table__group',
  content: ticket.map((title) => ({
    block: 'td',
    cls: 'table__item',
    content: title,
  })),
});

export default ticketTemplate;

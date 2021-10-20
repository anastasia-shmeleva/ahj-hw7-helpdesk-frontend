/* eslint-disable no-param-reassign */
const itemBtns = () => {
  const toUpdate = (e) => {
    const popup = document.querySelector('.popup');
    const title = e.target.closest('.table__group').querySelector('.table__item').innerText;

    let el;
    window.table.ticketController.tickets.then((tickets) => {
      el = tickets.find((one) => one.name === title);
      window.table.ticketController.ticketById(el.id);
      window.table.ticketController.target.then((target) => {
        popup.querySelector('.title__input').value = target.name;
        popup.querySelector('.description__input').value = target.description;
        target = undefined;
      });
    });

    popup.style.display = 'block';
  };

  const toDelete = (e) => {
    const title = e.target.closest('.table__group').querySelector('.table__item').innerText;
    e.target.closest('.table__group').remove();

    window.table.ticketController.tickets.then((tickets) => {
      const el = tickets.find((one) => one.name === title);
      window.table.ticketController.deleteTicket(el.id);
    });
  };

  // Update
  const btnUpdate = document.createElement('button');
  btnUpdate.className = 'btn__update';
  btnUpdate.addEventListener('click', toUpdate);

  // Delete
  const btnDelete = document.createElement('button');
  btnDelete.className = 'btn__delete';
  btnDelete.addEventListener('click', toDelete);

  const btnContainer = document.createElement('td');
  btnContainer.className = 'table__item';
  btnContainer.appendChild(btnUpdate);
  btnContainer.appendChild(btnDelete);

  return btnContainer;
};

export default itemBtns;

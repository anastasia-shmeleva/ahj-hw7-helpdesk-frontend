const itemBtns = () => {
  const toUpdate = (e) => {
    const popup = document.querySelector('.popup');
    const title = e.target.closest('.table__group').querySelectorAll('.table__item')[0].innerText;

    const obj = Object.values(localStorage).find((item) => JSON.parse(item).title === title);

    popup.querySelector('.title__input').value = JSON.parse(obj).title;
    popup.querySelector('.description__input').value = JSON.parse(obj).description;

    popup.style.display = 'block';
  };

  const toDelete = (e) => {
    e.target.closest('.table__group').remove();
    const id = 1;
    window.table.ticketController.deleteTicket(id);
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

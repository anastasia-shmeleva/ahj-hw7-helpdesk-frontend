const statusBtn = () => {
  const toChange = (e) => {
    e.preventDefault();
    e.target.classList.toggle('btn__status_active');

    const title = e.target.closest('.table__group').querySelector('.table__item').innerText;

    window.table.ticketController.tickets.then((tickets) => {
      const el = tickets.find((one) => one.name === title);
      window.table.ticketController.changeStatus(el.id);
    });
  };

  const btn = document.createElement('button');
  btn.className = 'btn__status';
  btn.addEventListener('click', toChange);

  const btnContainer = document.createElement('td');
  btnContainer.className = 'table__item';
  btnContainer.appendChild(btn);

  return btnContainer;
};

export default statusBtn;

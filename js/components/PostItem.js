export const postItem = (id, title, content, link, img) => {
  const item = document.createElement('div');
  item.setAttribute('id', id);
  item.classList.add(
    'post-item',
    'col-md-4',
    'col-12',
    'border-bottom',
    'mb-3'
  );
  item.innerHTML = `<img src="${img}" class="img-fluid mb-3" /><br /><h3>Titulo: ${title}</h3><p>${content}</p><a href="${link}">Ver Más</a>`;
  return item;
};

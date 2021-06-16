/**
 * Component API Based: https://developer.wordpress.org/rest-api/
 */
const loadMore = document.getElementById('load-more'); //button
const container = document.getElementById('page'); //container
const loading = document.getElementById('loading'); //loading

let pageNumber = 1; //Init pages
let offsetNumber = 0; // Init offset
let perPage = test_vars.per_page; //Init perPage
let totalPages, totalPosts, link; // Headers for pagination: https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/

//Item
const postItem = (id, title, content) => {
  const item = document.createElement('div');
  item.setAttribute('id', id);
  item.classList.add('post-item','col-md-4','col-12', 'border-bottom', 'mb-3');
  item.innerHTML = `<h3>Titulo: ${title}</h3><p>${content}</p>`;
  return item;
};

//Fetch GET
const getPosts = async (
  page = pageNumber,
  per_page = perPage,
  offset = offsetNumber
) => {
  const url = `http://pruebas.local/wp-json/wp/v2/posts?page=${page}&per_page=${per_page}&offset=${offset}`; //URL Get posts

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  await fetch(url, requestOptions)
    .then((response) => {
      totalPages = response.headers.get('X-WP-TotalPages');
      totalPosts = response.headers.get('X-WP-Total');
      link = response.headers.get('Link');

      return response.json();
    })
    .then((result) => {
      try {
        console.log('total posts:', totalPosts);
        console.log('total pages:', totalPages);
        console.log('page number:', page);
        console.log('per page:', perPage);
        if (page <= totalPages) {
          result.forEach((post) => {
            const { id, title, content, excerpt } = post;
            let postEntry = postItem(id, title.rendered, excerpt.rendered);

            if (loading) loading.remove();

            container.appendChild(postEntry);
          });
        } else {
          loadMore.remove();
        }
      } catch (e) {
        if (loading) loading.remove();

        container.innerHTML = result['message'];
      }
    })
    .catch((error) => {
      container.innerHTML = `Error: ${error}`;
    });
  console.log(url);
};
//Show posts in lists
export const postsLists = async () => {
  let showPosts = await getPosts();

  showPosts;

  loadMore.addEventListener('click', () => {
    pageNumber += 1;
    offsetNumber += parseInt(perPage);
    getPosts(pageNumber, perPage, offsetNumber);
  });
};

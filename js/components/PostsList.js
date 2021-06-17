import { postItem } from './PostItem.js'

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

//Fetch GET
const getPosts = async (
  page = pageNumber,
  per_page = perPage,
  offset = offsetNumber
) => {
  const url = `http://pruebas.local/wp-json/wp/v2/posts?page=${page}&per_page=${per_page}&offset=${offset}&_embed`; //URL Get posts

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
        // console.log('total posts:', totalPosts);
        // console.log('total pages:', totalPages);
        // console.log('page number:', page);
        // console.log('per page:', perPage);

       // console.log(result);

        if (page <= totalPages) {
          result.forEach((post) => {

           const img = post._embedded['wp:featuredmedia'] === null || post._embedded['wp:featuredmedia'] === undefined ? 'https://via.placeholder.com/416x278' : post._embedded['wp:featuredmedia']['0'].source_url;

            const { id, title, excerpt, link } = post;
            let postEntry = postItem(id, title.rendered, excerpt.rendered, link, img);

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
  //console.log(url);
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

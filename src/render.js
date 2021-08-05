const rssForm = document.querySelector('.rss-form');
const submitButton = document.querySelector('button');
const feedbackDiv = document.querySelector('.feedback');
const input = document.querySelector('input');
const feedsDiv = document.querySelector('.feeds');
const postsDiv = document.querySelector('.posts');

export const renderStateForm = (value, state) => {
  switch (value) {
    case 'filling':
      submitButton.disabled = false;
      feedbackDiv.textContent = '';
      break;
    case 'loading':
      submitButton.disabled = true;
      break;
    case 'failed':
      submitButton.disabled = false;
      feedbackDiv.textContent = state.form.error;
      feedbackDiv.classList.add('text-danger');
      feedbackDiv.classList.remove('text-success');
      input.classList.add('is-invalid');
      break;
    case 'success':
      submitButton.disabled = false;
      rssForm.reset();
      feedbackDiv.textContent = 'RSS loaded successfully';
      feedbackDiv.classList.remove('text-danger');
      feedbackDiv.classList.add('text-success');
      input.classList.remove('is-invalid');
      break;
    default:
      break;
  }
};

export const renderPosts = (state) => {
  console.log('начало renderPosts');
  postsDiv.textContent = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = '<h2 class="card-title h4">Posts</h2>';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'list-unstyled');

  state.posts.forEach((post) => {
    const { title, url } = post;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.textContent = title;
    li.append(a);
    ul.append(li);
  });

  card.append(cardBody);
  card.append(ul);
  postsDiv.append(card);
  console.log('конец renderPosts');
};

export const renderFeeds = (state) => {
  console.log('начало renderFeeds');
  feedsDiv.textContent = '';
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.innerHTML = '<h2 class="card-title h4">Feeds</h2>';

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'list-unstyled');

  state.feeds.forEach((feed) => {
    const { title, description } = feed;
    const li = document.createElement('li');
    li.innerHTML = `<h3 class="h6 m-0">${title}</h3><p class="m-0 small text-black-50">${description}</p>`;
    ul.append(li);
  });

  card.append(cardBody);
  card.append(ul);
  feedsDiv.append(card);
  console.log('конец renderFeeds');
};

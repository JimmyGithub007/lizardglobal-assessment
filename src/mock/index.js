import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    this.get('/posts/:id', (schema, request) => {
      return data.posts.find(d => d.id === request.params.id);
    });
  },
});

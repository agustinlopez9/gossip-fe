describe('Posts E2E Tests', () => {
  let postsData;
  let userData;

  beforeEach(() => {
    cy.fixture('posts.json').then((data) => {
      postsData = data;
    });
    cy.fixture('users.json').then((data) => {
      userData = data;
    });
  });

  describe('Create Post', () => {
    it('should create a new post successfully', () => {
      cy.mockPostsList(postsData.mockPosts);
      cy.mockCreatePost(postsData.newPost);

      cy.visit('/home');
      cy.wait('@getPosts');

      cy.get('[data-cy="form-input"]').type(postsData.newPost.title);
      cy.get('[data-cy="form-textarea"]').type(postsData.newPost.content);

      cy.contains('Publish').click();

      cy.wait('@createPost').then((interception) => {
        expect(interception.request.body).to.include({
          title: postsData.newPost.title,
          content: postsData.newPost.content
        });
      });

      cy.contains(/created|success/i);

      cy.get('[data-cy="form-input"]').should('have.value', '');
      cy.get('[data-cy="form-textarea"]').should('have.value', '');
    });

    it('should show validation errors for empty fields', () => {
      cy.mockPostsList(postsData.mockPosts);

      cy.visit('/home');
      cy.wait('@getPosts');

      cy.contains('Publish').click();

      cy.contains(/required|must|cannot be empty/i);

      cy.get('@createPost.all').should('have.length', 0);
    });
  });

  describe('Edit Post', () => {
    it('should edit an existing post successfully', () => {
      const postId = postsData.mockPosts[0].id;

      cy.mockPostDetail(postId, postsData.mockPosts[0]);
      cy.mockCommentsList(postId, []);
      cy.mockEditPost(postId, postsData.editedPost);

      cy.visit(`/post/${postId}`);
      cy.wait('@getPost');

      cy.get('[data-testid^="post-menu-trigger"], button[aria-label*="menu"], button').contains('svg').first().click();
      cy.contains('Edit').click();

      cy.get('[data-cy="form-input"]').should('have.value', postsData.mockPosts[0].title);
      cy.get('[data-cy="form-textarea"]').should('have.value', postsData.mockPosts[0].content);

      cy.get('[data-cy="form-input"]').clear().type(postsData.editedPost.title);
      cy.get('[data-cy="form-textarea"]').clear().type(postsData.editedPost.content);

      cy.contains('Save').click();

      cy.wait('@editPost').then((interception) => {
        expect(interception.request.body).to.include({
          title: postsData.editedPost.title,
          content: postsData.editedPost.content
        });
      });

      cy.contains(/edited|updated|success/i);

      cy.contains(postsData.editedPost.title);
      cy.contains(postsData.editedPost.content);
    });

    it('should show validation errors when editing with empty fields', () => {
      const postId = postsData.mockPosts[0].id;

      cy.mockPostDetail(postId, postsData.mockPosts[0]);
      cy.mockCommentsList(postId, []);

      cy.visit(`/post/${postId}`);
      cy.wait('@getPost');

      cy.get('[data-testid^="post-menu-trigger"], button[aria-label*="menu"], button').contains('svg').first().click();
      cy.contains('Edit').click();

      cy.get('[data-cy="form-input"]').clear();
      cy.get('[data-cy="form-textarea"]').clear();

      cy.contains('Save').click();

      cy.contains(/required|must|cannot be empty/i);

      cy.get('@editPost.all').should('have.length', 0);
    });
  });

  describe('Delete Post', () => {
    it('should delete a post with confirmation', () => {
      const postId = postsData.mockPosts[0].id;

      cy.mockPostsList(postsData.mockPosts);
      cy.mockDeletePost(postId);

      cy.visit('/home');
      cy.wait('@getPosts');

      cy.get('[data-testid^="post-menu-trigger"], button[aria-label*="menu"], button').contains('svg').first().click();

      cy.contains('Delete').click();

      cy.contains(/confirm|sure|delete/i);

      cy.contains(/confirm|yes|delete/i).last().click();

      cy.wait('@deletePost');

      cy.url().should('match', /\/home|\/$/);
    });

    it('should cancel post deletion', () => {
      cy.mockPostsList(postsData.mockPosts);

      cy.visit('/home');
      cy.wait('@getPosts');

      cy.get('[data-testid^="post-menu-trigger"], button[aria-label*="menu"], button').contains('svg').first().click();
      cy.contains('Delete').click();

      cy.contains(/cancel|no/i).click();

      cy.get('@deletePost.all').should('have.length', 0);

      cy.contains(postsData.mockPosts[0].title).should('exist');
    });
  });
});

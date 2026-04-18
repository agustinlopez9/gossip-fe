describe('Comments E2E Tests', () => {
  let commentsData;
  let postsData;

  beforeEach(() => {
    cy.fixture('comments.json').then((data) => {
      commentsData = data;
    });
    cy.fixture('posts.json').then((data) => {
      postsData = data;
    });
  });

  describe('Create Comment', () => {
    it('should create a new comment successfully', () => {
      const postId = postsData.mockPosts[0].id;

      cy.mockPostDetail(postId, postsData.mockPosts[0]);
      cy.mockCommentsList(postId, commentsData.mockComments);
      cy.mockCreateComment(postId, commentsData.newComment);

      cy.visit(`/post/${postId}`);
      cy.wait('@getPost');
      cy.wait('@getComments');

      cy.get('[data-cy="form-textarea"]').last().type(commentsData.newComment.content);

      cy.contains('button', /submit|send|post/i).click();

      cy.wait('@createComment').then((interception) => {
        expect(interception.request.body).to.include({
          content: commentsData.newComment.content
        });
      });

      cy.contains(/created|success|posted/i);

      cy.contains(commentsData.newComment.content);
    });

    it('should show validation error for empty comment', () => {
      const postId = postsData.mockPosts[0].id;

      cy.mockPostDetail(postId, postsData.mockPosts[0]);
      cy.mockCommentsList(postId, commentsData.mockComments);

      cy.visit(`/post/${postId}`);
      cy.wait('@getPost');
      cy.wait('@getComments');

      cy.contains('button', /submit|send|post/i).click();

      cy.contains(/required|must|cannot be empty/i);

      cy.get('@createComment.all').should('have.length', 0);
    });
  });

  describe('Edit Comment', () => {
    it('should edit an existing comment successfully', () => {
      const postId = postsData.mockPosts[0].id;
      const commentId = commentsData.mockComments[0].id;

      cy.mockPostDetail(postId, postsData.mockPosts[0]);
      cy.mockCommentsList(postId, commentsData.mockComments);
      cy.mockEditComment(postId, commentId, commentsData.editedComment);

      cy.visit(`/post/${postId}`);
      cy.wait('@getPost');
      cy.wait('@getComments');

      cy.get('[data-testid^="comment-menu-trigger"], button[aria-label*="menu"]').first().click();
      cy.contains('Edit').click();

      cy.get('[data-cy="form-textarea"]').should('have.value', commentsData.mockComments[0].content);

      cy.get('[data-cy="form-textarea"]').clear().type(commentsData.editedComment.content);

      cy.contains('button', /save/i).click();

      cy.wait('@editComment').then((interception) => {
        expect(interception.request.body).to.include({
          content: commentsData.editedComment.content
        });
      });

      cy.contains(/edited|updated|success/i);

      cy.contains(commentsData.editedComment.content);
    });

    it('should show validation error when editing with empty content', () => {
      const postId = postsData.mockPosts[0].id;
      const commentId = commentsData.mockComments[0].id;

      cy.mockPostDetail(postId, postsData.mockPosts[0]);
      cy.mockCommentsList(postId, commentsData.mockComments);

      cy.visit(`/post/${postId}`);
      cy.wait('@getPost');
      cy.wait('@getComments');

      cy.get('[data-testid^="comment-menu-trigger"], button[aria-label*="menu"]').first().click();
      cy.contains('Edit').click();

      cy.get('[data-cy="form-textarea"]').clear();

      cy.contains('button', /save/i).click();

      cy.contains(/required|must|cannot be empty/i);

      cy.get('@editComment.all').should('have.length', 0);
    });
  });

  describe('Delete Comment', () => {
    it('should delete a comment with confirmation', () => {
      const postId = postsData.mockPosts[0].id;
      const commentId = commentsData.mockComments[0].id;

      cy.mockPostDetail(postId, postsData.mockPosts[0]);
      cy.mockCommentsList(postId, commentsData.mockComments);
      cy.mockDeleteComment(postId, commentId);

      cy.visit(`/post/${postId}`);
      cy.wait('@getPost');
      cy.wait('@getComments');

      cy.get('[data-testid^="comment-menu-trigger"], button[aria-label*="menu"]').first().click();

      cy.contains('Delete').click();

      cy.contains(/confirm|sure|delete/i);

      cy.contains(/confirm|yes|delete/i).last().click();

      cy.wait('@deleteComment');

      cy.contains(/deleted|removed|success/i);
    });

    it('should cancel comment deletion', () => {
      const postId = postsData.mockPosts[0].id;
      const commentId = commentsData.mockComments[0].id;

      cy.mockPostDetail(postId, postsData.mockPosts[0]);
      cy.mockCommentsList(postId, commentsData.mockComments);

      cy.visit(`/post/${postId}`);
      cy.wait('@getPost');
      cy.wait('@getComments');

      cy.get('[data-testid^="comment-menu-trigger"], button[aria-label*="menu"]').first().click();
      cy.contains('Delete').click();

      cy.contains(/cancel|no/i).click();

      cy.get('@deleteComment.all').should('have.length', 0);

      cy.contains(commentsData.mockComments[0].content).should('exist');
    });
  });
});

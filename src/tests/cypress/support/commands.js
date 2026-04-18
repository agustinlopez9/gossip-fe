// ***********************************************
// Custom Cypress Commands for API Mocking
// ***********************************************

// Authentication Command
Cypress.Commands.add('login', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('isAuthenticated', 'true');
    win.localStorage.setItem('user', JSON.stringify({
      name: 'Test User',
      avatar: 'https://example.com/avatar1.jpg'
    }));
  });
});

// Posts Commands

Cypress.Commands.add('mockPostsList', (posts) => {
  cy.intercept('GET', '**/post*', {
    statusCode: 200,
    body: posts
  }).as('getPosts');
});

Cypress.Commands.add('mockPostDetail', (postId, post) => {
  cy.intercept('GET', `**/post/${postId}`, {
    statusCode: 200,
    body: post
  }).as('getPost');
});

Cypress.Commands.add('mockCreatePost', (newPost) => {
  cy.intercept('POST', '**/post', {
    statusCode: 201,
    body: newPost
  }).as('createPost');
});

Cypress.Commands.add('mockEditPost', (postId, editedPost) => {
  cy.intercept('PUT', `**/post/${postId}`, {
    statusCode: 200,
    body: editedPost
  }).as('editPost');
});

Cypress.Commands.add('mockDeletePost', (postId) => {
  cy.intercept('DELETE', `**/post/${postId}`, {
    statusCode: 204,
    body: {}
  }).as('deletePost');
});

// Comments Commands

Cypress.Commands.add('mockCommentsList', (postId, comments) => {
  cy.intercept('GET', `**/comment?postId=${postId}*`, {
    statusCode: 200,
    body: comments
  }).as('getComments');
});

Cypress.Commands.add('mockCreateComment', (postId, newComment) => {
  cy.intercept('POST', `**/post/${postId}/comment`, {
    statusCode: 201,
    body: newComment
  }).as('createComment');
});

Cypress.Commands.add('mockEditComment', (postId, commentId, editedComment) => {
  cy.intercept('PUT', `**/post/${postId}/comment/${commentId}`, {
    statusCode: 200,
    body: editedComment
  }).as('editComment');
});

Cypress.Commands.add('mockDeleteComment', (postId, commentId) => {
  cy.intercept('DELETE', `**/post/${postId}/comment/${commentId}`, {
    statusCode: 204,
    body: {}
  }).as('deleteComment');
});
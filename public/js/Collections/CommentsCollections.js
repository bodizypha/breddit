var CommentsCollection = Backbone.Collection.extend({
    url: '/comments/',
    model: CommentModel
});

module.exports = CommentsCollection;
var PostsCollection = Backbone.Collection.extend({
    url: '/posts/',
    model: PostModel
});

module.expors = PostsCollection;
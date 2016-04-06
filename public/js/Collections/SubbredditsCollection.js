var SubbredditsCollection = Backbone.Collection.extend({
    url: 'subbreddits/',
    model: SubbredditModel
});

module.exports = SubbredditsCollection;
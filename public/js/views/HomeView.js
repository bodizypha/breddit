var HomeView = Backbone.View.extend({
    el:'\
    <div class="container">\
        <div class="row">\
            <div class="three columns"></div>\
            <div class="six columns">\
                <div class="row">\
                    <div class="twelve columns" id="posts"></div>\
                </div>\
                <div class="row">\
                    <div class="twelve columns"></div>\
                </div>\
            </div>\
            <div class="three columns" id="all-subbreddits"></div>\
        </div>\
    </div>\
    ',

    insertSubbreddits: function() {
        var subbreddits = new SubbredditsCollection();
        subbreddits.fetch();
        var subbredditsListView = new SubbredditsListView({ 
            collection: subbreddits
        });
        this.$el.find('#all-subbreddits').html(subbredditsListView.render().el);
    },

    insertPosts: function() {
        var posts = new PostsCollection();
        posts.fetch();
        var postsListView = new PostsListView({ 
            collection: posts
        });
        this.$el.find('#posts').html(postsListView.render().el);
    },

    render: function() {
        this.insertSubbreddits();
        this.insertPosts();

        return this;
    }
});

module.exports = HomeView;
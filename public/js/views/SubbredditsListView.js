var SubbredditsListView = Backbone.View.extend({
        el: '<ul></ul>',

        template: _.template('\
            <% subbreddits.each(function(subbreddit) { %>\
                <li><a data-id="<%=subbreddit.id %>" href="#"><%= subbreddit.get("name") %></a></li>\
            <% }) %>\
        '),

        events: {
            'click a': function(e) {
                e.preventDefault();
                var subbredditId = $(e.target).data('id');
                var subbreddit = new SubbredditModel({id: subbredditId});
                subbreddit.fetch();
                var postsListView = PostsListView({
                    collection: subbreddit.get('posts')
                });
                $('#posts').html(postsListView.render().el);
            }

        },

        initialize: function() {
            this.listenTo(this.collection, 'update', this.render);
        },

        render: function() {
            this.$el.html(this.template({ subbreddits: this.collection }));
            return this;
        }
    });

module.exports = SubbredditsListView;
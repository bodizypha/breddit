<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token() }}">
    <title>Breddit</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">

</head>
<body>
    <nav></nav>
    <div id="content"></div>

    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.2/backbone-min.js"></script>

    <script>
'use strict';

$(document).on('ready', function() {

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var PostModel = Backbone.Model.extend({
    urlRoot: '/api/posts/',
    idAttribute: 'id',
});

var SubbredditModel = Backbone.Model.extend({
    urlRoot: '/api/subbreddits/',
    idAttribute: 'id'
});

var CommentModel = Backbone.Model.extend({
    urlRoot: '/api/comments/',
    idAttribute: 'id'
});

var PostsCollection = Backbone.Collection.extend({
    url: '/api/posts/',
    model: PostModel
});

var SubbredditsCollection = Backbone.Collection.extend({
    url: 'subbreddits/',
    model: SubbredditModel
});

var CommentsCollection = Backbone.Collection.extend({
    url: '/api/comments/',
    model: CommentModel
});

var HomeView = Backbone.View.extend({
    el:'\
    <div class="container">\
        <div class="row">\
            <div class="three columns"></div>\
            <div class="six colums">\
                <div class="row">\
                    <div class="twelve colums"></div>\
                </div>\
                <div class="row">\
                    <div class="twelve columns"></div>\
                </div>\
            </div>\
            <div class="three columns" id="all-subbreddits"></div>\
        </div>\
    </div>\
    ',

    render: function() {
        var subbreddits = new SubbredditsCollection();
        subbreddits.fetch();
        var subbredditsListView = new SubbredditsListView({ collection: subbreddits});
        this.$el.find('#all-subbreddits').html(subbredditsListView.render().el);

        return this;
    }
});

var SubbredditsListView = Backbone.View.extend({
    el: '<ul></ul>',

    template: _.template('\
        <% subbreddits.each(function(subbreddit) { %>\
            <li><a href="#"><%= subbreddit.get("name") %></a></li>\
        <% }) %>\
    '),

    initialize: function() {
        this.listenTo(this.collection, 'update', this.render);
    },

    render: function() {
        this.$el.html(this.template({ subbreddits: this.collection }));
        return this;
    }
})

var homeView = new HomeView();
$('#content').html(homeView.render().el);
});

    </script>
    

</body>
</html>

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var HomeView = require('./views/HomeView.js');

$(document).on('ready', function() {

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var homeView = new HomeView();
$('#content').html(homeView.render().el);

})
},{"./views/HomeView.js":6}],2:[function(require,module,exports){
var PostModel = require('../models/PostModel.js');

var PostsCollection = Backbone.Collection.extend({
    url: '/posts/',
    model: PostModel
});

module.exports = PostsCollection;
},{"../models/PostModel.js":4}],3:[function(require,module,exports){
var SubbredditModel = require('../models/SubbredditModel.js');

var SubbredditsCollection = Backbone.Collection.extend({
    url: 'subbreddits/',
    model: SubbredditModel
});

module.exports = SubbredditsCollection;
},{"../models/SubbredditModel.js":5}],4:[function(require,module,exports){
var PostModel = Backbone.Model.extend({
    urlRoot: '/posts/',
    idAttribute: 'id',

    parse: function(response) {
        if (response.subbreddit) {
            var SubbredditModel = require('./SubbredditModel.js');
            response.subbreddit = new SubbredditModel(response.subbreddit);
        }
        return response;
    }
});

module.exports = PostModel;
},{"./SubbredditModel.js":5}],5:[function(require,module,exports){
var SubbredditModel = Backbone.Model.extend({
    urlRoot: '/subbreddits/',
    idAttribute: 'id',

    parse: function(response) {
        if (response.posts) {
            var PostsCollection = require('../collections/PostsCollection.js');
            response.posts - new PostsCollection(response.posts);
        }
        return response;
    }
});

module.exports = SubbredditModel;
},{"../collections/PostsCollection.js":2}],6:[function(require,module,exports){
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
        var SubbredditsCollection = require('../collections/SubbredditsCollection.js');
        var subbreddits = new SubbredditsCollection();
        subbreddits.fetch();
        var SubbredditsListView = require('./SubbredditsListView.js');
        var subbredditsListView = new SubbredditsListView({ 
            collection: subbreddits
        });
        this.$el.find('#all-subbreddits').html(subbredditsListView.render().el);
    },

    insertPosts: function() {
        var PostsCollection = require('../collections/PostsCollection.js');
        var posts = new PostsCollection();
        posts.fetch();
        var PostsListView = require('./PostsListView.js');
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
},{"../collections/PostsCollection.js":2,"../collections/SubbredditsCollection.js":3,"./PostsListView.js":7,"./SubbredditsListView.js":8}],7:[function(require,module,exports){
var PostsListView = Backbone.View.extend({
        el: '<ul></ul>',
        template: _.template('\
            <% posts.each(function(post) { %>\
                <li>\
                    <a href="#"><%= post.get("title") %></a>\
                    <% if (post.get("subbreddit")) { %>\
                        <small><%= post.get("subbreddit").get("name") %></small>\
                    <% } %>\
                </li>\
            <% }) %>\
        '),

        initialize: function() {
            this.listenTo(this.collection, 'update', this.render);
        },

        render: function() {
            this.$el.html(this.template({ posts: this.collection }));
            return this;
        }
    });

module.exports = PostsListView;
},{}],8:[function(require,module,exports){
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
                var SubbredditModel = require('../models/SubbredditModel.js');
                var subbreddit = new SubbredditModel({id: subbredditId});
                subbreddit.fetch({
                    success: function() {
                        var PostsListView = require('./PostsListView.js');
                        var postsListView = PostsListView({
                            collection: subbreddit.get('posts')
                        });
                        $('#posts').html(postsListView.render().el);
                    }
                
                });
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
},{"../models/SubbredditModel.js":5,"./PostsListView.js":7}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvYXBwLmpzIiwicHVibGljL2pzL2NvbGxlY3Rpb25zL1Bvc3RzQ29sbGVjdGlvbi5qcyIsInB1YmxpYy9qcy9jb2xsZWN0aW9ucy9TdWJicmVkZGl0c0NvbGxlY3Rpb24uanMiLCJwdWJsaWMvanMvbW9kZWxzL1Bvc3RNb2RlbC5qcyIsInB1YmxpYy9qcy9tb2RlbHMvU3ViYnJlZGRpdE1vZGVsLmpzIiwicHVibGljL2pzL3ZpZXdzL0hvbWVWaWV3LmpzIiwicHVibGljL2pzL3ZpZXdzL1Bvc3RzTGlzdFZpZXcuanMiLCJwdWJsaWMvanMvdmlld3MvU3ViYnJlZGRpdHNMaXN0Vmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBIb21lVmlldyA9IHJlcXVpcmUoJy4vdmlld3MvSG9tZVZpZXcuanMnKTtcclxuXHJcbiQoZG9jdW1lbnQpLm9uKCdyZWFkeScsIGZ1bmN0aW9uKCkge1xyXG5cclxuJC5hamF4U2V0dXAoe1xyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAgICdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpXHJcbiAgICB9XHJcbn0pO1xyXG5cclxudmFyIGhvbWVWaWV3ID0gbmV3IEhvbWVWaWV3KCk7XHJcbiQoJyNjb250ZW50JykuaHRtbChob21lVmlldy5yZW5kZXIoKS5lbCk7XHJcblxyXG59KSIsInZhciBQb3N0TW9kZWwgPSByZXF1aXJlKCcuLi9tb2RlbHMvUG9zdE1vZGVsLmpzJyk7XHJcblxyXG52YXIgUG9zdHNDb2xsZWN0aW9uID0gQmFja2JvbmUuQ29sbGVjdGlvbi5leHRlbmQoe1xyXG4gICAgdXJsOiAnL3Bvc3RzLycsXHJcbiAgICBtb2RlbDogUG9zdE1vZGVsXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3N0c0NvbGxlY3Rpb247IiwidmFyIFN1YmJyZWRkaXRNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVscy9TdWJicmVkZGl0TW9kZWwuanMnKTtcclxuXHJcbnZhciBTdWJicmVkZGl0c0NvbGxlY3Rpb24gPSBCYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZCh7XHJcbiAgICB1cmw6ICdzdWJicmVkZGl0cy8nLFxyXG4gICAgbW9kZWw6IFN1YmJyZWRkaXRNb2RlbFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3ViYnJlZGRpdHNDb2xsZWN0aW9uOyIsInZhciBQb3N0TW9kZWwgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe1xyXG4gICAgdXJsUm9vdDogJy9wb3N0cy8nLFxyXG4gICAgaWRBdHRyaWJ1dGU6ICdpZCcsXHJcblxyXG4gICAgcGFyc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN1YmJyZWRkaXQpIHtcclxuICAgICAgICAgICAgdmFyIFN1YmJyZWRkaXRNb2RlbCA9IHJlcXVpcmUoJy4vU3ViYnJlZGRpdE1vZGVsLmpzJyk7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLnN1YmJyZWRkaXQgPSBuZXcgU3ViYnJlZGRpdE1vZGVsKHJlc3BvbnNlLnN1YmJyZWRkaXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3N0TW9kZWw7IiwidmFyIFN1YmJyZWRkaXRNb2RlbCA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7XHJcbiAgICB1cmxSb290OiAnL3N1YmJyZWRkaXRzLycsXHJcbiAgICBpZEF0dHJpYnV0ZTogJ2lkJyxcclxuXHJcbiAgICBwYXJzZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBpZiAocmVzcG9uc2UucG9zdHMpIHtcclxuICAgICAgICAgICAgdmFyIFBvc3RzQ29sbGVjdGlvbiA9IHJlcXVpcmUoJy4uL2NvbGxlY3Rpb25zL1Bvc3RzQ29sbGVjdGlvbi5qcycpO1xyXG4gICAgICAgICAgICByZXNwb25zZS5wb3N0cyAtIG5ldyBQb3N0c0NvbGxlY3Rpb24ocmVzcG9uc2UucG9zdHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTdWJicmVkZGl0TW9kZWw7IiwidmFyIEhvbWVWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xyXG4gICAgZWw6J1xcXHJcbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XFxcclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRocmVlIGNvbHVtbnNcIj48L2Rpdj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2l4IGNvbHVtbnNcIj5cXFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWx2ZSBjb2x1bW5zXCIgaWQ9XCJwb3N0c1wiPjwvZGl2PlxcXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3ZWx2ZSBjb2x1bW5zXCI+PC9kaXY+XFxcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICAgIDwvZGl2PlxcXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aHJlZSBjb2x1bW5zXCIgaWQ9XCJhbGwtc3ViYnJlZGRpdHNcIj48L2Rpdj5cXFxyXG4gICAgICAgIDwvZGl2PlxcXHJcbiAgICA8L2Rpdj5cXFxyXG4gICAgJyxcclxuXHJcbiAgICBpbnNlcnRTdWJicmVkZGl0czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIFN1YmJyZWRkaXRzQ29sbGVjdGlvbiA9IHJlcXVpcmUoJy4uL2NvbGxlY3Rpb25zL1N1YmJyZWRkaXRzQ29sbGVjdGlvbi5qcycpO1xyXG4gICAgICAgIHZhciBzdWJicmVkZGl0cyA9IG5ldyBTdWJicmVkZGl0c0NvbGxlY3Rpb24oKTtcclxuICAgICAgICBzdWJicmVkZGl0cy5mZXRjaCgpO1xyXG4gICAgICAgIHZhciBTdWJicmVkZGl0c0xpc3RWaWV3ID0gcmVxdWlyZSgnLi9TdWJicmVkZGl0c0xpc3RWaWV3LmpzJyk7XHJcbiAgICAgICAgdmFyIHN1YmJyZWRkaXRzTGlzdFZpZXcgPSBuZXcgU3ViYnJlZGRpdHNMaXN0Vmlldyh7IFxyXG4gICAgICAgICAgICBjb2xsZWN0aW9uOiBzdWJicmVkZGl0c1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJGVsLmZpbmQoJyNhbGwtc3ViYnJlZGRpdHMnKS5odG1sKHN1YmJyZWRkaXRzTGlzdFZpZXcucmVuZGVyKCkuZWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbnNlcnRQb3N0czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIFBvc3RzQ29sbGVjdGlvbiA9IHJlcXVpcmUoJy4uL2NvbGxlY3Rpb25zL1Bvc3RzQ29sbGVjdGlvbi5qcycpO1xyXG4gICAgICAgIHZhciBwb3N0cyA9IG5ldyBQb3N0c0NvbGxlY3Rpb24oKTtcclxuICAgICAgICBwb3N0cy5mZXRjaCgpO1xyXG4gICAgICAgIHZhciBQb3N0c0xpc3RWaWV3ID0gcmVxdWlyZSgnLi9Qb3N0c0xpc3RWaWV3LmpzJyk7XHJcbiAgICAgICAgdmFyIHBvc3RzTGlzdFZpZXcgPSBuZXcgUG9zdHNMaXN0Vmlldyh7IFxyXG4gICAgICAgICAgICBjb2xsZWN0aW9uOiBwb3N0c1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJGVsLmZpbmQoJyNwb3N0cycpLmh0bWwocG9zdHNMaXN0Vmlldy5yZW5kZXIoKS5lbCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5pbnNlcnRTdWJicmVkZGl0cygpO1xyXG4gICAgICAgIHRoaXMuaW5zZXJ0UG9zdHMoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIb21lVmlldzsiLCJ2YXIgUG9zdHNMaXN0VmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcclxuICAgICAgICBlbDogJzx1bD48L3VsPicsXHJcbiAgICAgICAgdGVtcGxhdGU6IF8udGVtcGxhdGUoJ1xcXHJcbiAgICAgICAgICAgIDwlIHBvc3RzLmVhY2goZnVuY3Rpb24ocG9zdCkgeyAlPlxcXHJcbiAgICAgICAgICAgICAgICA8bGk+XFxcclxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiPjwlPSBwb3N0LmdldChcInRpdGxlXCIpICU+PC9hPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgPCUgaWYgKHBvc3QuZ2V0KFwic3ViYnJlZGRpdFwiKSkgeyAlPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbD48JT0gcG9zdC5nZXQoXCJzdWJicmVkZGl0XCIpLmdldChcIm5hbWVcIikgJT48L3NtYWxsPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgPCUgfSAlPlxcXHJcbiAgICAgICAgICAgICAgICA8L2xpPlxcXHJcbiAgICAgICAgICAgIDwlIH0pICU+XFxcclxuICAgICAgICAnKSxcclxuXHJcbiAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCAndXBkYXRlJywgdGhpcy5yZW5kZXIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVsLmh0bWwodGhpcy50ZW1wbGF0ZSh7IHBvc3RzOiB0aGlzLmNvbGxlY3Rpb24gfSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUG9zdHNMaXN0VmlldzsiLCJ2YXIgU3ViYnJlZGRpdHNMaXN0VmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcclxuICAgICAgICBlbDogJzx1bD48L3VsPicsXHJcblxyXG4gICAgICAgIHRlbXBsYXRlOiBfLnRlbXBsYXRlKCdcXFxyXG4gICAgICAgICAgICA8JSBzdWJicmVkZGl0cy5lYWNoKGZ1bmN0aW9uKHN1YmJyZWRkaXQpIHsgJT5cXFxyXG4gICAgICAgICAgICAgICAgPGxpPjxhIGRhdGEtaWQ9XCI8JT1zdWJicmVkZGl0LmlkICU+XCIgaHJlZj1cIiNcIj48JT0gc3ViYnJlZGRpdC5nZXQoXCJuYW1lXCIpICU+PC9hPjwvbGk+XFxcclxuICAgICAgICAgICAgPCUgfSkgJT5cXFxyXG4gICAgICAgICcpLFxyXG5cclxuICAgICAgICBldmVudHM6IHtcclxuICAgICAgICAgICAgJ2NsaWNrIGEnOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3ViYnJlZGRpdElkID0gJChlLnRhcmdldCkuZGF0YSgnaWQnKTtcclxuICAgICAgICAgICAgICAgIHZhciBTdWJicmVkZGl0TW9kZWwgPSByZXF1aXJlKCcuLi9tb2RlbHMvU3ViYnJlZGRpdE1vZGVsLmpzJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3ViYnJlZGRpdCA9IG5ldyBTdWJicmVkZGl0TW9kZWwoe2lkOiBzdWJicmVkZGl0SWR9KTtcclxuICAgICAgICAgICAgICAgIHN1YmJyZWRkaXQuZmV0Y2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgUG9zdHNMaXN0VmlldyA9IHJlcXVpcmUoJy4vUG9zdHNMaXN0Vmlldy5qcycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zdHNMaXN0VmlldyA9IFBvc3RzTGlzdFZpZXcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbjogc3ViYnJlZGRpdC5nZXQoJ3Bvc3RzJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNwb3N0cycpLmh0bWwocG9zdHNMaXN0Vmlldy5yZW5kZXIoKS5lbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29sbGVjdGlvbiwgJ3VwZGF0ZScsIHRoaXMucmVuZGVyKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoeyBzdWJicmVkZGl0czogdGhpcy5jb2xsZWN0aW9uIH0pKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFN1YmJyZWRkaXRzTGlzdFZpZXc7Il19

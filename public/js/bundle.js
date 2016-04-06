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
},{"./views/HomeView.js":2}],2:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvanMvYXBwLmpzIiwicHVibGljL2pzL3ZpZXdzL0hvbWVWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBIb21lVmlldyA9IHJlcXVpcmUoJy4vdmlld3MvSG9tZVZpZXcuanMnKTtcclxuXHJcbiQoZG9jdW1lbnQpLm9uKCdyZWFkeScsIGZ1bmN0aW9uKCkge1xyXG5cclxuJC5hamF4U2V0dXAoe1xyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICAgICdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpXHJcbiAgICB9XHJcbn0pO1xyXG5cclxudmFyIGhvbWVWaWV3ID0gbmV3IEhvbWVWaWV3KCk7XHJcbiQoJyNjb250ZW50JykuaHRtbChob21lVmlldy5yZW5kZXIoKS5lbCk7XHJcblxyXG59KSIsInZhciBIb21lVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcclxuICAgIGVsOidcXFxyXG4gICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxcXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aHJlZSBjb2x1bW5zXCI+PC9kaXY+XFxcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpeCBjb2x1bW5zXCI+XFxcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VsdmUgY29sdW1uc1wiIGlkPVwicG9zdHNcIj48L2Rpdj5cXFxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d2VsdmUgY29sdW1uc1wiPjwvZGl2PlxcXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgICA8L2Rpdj5cXFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGhyZWUgY29sdW1uc1wiIGlkPVwiYWxsLXN1YmJyZWRkaXRzXCI+PC9kaXY+XFxcclxuICAgICAgICA8L2Rpdj5cXFxyXG4gICAgPC9kaXY+XFxcclxuICAgICcsXHJcblxyXG4gICAgaW5zZXJ0U3ViYnJlZGRpdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzdWJicmVkZGl0cyA9IG5ldyBTdWJicmVkZGl0c0NvbGxlY3Rpb24oKTtcclxuICAgICAgICBzdWJicmVkZGl0cy5mZXRjaCgpO1xyXG4gICAgICAgIHZhciBzdWJicmVkZGl0c0xpc3RWaWV3ID0gbmV3IFN1YmJyZWRkaXRzTGlzdFZpZXcoeyBcclxuICAgICAgICAgICAgY29sbGVjdGlvbjogc3ViYnJlZGRpdHNcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRlbC5maW5kKCcjYWxsLXN1YmJyZWRkaXRzJykuaHRtbChzdWJicmVkZGl0c0xpc3RWaWV3LnJlbmRlcigpLmVsKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5zZXJ0UG9zdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwb3N0cyA9IG5ldyBQb3N0c0NvbGxlY3Rpb24oKTtcclxuICAgICAgICBwb3N0cy5mZXRjaCgpO1xyXG4gICAgICAgIHZhciBwb3N0c0xpc3RWaWV3ID0gbmV3IFBvc3RzTGlzdFZpZXcoeyBcclxuICAgICAgICAgICAgY29sbGVjdGlvbjogcG9zdHNcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRlbC5maW5kKCcjcG9zdHMnKS5odG1sKHBvc3RzTGlzdFZpZXcucmVuZGVyKCkuZWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuaW5zZXJ0U3ViYnJlZGRpdHMoKTtcclxuICAgICAgICB0aGlzLmluc2VydFBvc3RzKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSG9tZVZpZXc7Il19

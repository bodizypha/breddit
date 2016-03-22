var posts = new postsCollection();

posts.fetch();
	success: function() 
	var postsListView = new PostsListView ({collection: posts});
	postsListView.render();
	$('#content').html(postsListView.el);
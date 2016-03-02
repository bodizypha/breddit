<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return \App\Post::all();
    }

    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $post = new \App\Post;
        $post->title = $request->title;
        $post->content = $request->post_content;
        $post->subbreddit_id = $request->subbreddit_id;
        $post->user_id = $request->user_id;
        $post->url = $request->url;

        $post->save();

        return $post;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return \App\Post::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function update(Request $request, $id)
    {
        $post = \App\Post::find($id);
        $post->title = $request->title;
        $post->content = $request->post_content;
        $post->subbreddit_id = $request->subbreddit_id;
        $post->user_id = $request->user_id;
        $post->url = $request->url;

        $post->save();

        return $post;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = \App\post::find($id);
        $post->delete();
         return $post;
    }
}
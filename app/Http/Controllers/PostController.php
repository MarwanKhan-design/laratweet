<?php

namespace App\Http\Controllers;

use App\Models\Post;

use Illuminate\Http\Request;

class PostController extends Controller
{

    public function index(Request $request, Post $post)
    {
        $allPosts = $post->whereIn('user_id', $request->user()->following()->pluck('users.id')->push($request->user()->id))->with('user');

        $posts = $allPosts->orderBy('created_at', 'desc')->take(10)->get();
        return response()->json([
            'posts' => $posts,
        ]);
    }

    public function create(Request $request, Post $post)
    {
        $createdPost = $request->user()->posts()->create([
            'body' => $request->body,
        ]);

        return response()->json($post->with('user')->find($createdPost->id));
    }
}

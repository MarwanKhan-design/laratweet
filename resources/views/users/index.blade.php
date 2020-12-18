@extends('layouts.app')

@section('content')
<div class="container">
    {{$user->username}}
    @if (Auth::user($user)->isNotTheUser($user))
        @if (Auth::user()->isFollowing($user))
       <a href="{{route('user.unfollow', $user)}}">unfollow</a>
        @else
<a href="{{ route('user.follow', $user) }}">follow</a>
        @endif
    @endif
</div>

@endsection

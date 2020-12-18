<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TimelineController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();


Route::group(['middleware' => ['auth']], function () {
    Route::get('/', [TimelineController::class, 'index']);
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'create']);


    Route::get('/users/{user}', [UserController::class, 'index'])->name('users');
    Route::get('/users/{user}/follow', [UserController::class, 'follow'])->name('user.follow');
    Route::get('/users/{user}/unfollow', [UserController::class, 'unFollow'])->name('user.unfollow');
});

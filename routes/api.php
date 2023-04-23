<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReadingListController;
use App\Http\Controllers\ReviewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/book/reading_status', [BookController::class, 'updateReadingStatus']);
    Route::get('/book/check_record', [BookController::class, 'checkRecord']);
    Route::post('/book/find-book-by-googlebooksid', [BookController::class, 'findBookByGoogleBooksId'])->name('book.findBookByGoogleBooksId');

    Route::get('/mypage/reading-list/{status?}', [ReadingListController::class, 'fetchBooks']);

    // プロフィール情報取得API
    // Route::get('/profile', [ProfileController::class, 'getProfile']);

    // review機能
    Route::post('/reviews/storeOrUpdate', [ReviewController::class, 'storeOrUpdate'])->name('reviews.storeOrUpdate');

});
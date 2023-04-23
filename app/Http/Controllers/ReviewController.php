<?php

namespace App\Http\Controllers;

use App\Http\Requests\Review\StoreOrUpdateRequest;
use App\Models\Book;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ReviewController extends Controller
{

    public function storeOrUpdate(StoreOrUpdateRequest $request): JsonResponse
    {
        $user = $request->user();
        $bookId = $request->book_id;
        $rating = $request->rating;
        $comment = $request->comment;

        Log::info($bookId);
        Log::info($rating);
        Log::info($comment);

        $review = Review::updateOrCreate(
            [
                'user_id' => $user->id,
                'book_id' => $bookId,
            ],
            [
                'rating' => $rating,
                'comment' => $comment,
            ]
        );

        Log::info($review);


        return response()->json(['message' => 'Review saved successfully', 'review' => $review]);
    }
}

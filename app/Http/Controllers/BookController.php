<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\CheckRecordRequest;
use App\Http\Requests\Book\FindBookByGoogleBooksIdRequest;
use App\Http\Requests\Book\UpdateReadingStatusRequest;
use App\Models\Book;
use App\UseCases\Book\CheckRecordAction as BookCheckRecordAction;
use App\UseCases\Book\FindBookByGoogleBooksIdAction;
use App\UseCases\Book\UpdateReadingStatusAction;
use App\UseCases\CheckRecordAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    /**
     * updateReadingStatus
     *
     * @param UpdateReadingStatusRequest $request
     * @param UpdateReadingStatusAction $action
     * @return JsonResponse
     */
    public function updateReadingStatus(UpdateReadingStatusRequest $request, UpdateReadingStatusAction $action): JsonResponse
    {
        $result = $action($request);

        return response()->json($result);
    }


    /**
     * Check if the user has a record for the book.
     *
     * @param CheckRecordRequest $request
     * @param CheckRecordAction $action
     * @return JsonResponse
     */
    public function checkRecord(CheckRecordRequest $request, BookCheckRecordAction $action): JsonResponse
    {
        $result = $action($request);
        return response()->json($result);
    }


    /**
     * Find a book by its Google Books ID.
     *
     * @param FindBookByGoogleBooksIdRequest $request
     * @param FindBookByGoogleBooksIdAction $action
     * @return JsonResponse
     */
    public function findBookByGoogleBooksId(FindBookByGoogleBooksIdRequest $request, FindBookByGoogleBooksIdAction $action): JsonResponse
    {
        $book = $action($request);
        return response()->json(['book' => $book]);
    }
}

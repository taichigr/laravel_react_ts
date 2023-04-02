<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\CheckRecordRequest;
use App\Http\Requests\Book\UpdateReadingStatusRequest;
use App\UseCases\Book\CheckRecordAction as BookCheckRecordAction;
use App\UseCases\Book\UpdateReadingStatusAction;
use App\UseCases\CheckRecordAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
     * checkRecord
     *
     * @param CheckRecordRequest $request
     * @param CheckRecordAction $action
     * @return JsonResponse
     */
    public function checkRecord(CheckRecordRequest $request, BookCheckRecordAction $action): JsonResponse
    {

        $user = $request->user();
        $google_book_id = $request->book_id;

        $result = $action($user, $google_book_id);

        return response()->json($result);
    }
}

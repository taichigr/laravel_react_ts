<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\UpdateReadingStatusRequest;
use App\Models\Book;
use App\Models\ReadingRecord;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): Response
    {
        //
        dd('this is bookcontroller transaction. store action method');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): Response
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): Response
    {
        //
    }


    /**
     * Undocumented function
     *
     * @param Request $request
     * @return Response
     */
    // public function updateReadingStatus(Request $request): Response
    public function updateReadingStatus(UpdateReadingStatusRequest $request)
    {
        $user = $request->user();
    
        $book = Book::firstOrCreate(
            ['google_book_id' => $request->bookId],
            [
                'title' => $request->title,
                'author' => $request->author,
                'publisher' => $request->publisher,
                'image_url' => $request->imageUrl,
            ]
        );
    
        $readingRecord = ReadingRecord::updateOrCreate(
            [
                'user_id' => $user->id,
                'book_id' => $book->id,
            ],
            [
                'read_date' => now()->format('Y-m-d H:i:s'),
                'status' => $request->status,
            ]
        );
    
        return response()->json([
            'message' => 'Reading status updated successfully',
            'readingRecord' => $readingRecord,
        ]);
    }
}

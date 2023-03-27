<?php

namespace App\UseCases\Book;

use App\Models\Book;
use App\Models\ReadingRecord;
use App\Http\Requests\Book\UpdateReadingStatusRequest;

class UpdateReadingStatusAction
{
    public function __invoke(UpdateReadingStatusRequest $request)
    {
        $user = $request->user();
        Log::info($user);

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

        return [
            'message' => 'Reading status updated successfully',
            'readingRecord' => $readingRecord,
        ];
    }
}

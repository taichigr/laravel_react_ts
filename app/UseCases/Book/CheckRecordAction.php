<?php

namespace App\UseCases\Book;

use App\Models\Book;
use App\Models\ReadingRecord;
use App\Http\Requests\Book\CheckRecordRequest;

class CheckRecordAction
{
    public function __invoke(CheckRecordRequest $request)
    {
        $user = $request->user();
        $googleBooksId = $request->google_books_id;

        $book = Book::where('google_books_id', $googleBooksId)->first();

        if (!$book) {
            return [
                'exists' => false,
                'status' => null,
            ];
        }

        $readingRecordQuery = ReadingRecord::where(['book_id' => $book->id, 'user_id' => $user->id]);
        $readingRecordExists = $readingRecordQuery->exists();
        $readingRecord = $readingRecordQuery->first();

        return [
            'exists' => $readingRecordExists,
            'status' => $readingRecord ? $readingRecord->status : null,
        ];
    }
}

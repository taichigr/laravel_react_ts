<?php

namespace App\UseCases\Book;

use App\Models\Book;
use App\Models\ReadingRecord;
use App\Models\User;

class CheckRecordAction
{
    public function __invoke(User $user, string $googleBooksId): array
    {
        // Find book by google_books_id
        $book = Book::where('google_books_id', $googleBooksId)->first();

        // If book is not found, return early with no record found
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

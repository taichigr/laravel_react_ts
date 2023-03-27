<?php

namespace App\UseCases\Book;

use App\Models\Book;
use App\Models\ReadingRecord;
use App\Models\User;

class CheckRecordAction
{
    public function __invoke(User $user, string $googleBookId): array
    {
        // Find book by google_book_id
        $book = Book::where('google_book_id', $googleBookId)->first();

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

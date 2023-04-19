<?php

namespace App\UseCases\Book;

use App\Models\Book;
use App\Http\Requests\Book\FindBookByGoogleBooksIdRequest;

class FindBookByGoogleBooksIdAction
{
    public function __invoke(FindBookByGoogleBooksIdRequest $request)
    {
        $googleBooksId = $request->input('google_books_id');
        $book = Book::where('google_books_id', $googleBooksId)->first();

        return $book;
    }
}

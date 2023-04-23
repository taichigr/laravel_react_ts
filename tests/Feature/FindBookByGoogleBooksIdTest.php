<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Book;

class FindBookByGoogleBooksIdTest extends TestCase
{
    use RefreshDatabase;

    public function test_find_book_by_google_books_id()
    {
        // Prepare
        $book = Book::factory()->create([
            'google_books_id' => 'test_google_books_id',
        ]);

        // Act
        $response = $this->getJson(route('book.findBookByGoogleBooksId', ['google_books_id' => $book->google_books_id]));

        // Assert
        $response->assertStatus(200);
        $response->assertJson([
            'book' => [
                'google_books_id' => $book->google_books_id,
            ],
        ]);
    }
}

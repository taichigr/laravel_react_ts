<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Book;
use App\Models\ReadingRecord;
use App\Models\User;

class CheckRecordTest extends TestCase
{
    use RefreshDatabase;

    public function test_check_record()
    {
        // Prepare
        $user = User::factory()->create();
        $book = Book::factory()->create([
            'google_books_id' => 'test_google_books_id',
        ]);
        $readingRecord = ReadingRecord::factory()->create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'status' => 'to_read',
        ]);

        // Act
        $response = $this->actingAs($user)->getJson(route('book.checkRecord', ['google_books_id' => $book->google_books_id]));

        // Assert
        $response->assertStatus(200);
        $response->assertJson([
            'exists' => true,
            'status' => $readingRecord->status,
        ]);
    }
}

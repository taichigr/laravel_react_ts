<?php

namespace Tests\Unit;

use App\Models\Book;
use App\Models\User;
use App\Models\ReadingRecord;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReadingListControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_books_with_status_filter()
    {
        $user = User::factory()->create();

        // Create books
        $book1 = Book::factory()->create();
        $book2 = Book::factory()->create();
        $book3 = Book::factory()->create();

        // Create reading records with different reading statuses
        $toReadRecord = ReadingRecord::factory()->create(['book_id' => $book1->id, 'user_id' => $user->id, 'status' => 'to_read']);
        $readingRecord = ReadingRecord::factory()->create(['book_id' => $book2->id, 'user_id' => $user->id, 'status' => 'reading']);
        $finishedRecord = ReadingRecord::factory()->create(['book_id' => $book3->id, 'user_id' => $user->id, 'status' => 'finished']);

        // Authenticate the user
        $this->actingAs($user);

        // Request reading records with the 'reading' status
        $response = $this->get('/api/mypage/reading-list/reading');

        // Check if the response has a 200 status code
        $response->assertStatus(200);

        // Check if the returned reading records have the correct status
        $response->assertJsonPath('0.id', $readingRecord->id);
    }
}

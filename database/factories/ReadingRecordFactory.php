<?php

namespace Database\Factories;

use App\Models\ReadingRecord;
use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReadingRecordFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ReadingRecord::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'book_id' => Book::factory(),
            'user_id' => User::factory(),
            'read_date' => $this->faker->dateTime(),
            'status' => $this->faker->randomElement(['to_read', 'reading', 'finished', 'unread']),
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'publisher',
        'published_date',
        'google_book_id',
        'image_url',
    ];

    public function readingRecords()
    {
        return $this->hasMany(ReadingRecord::class);
    }
}

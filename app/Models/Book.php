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
        'google_books_id',
        'image_url',
    ];

    // ステータス定数
    const STATUS_TO_READ = 'to_read';
    const STATUS_READING = 'reading';
    const STATUS_FINISHED = 'finished';
    const STATUS_UNREAD = 'unread';


    // ステータスのラベル
    public static $statusLabels = [
        self::STATUS_TO_READ => '読みたい',
        self::STATUS_READING => '読んでいる途中',
        self::STATUS_FINISHED => '読み終わった',
        self::STATUS_UNREAD => '積読',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function readingRecords()
    {
        return $this->hasMany(ReadingRecord::class);
    }
}

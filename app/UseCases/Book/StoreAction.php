<?php

use App\Models\Book;

class StoreAction
{
    public function __invoke(Book $book): Book
    {
        // バグを防ぐために簡易的にアサーションを書く
        // assert($user->exists);


        // $userPostsCountToday = $user
        //     ->posts()
        //     ->where('community_id', $community->id)
        //     ->where('created_at', '>=', Carbon::midnight())
        //     ->count();
        // if ($userPostsCountToday >= 200) {
        //     throw new PostLimitExceededException('本日の投稿可能な回数を超えました。');
        // }

        // $post->save();
        // return $post;
    }
}

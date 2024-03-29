<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\ReadingRecord;

class ReadingListController extends Controller
{
    //
    /**
     * updateReadingStatus
     *
     * @param UpdateReadingStatusRequest $request
     * @param UpdateReadingStatusAction $action
     * @return JsonResponse
     */
    public function fetchBooks(Request $request)
    {
        $status = $request->status;
        $user = auth()->user();

        // クエリビルダーのインスタンスを作成
        $query = ReadingRecord::query()
            ->where('user_id', $user->id)
            ->with('book');

        // ステータスが設定されている場合、ステータスでフィルタリング
        if ($status) {
            $query->where('status', $status);
        }

        // 本の件数を取得
        $bookCount = $query->count();

        // クエリを実行し、結果を取得
        $readingRecords = $query->get();

        // 件数も含めてレスポンスを返す
        return response()->json([
            'readingRecords' => $readingRecords,
            'bookCount' => $bookCount,
        ]);
    }
}

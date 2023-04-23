<?php

namespace App\Http\Requests\Book;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReadingStatusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => "required|string",
            'author' => "required|string",
            'publisher' => "required|string",
            'image_url' => "required|string",
            'status' => 'required|in:to_read,reading,finished,unread',
            'google_books_id' => 'required|string',
        ];
    }
}

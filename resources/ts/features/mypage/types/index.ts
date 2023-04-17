export interface ReadingRecord {
    key: string;
    id: number;
    book_id: number;
    user_id: number;
    read_date: string;
    status: string;
    created_at: string;
    updated_at: string;
    book: Book;
}

export interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    google_books_id: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

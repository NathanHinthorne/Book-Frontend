import { revalidateTag } from "next/cache";
import { IBook, IRatings } from "src/core/model/book.model";

// Helper function to make fetch requests
async function fetchWithRevalidate(url: string, options: RequestInit, tags: string[] = []) {
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok && tags.length > 0) {
    tags.forEach(tag => revalidateTag(tag));
  }
  return { data, status: res.status, ok: res.ok };
}

//TODO - remove this function
// I'm having trouble doing revlidaion on book api responses. For now, I'm just going to use this function - Nathan
async function justFetch(url: string, options: RequestInit) {
  const res = await fetch(url, options);
  const data = await res.json();
  return { data, status: res.status, ok: res.ok };
}


// ---- GET ----

export async function getAllBooks(pageNumber?: number, booksPerPage?: number) {
  let data;
  if (pageNumber && booksPerPage) {
    ({ data } = await justFetch(`http://localhost:4000/books/all?page=${pageNumber}&limit=${booksPerPage}`, {
      method: "GET",
    }));
  } else {
    ({ data } = await justFetch(`http://localhost:4000/books/all`, {
      method: "GET",
    }));
  }

  // The response data is an object with a "books" property
  // Thus, we should return the "books" property directly
  console.log(data.books);
  return data.books;
}

export async function getBookByIsbn(isbn: number) {
  const { data } = await fetchWithRevalidate(`http://localhost:4000/books?isbn=${isbn}`, {
    method: "GET",
  }, ["books"]);

  return data.books;
}

export async function getBookByTitle(title: string) {
  const { data } = await fetchWithRevalidate(`http://localhost:4000/books?title=${title}`, {
    method: "GET",
  }, ["books"]);

  return data.books;
}

export async function getBookByAuthor(author: string) {
  const { data } = await fetchWithRevalidate(`http://localhost:4000/books?author=${author}`, {
    method: "GET",
  }, ["books"]);

  return data.books;
}

export async function getBookByPublicationYear(publicationYear: number) {
  const { data } = await fetchWithRevalidate(`http://localhost:4000/books?pub_year=${publicationYear}`, {
    method: "GET",
  }, ["books"]);

  return data.books;
}

export async function getBookByRating(rating: number) {
  const { data } = await fetchWithRevalidate(`http://localhost:4000/books?rating=${rating}`, {
    method: "GET",
  }, ["books"]);

  return data.books;
}


// ---- PUT ----

export async function updateRatingsById(id: number, ratings: IRatings) {
  const response = await fetch(`http://localhost:4000/books/update-rating/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ratings: ratings }),
    cache: "no-store",
  });

  const message = await response.text();

  return message;
}

export async function updateRatingsByIsbn(isbn: number, ratings: IRatings) {
  const response = await fetch(`http://localhost:4000/books/update-rating/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isbn13: isbn,
      ratings: ratings
    }),
    cache: "no-store",
  });

  const message = await response.text();

  return message;
}



// ---- POST ----

export async function createBook(book: IBook) {
  const response = await fetch(`http://localhost:4000/books/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
    cache: "no-store",
  });

  const message = await response.text();

  return message;
}



// ---- DELETE ----

export async function deleteBook(isbn: number) {
  const response = await fetch(`http://localhost:4000/books/delete/${isbn}`, {
    method: "DELETE",
    cache: "no-store",
  });

  const message = await response.text();

  return message;
}

export async function deleteBooks(isbns: number[]) {
  const response = await fetch(`http://localhost:4000/books/multiple_delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isbn13s: isbns }),
    cache: "no-store",
  });

  const message = await response.text();

  return message;
}


import { revalidateTag } from "next/cache";

let count = 0;

//TODO customize these based on the web API we're interacting with

export async function GET() {
  const res = await fetch("http://localhost:4000/book/all", {
    next: { tags: ["books"] },
  });
  const data = await res.json();
  return Response.json({ data });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const isbn13 = searchParams.get("isbn13");

  const res = await fetch("http://localhost:4000/book/" + isbn13, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    cache: "no-store",
  });
  const data = await res.json();
  if (res.ok) {
    revalidateTag("books");
  }
  return Response.json({ data });
}

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch("http://localhost:4000/book/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body.data), // body data type must match "Content-Type" header
    cache: "no-store",
  });
  const data = await res.json();

  if (res.ok) {
    revalidateTag("books");
  }

  return Response.json({ data }, { status: res.status });
}
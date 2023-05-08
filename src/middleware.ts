import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const headers = new Headers(request.headers);
  headers.set('x-origin', new URL(request.url).origin);

  return NextResponse.next({
    request: {
      headers,
    }
  });
}

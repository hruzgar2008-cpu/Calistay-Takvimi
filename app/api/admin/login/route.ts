import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SEC,
  ADMIN_SESSION_SECRET_MIN_LENGTH,
  signAdminSessionToken,
} from '@/lib/admin-session';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  const sessionSecret = process.env.ADMIN_SESSION_SECRET?.trim();

  if (
    !hash ||
    !sessionSecret ||
    sessionSecret.length < ADMIN_SESSION_SECRET_MIN_LENGTH
  ) {
    return NextResponse.json(
      {
        error:
          'Sunucu yapilandirmasi eksik. .env.local icinde ADMIN_PASSWORD_HASH ve ADMIN_SESSION_SECRET (en az 32 karakter) tanimlayin.',
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Gecersiz istek.' }, { status: 400 });
  }

  const password =
    typeof body === 'object' &&
    body !== null &&
    'password' in body &&
    typeof (body as { password: unknown }).password === 'string'
      ? (body as { password: string }).password
      : '';

  if (!password || password.length > 512) {
    return NextResponse.json({ error: 'Gecersiz sifre.' }, { status: 400 });
  }

  await new Promise((r) => setTimeout(r, 450));

  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    return NextResponse.json({ error: 'Sifre hatali.' }, { status: 401 });
  }

  const token = await signAdminSessionToken();
  if (!token) {
    return NextResponse.json({ error: 'Oturum olusturulamadi.' }, { status: 500 });
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SEC,
  });

  return NextResponse.json({ ok: true });
}

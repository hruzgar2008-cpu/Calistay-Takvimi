import { SignJWT, jwtVerify } from 'jose';

export const ADMIN_COOKIE_NAME = 'calistay_admin_session';
const ALG = 'HS256';

/** Minimum uzunluk: JWT imza icin guvenli bir sır. */
export const ADMIN_SESSION_SECRET_MIN_LENGTH = 32;

export function getAdminSessionSecretBytes(): Uint8Array | null {
  const s = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!s || s.length < ADMIN_SESSION_SECRET_MIN_LENGTH) return null;
  return new TextEncoder().encode(s);
}

export async function signAdminSessionToken(): Promise<string | null> {
  const secret = getAdminSessionSecretBytes();
  if (!secret) return null;
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime('12h')
    .setSubject('calistay-admin')
    .sign(secret);
}

export async function verifyAdminSessionToken(token: string): Promise<boolean> {
  const secret = getAdminSessionSecretBytes();
  if (!secret) return false;
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: [ALG] });
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export const ADMIN_SESSION_MAX_AGE_SEC = 60 * 60 * 12;

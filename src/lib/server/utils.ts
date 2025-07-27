import 'server-only';
import crypto from 'crypto';

export function decryptKey(ciphertextB64: string, salt: string): string {
  // Derive key (32 bytes) from salt using SHA-256
  const key = crypto.createHash('sha256').update(salt).digest();
  const ciphertext = Buffer.from(ciphertextB64, 'base64');

  const nonceSize = 12;
  if (ciphertext.length < nonceSize) {
    throw new Error('Ciphertext too short');
  }
  const nonce = ciphertext.subarray(0, nonceSize);
  const enc = ciphertext.subarray(nonceSize);

  // Decrypt
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, nonce);
  const tag = enc.subarray(enc.length - 16);
  const encrypted = enc.subarray(0, enc.length - 16);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encrypted, undefined, 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

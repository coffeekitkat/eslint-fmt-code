import {
  Buffer,
  createCipheriv,
  createDecipheriv,
  privateDecrypt,
  publicEncrypt,
  randomBytes,
}
  from './cyph-imports';

export interface EncryptedMessage {
  encryptedMessage: string;
  encryptedAesKey: string;
  iv: string;
}

function clientEncrypt(plainText: string, publicKeyPem: string): EncryptedMessage {
  const aesKey = randomBytes(32);
  const iv = randomBytes(16);

  const cipher = createCipheriv('aes-256-cbc', aesKey, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  const encryptedAesKey = publicEncrypt(publicKeyPem, aesKey);

  return {
    encryptedMessage: encrypted,
    encryptedAesKey: encryptedAesKey.toString('base64'),
    iv: iv.toString('base64'),
  };
}

function serverDecrypt({ encryptedMessage, encryptedAesKey, iv }: EncryptedMessage, serverPrivateKeyPem: string): string {
  const aesKey = privateDecrypt(
    serverPrivateKeyPem,
    Buffer.from(encryptedAesKey, 'base64'),
  );

  const decipher = createDecipheriv(
    'aes-256-cbc',
    aesKey,
    Buffer.from(iv, 'base64'),
  );

  let decrypted = decipher.update(encryptedMessage, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

export {
  clientEncrypt,
  serverDecrypt,
};

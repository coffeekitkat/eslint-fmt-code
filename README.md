# kz-js-utils

## API Reference

### Time-Safe Equal

Time-safe comparison of two buffers, strings, or Uint8Arrays to prevent timing attacks.

```ts
import { timeSafeEqual } from 'kz-js-utils/buffer';

const isEqual = timeSafeEqual('string1', 'string2'); // false
```

### Password Hashing

Utility functions to hash and verify passwords securely using scrypt algorithm. This is native  to Node.js and works on both server and browser environments.

```ts
import { hashPassword, verifyPassword } from 'kz-js-utils/password';

const hashedPassword = await hashPassword('mySecurePassword123!'); // e.g., 'randomSalt:hashedPasswordString'

const isPasswordValid = await verifyPassword(hashedPassword, 'mySecurePassword123!'); // true
const isPasswordInvalid = await verifyPassword(hashedPassword, 'wrongPassword'); // false
```

### ID Generators

Utility functions to generate unique identifiers that are proven to be effective in various scenarios.

```ts
import {
  createTaggedUID,
  createUID,
  generateCustomRandomString,
  generateRandomString,
  uuiv4,
  uuiv7
} from 'kz-js-utils/id-generators';

// Generate a UUIDv7
uuiv7(); // e.g., '017f1f3e-8b6c-7e4a-9f3c-2d3e4f5g6h7i'

// Generate a simple UID (CUID)
createUID(); // e.g., 'cxyz1234567890abcdefg'

// Generate a tagged UID (CUID with prefix)
createTaggedUID('user_'); // e.g., 'user_cxyz1234567890abcdefg'

// Generate a random string of default length (16)
generateRandomString(); // e.g., 'a1b2c3d4e56f7g8'

// Generate a custom random string with specified length and alphabet
// Default alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
generateCustomRandomString({
  length: 32,
  alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
}); // e.g., 'h1i2j3k4l5mno6p7q8r9s0tuvwxyzABCD'
```

### Disclaimer

This project is not affiliated with any company or organization. The code is provided as-is, without warranty of any kind. Use at your own risk. The author is not responsible for any damages or privacy violations or issues that may arise from using this code.
Any misuse of this code is not the responsibility of the author. By using this code, you agree to these terms.

> This is a project for learning on concepts like wrapping a library, encapsulating a common library to reduce boilerplate code, cross platform and framework agnostic package, etc. including telemetry practices.
>
> If you have found intrusive code in this package, it's probably because of how the clients/company requires to implement and track developer usage.

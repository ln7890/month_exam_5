import { compare, hash } from "bcrypt";

export class Crypto {
  async encrypt(data) {
    return hash(data, 7);
  }
  async decrypt(data, hashed_password) {
    return compare(data, hashed_password);
  }
}

import * as bcrypt from "bcrypt";

export class PasswordUtil {
  private static readonly SALT_ROUNDS = 10;

  /**
   * Generate a hashed password.
   * @param password - The plain text password.
   * @returns The hashed password.
   */
  static async generateHash(password: string): Promise<string> {
    if (!password || password.trim().length === 0) {
      throw new Error("Password cannot be empty");
    }

    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }

  /**
   * Validate a password against a hashed password.
   * @param password - The plain text password.
   * @param hash - The hashed password.
   * @returns `true` if the password matches the hash, otherwise `false`.
   */
  static async validatePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    if (!password || !hash) {
      throw new Error("Password and hash are required");
    }

    return bcrypt.compare(password, hash);
  }
}

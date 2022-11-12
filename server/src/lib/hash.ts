import bcrypt from 'bcrypt';

export async function hashPassword(password: string, salt = 10) {
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function checkPassword(
  rawPassword: string,
  hashedPassword: string
) {
  const passwordMatches = await bcrypt.compare(rawPassword, hashedPassword);

  return passwordMatches;
}

export function randomFn(length: number, option: { [key: string]: boolean }): string {
  const set = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    number: '0123456789',
    symbol: '!@#$%^&*()_+-=[]{}|;:,?'
  }

  let charset = "";
  if (option.uppercase === true) charset += set.uppercase;
  if (option.lowercase === true) charset += set.lowercase;
  if (option.number === true) charset += set.number;
  if (option.symbol === true) charset += set.symbol;

  let password = "";
  for (let i: number = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

export function validateFn(password: string): number {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[\W_]/.test(password);

  let score = -1
  if (hasUppercase) score++
  if (hasLowercase) score++
  if (hasNumber) score++
  if (hasSymbol) score++
  if (password.length >= 15) score++
  return score
}


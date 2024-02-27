export function validateUrl(url: string): boolean {
  const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,}\.?)([/\w .-]*)(\?\S*)?$/;
  return URL_REGEX.test(url);
}

export function validateAlias(alias: string): boolean {
  return alias.length >= 3 && alias.length <= 8;
}

export function combineUrl(url: string) {
  return process.env.NEXT_PUBLIC_API_URL + "/" + url;
}

import InvalidSessionException from "@/exception/InvalidSessionException";

export async function fetcher<T>(
  url: string,
  option?: RequestInit,
): Promise<T> {
  const fetchOption = option
    ? option
    : ({
        cache: "no-store",
      } as RequestInit);

  const res: Response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + url,
    fetchOption,
  );

  if (!res.ok) {
    throw new InvalidSessionException();
  }

  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json") == false) {
    throw new Error("Invalid content type");
  }
  return res.json() as Promise<T>;
}

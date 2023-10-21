import InvalidSessionException from "@/exception/InvalidSessionException";

type Props = { file: File; token: String };

export default async function uploadImage({ file, token }: Props) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload/image`,
    {
      method: "POST",
      body: formData,
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new InvalidSessionException();
  }
  return res.json() as Promise<{
    message: string;
  }>;
}

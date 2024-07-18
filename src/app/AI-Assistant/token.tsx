import ClientComponent from "./ClientComponent";
import { fetchAccessToken } from "@humeai/voice";

export default async function AIChat() {
  const accessToken = await fetchAccessToken({
    apiKey: process.env.HUME_API_KEY as string,
    secretKey: process.env.HUME_CLIENT_SECRET as string,
  });

  if (!accessToken) {
    throw new Error("Failed to fetch access token.");
  }

  return <ClientComponent accessToken={accessToken} />;
}

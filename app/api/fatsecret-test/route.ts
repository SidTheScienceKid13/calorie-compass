import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.FATSECRET_CLIENT_ID;
  const clientSecret = process.env.FATSECRET_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Missing .env.local credentials" }, { status: 500 });
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://oauth.fatsecret.com/connect/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "basic",
    }),
  });

  const data = await response.json();

  return NextResponse.json(
    response.ok
      ? { success: true, message: "FatSecret token received." }
      : { success: false, fatSecretResponse: data },
    { status: response.status }
  );
}
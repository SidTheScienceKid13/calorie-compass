import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "Chipotle chicken bowl";

  const clientId = process.env.FATSECRET_CLIENT_ID;
  const clientSecret = process.env.FATSECRET_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Missing FatSecret credentials" }, { status: 500 });
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenResponse = await fetch("https://oauth.fatsecret.com/connect/token", {
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

  const token = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return NextResponse.json(token, { status: tokenResponse.status });
  }

  const foodResponse = await fetch(
    `https://platform.fatsecret.com/rest/foods/search/v3?search_expression=${encodeURIComponent(
      query
    )}&format=json`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );

  const foodData = await foodResponse.json();

  return NextResponse.json(foodData, { status: foodResponse.status });
}
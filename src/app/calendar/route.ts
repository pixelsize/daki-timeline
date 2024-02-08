export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return Response.json({ error: "No URL provided" }, { status: 400 });
  }

  const res = await fetch(url);

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }

  const data = await res.text();
  console.log(data);
  return Response.json({ data });
}

export const dynamic = "force-static"; // 👈 makes this route exportable

export async function GET() {
  return new Response(
    JSON.stringify({ message: "Good!" }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

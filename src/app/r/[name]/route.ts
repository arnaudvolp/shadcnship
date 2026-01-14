import { NextResponse } from "next/server";
import { getBlock, blockToRegistryItem } from "@/lib/registry";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const block = getBlock(name);

  if (!block) {
    return NextResponse.json(
      { error: "Block not found" },
      { status: 404 }
    );
  }

  // Convert to registry format for CLI compatibility
  const registryItem = blockToRegistryItem(block);

  return NextResponse.json(registryItem, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

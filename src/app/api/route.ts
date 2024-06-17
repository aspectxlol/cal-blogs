import { getAllPosts } from "@/lib/post";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request | NextRequest, res: Response | NextResponse) {
  // return res.json(await getAllPosts());
  // console.log("AA")
  return Response.json(await getAllPosts())
}

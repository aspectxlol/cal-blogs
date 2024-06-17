import { getAllPosts } from "@/lib/post";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // return res.json(await getAllPosts());
  // console.log("AA")
  return Response.json(await getAllPosts())
}

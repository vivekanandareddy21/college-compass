import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { collegeIds } = body;

    if (!collegeIds || !Array.isArray(collegeIds) || collegeIds.length === 0) {
      return NextResponse.json({ error: "At least one college ID is required." }, { status: 400 });
    }

    // Limit comparison to a maximum of 3 colleges
    const targetIds = collegeIds.slice(0, 3);

    const colleges = await prisma.college.findMany({
      where: {
        id: {
          in: targetIds,
        },
      },
      include: {
        courses: true,
        reviews: true,
      },
    });

    // Keep the ordering matching the requested list
    const sortedColleges = targetIds
      .map((id) => colleges.find((c) => c.id === id))
      .filter(Boolean) as typeof colleges;

    return NextResponse.json(sortedColleges);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to compare colleges: " + error.message }, { status: 500 });
  }
}

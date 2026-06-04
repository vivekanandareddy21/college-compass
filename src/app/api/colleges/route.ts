import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const locations = searchParams.getAll("location");
    const minRating = parseFloat(searchParams.get("minRating") || "0");
    const minFee = parseFloat(searchParams.get("minFee") || "0");
    const maxFee = parseFloat(searchParams.get("maxFee") || "99999999");
    const sortBy = searchParams.get("sortBy") || "name";
    const sortOrder = (searchParams.get("sortOrder") || "asc") as "asc" | "desc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");

    const where: any = {};

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (locations.length > 0) {
      where.OR = locations.map((loc) => ({
        location: {
          contains: loc,
          mode: "insensitive",
        },
      }));
    }

    if (minRating > 0) {
      where.rating = {
        gte: minRating,
      };
    }

    where.fees = {
      gte: minFee,
      lte: maxFee,
    };

    let orderBy: any = {};
    if (sortBy === "fees") {
      orderBy = { fees: sortOrder };
    } else if (sortBy === "rating") {
      orderBy = { rating: sortOrder };
    } else if (sortBy === "placement") {
      orderBy = { placementPercentage: sortOrder };
    } else {
      orderBy = { name: sortOrder };
    }

    const skip = (page - 1) * limit;

    const [total, colleges] = await prisma.$transaction([
      prisma.college.count({ where }),
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          courses: true,
        },
      }),
    ]);

    return NextResponse.json({
      colleges,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch colleges: " + error.message }, { status: 500 });
  }
}

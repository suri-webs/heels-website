import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import { dummyProducts } from "@/lib/dummyData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const featured = searchParams.get("featured");

    // Attempt to connect, but don't crash if it fails
    try {
      if (!process.env.MONGODB_URI) throw new Error("No DB URI");
      await dbConnect();
      
      const query: any = {};
      if (category && category !== "all") {
        query.category = category;
      }
      if (featured === "true") {
        query.featured = true;
      }

      let sortOptions: any = { createdAt: -1 };
      if (sort === "price-low") sortOptions = { price: 1 };
      if (sort === "price-high") sortOptions = { price: -1 };
      if (sort === "rating") sortOptions = { rating: -1 };

      const products = await Product.find(query).sort(sortOptions);
      if (products.length > 0) {
        return NextResponse.json(products, { status: 200 });
      }
      
      // If DB is connected but empty, also fallback to dummy for better UX
      throw new Error("Empty DB");
    } catch (dbError) {
      console.warn("API: Falling back to dummy data due to DB error or empty state.");
      
      let filtered = [...dummyProducts];
      if (category && category !== "all") {
        filtered = filtered.filter(p => p.category === category);
      }
      if (featured === "true") {
        filtered = filtered.filter(p => p.featured === true);
      }
      
      return NextResponse.json(filtered, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: "Critical Error", error: error.message }, { status: 500 });
  }
}

import dbConnect from "@/lib/db";
import { dummyProducts } from "@/lib/dummyData";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    try {
      await dbConnect();
      const product = await Product.findById(id);
      if (product) {
        return NextResponse.json(product, { status: 200 });
      }
    } catch (dbError) {
      console.warn("Product API: Falling back to dummy data for ID:", id);
    }

    // Fallback to dummy data
    const dummyProduct = dummyProducts.find(p => p._id === id);
    if (dummyProduct) {
      return NextResponse.json(dummyProduct, { status: 200 });
    }

    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error fetching product", error: error.message }, { status: 500 });
  }
}

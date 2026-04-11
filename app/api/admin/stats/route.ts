import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import User from "@/lib/models/User";
import Order from "@/lib/models/Order";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== "admin") return NextResponse.json({ message: "Not admin" }, { status: 403 });

      // Attempt to fetch from DB
      try {
        if (!process.env.MONGODB_URI) throw new Error("No DB URI");
        await dbConnect();

        const [productCount, userCount, orderCount, orders] = await Promise.all([
          Product.countDocuments(),
          User.countDocuments(),
          Order.countDocuments(),
          Order.find({ isPaid: true }).select("totalPrice"),
        ]);

        const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        return NextResponse.json({
          productCount,
          userCount,
          orderCount,
          totalRevenue,
        }, { status: 200 });
      } catch (dbError) {
        console.warn("Stats API: Falling back to dummy metrics.");
        return NextResponse.json({
          productCount: 12,
          userCount: 45,
          orderCount: 8,
          totalRevenue: 12450,
          isDummy: true
        }, { status: 200 });
      }
    } catch (authError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: "Error fetching stats", error: error.message }, { status: 500 });
  }
}

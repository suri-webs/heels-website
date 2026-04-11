import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";

const products = [
  {
    name: "Midnight Onyx Stiletto",
    description: "Classic black Italian leather with a 4-inch needle heel. The definition of timeless elegance.",
    price: 950,
    category: "stiletto",
    images: ["/assets/stiletto-black.png"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Noir"],
    stock: 20,
    rating: 4.9,
    numReviews: 45,
    featured: true
  },
  {
    name: "Celestial Pearl Bridal",
    description: "Handcrafted white silk pumps adorned with genuine freshwater pearls and silver glitter accents.",
    price: 1400,
    category: "bridal",
    images: ["/assets/bridal-silver.png"],
    sizes: ["35", "36", "37", "38", "39"],
    colors: ["Ivory", "Silvery White"],
    stock: 12,
    rating: 5.0,
    numReviews: 28,
    featured: true
  },
  {
    name: "Sahara Suede Block",
    description: "Tan suede comfort block heel with a minimal modern silhouette. Perfect for all-day luxury.",
    price: 550,
    category: "block",
    images: ["/assets/block-tan.png"],
    sizes: ["37", "38", "39", "40", "41"],
    colors: ["Tan", "Sand"],
    stock: 15,
    rating: 4.7,
    numReviews: 18,
    featured: false
  },
  {
    name: "Emerald Serpent Strappy",
    description: "Emerald green metallic straps with a needle-point heel. A bold statement for evening gala.",
    price: 880,
    category: "stiletto",
    images: ["/assets/strappy-emerald.png"],
    sizes: ["38", "39", "40", "41"],
    colors: ["Emerald"],
    stock: 8,
    rating: 4.8,
    numReviews: 12,
    featured: true
  },
  {
    name: "Rose Quartz Stiletto",
    description: "Soft pink velvet stiletto with gold-rimmed soles. Delicate yet commanding.",
    price: 750,
    category: "stiletto",
    images: ["/assets/product-shot.png"],
    sizes: ["36", "37", "38", "39"],
    colors: ["Rose"],
    stock: 10,
    rating: 4.6,
    numReviews: 22,
    featured: false
  },
  {
    name: "Marble White Block",
    description: "Artisan block heel with marble-textured finishes. Architectural beauty in footwear.",
    price: 620,
    category: "block",
    images: ["/assets/hero.png"],
    sizes: ["37", "38", "39", "40"],
    colors: ["Marble White"],
    stock: 5,
    rating: 4.9,
    numReviews: 9,
    featured: false
  },
  {
    name: "Gilded Cage Heel",
    description: "Intricate gold mesh strappy heel. A masterpiece of evening footwear.",
    price: 1100,
    category: "party",
    images: ["/assets/hero.png"],
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["Gold"],
    stock: 7,
    rating: 5.0,
    numReviews: 15,
    featured: true
  },
  {
    name: "Azure Suede Pump",
    description: "Deep azure blue suede pump with a subtle platform for added comfort.",
    price: 480,
    category: "casual",
    images: ["/assets/product-shot.png"],
    sizes: ["35", "36", "37", "38", "39", "40"],
    colors: ["Azure"],
    stock: 25,
    rating: 4.4,
    numReviews: 31,
    featured: false
  }
];

export async function GET() {
  try {
    await dbConnect();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert expanded catalog
    const seededProducts = await Product.insertMany(products);
    
    return NextResponse.json({
      message: "Premium Catalog Expanded Successfully",
      count: seededProducts.length,
      products: seededProducts
    }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({
      message: "Error seeding database",
      error: error.message
    }, { status: 500 });
  }
}

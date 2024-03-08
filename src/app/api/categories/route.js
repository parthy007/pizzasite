import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const { name } = await req.json();
  const categoryDoc = await Category.create({ name });
  return Response.json(categoryDoc);
}

export async function PUT(req) {
  const { _id, name } = await req.json();
  await mongoose.connect(process.env.MONGO_URL);
  await Category.updateOne({ _id }, { name });
  return Response.json(true);
}

export async function GET(req) {
  await mongoose.connect(process.env.MONGO_URL);
  return Response.json(await Category.find());
}

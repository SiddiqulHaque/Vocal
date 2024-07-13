import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const people = await User.find().limit(10).sort({ createdAt: -1 });
    return new Response(JSON.stringify(people), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch people", { status: 500 });
  }
};

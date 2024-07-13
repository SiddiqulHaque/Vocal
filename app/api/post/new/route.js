import Post from "@lib/models/Post";
import { connectToDB } from "@lib/mongodb/mongoose";

export const POST = async (req) => {
  try {
    await connectToDB();
    const { user, caption, tags, auctionImage }=await req.json();
    console.log(user)
    const newPost = new Post({
      creator: user,
      caption: caption,
      postPhoto: auctionImage,
      tag: tags,
    });
    const postdoc = await newPost.save();
    return new Response(JSON.stringify(postdoc), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new post", { status: 500 });
  }
};

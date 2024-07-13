import Post from "@lib/models/Post";
import { connectToDB } from "@lib/mongodb/mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id)
      .populate("creator likes")
      .exec();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Fail to get post by id", { status: 500 });
  }
};

export const POST = async (req, { params }) => {
  try {
    await connectToDB();

    const { caption, tags, auctionImage } = await req.json();
    const post = await Post.findByIdAndUpdate(
      params.id,
      {
        $set: {
          caption: caption,
          tag: tags,
          postPhoto: auctionImage,
        },
      },
      { new: true, useFindAndModify: false }
    );

    await post.save();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to update the post", { status: 500 });
  }
};

"use client";

import uploadFile from "@lib/actions/UploadFile";
import UploadPostImageDialog from "./UploadPostImage";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

const Posting = ({ user, apiEndpoint }) => {
  const [auctionImage, setAuctionImage] = useState(null);
  const [auctionImagePercentage, setAuctionImagePercentage] = useState(0);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const [caption, setcaption] = useState("");
  const [tags, settags] = useState("");
  const [displayimage, setdisplayimage] = useState(false);
  const router = useRouter();
  const handleUploadAuctionImage = async (file) => {
    if (file) {
      try {
        const auctionImageURL = await uploadFile(
          file,
          "auctionImage",
          setAuctionImagePercentage
        );
        console.log(auctionImageURL);
        setAuctionImage(auctionImageURL);
        setError("");
      } catch (error) {
        console.error("Error uploading auction image:", error);
        setError("Error uploading auction image. Please try again.");
      }
    }
  };
  const getPostDetails = async () => {
    try {
      await axios.get(apiEndpoint).then((res) => {
        setAuctionImage(res.data.postPhoto);
        setdisplayimage(true);
        setcaption(res.data.caption);
        settags(res.data.tag);
      });
    } catch (error) {
      console.log("error in fetching post info");
    }
  };
  const handlePublish = async () => {
    if (file == null) {
      toast.error("Please upload Image");
      return;
    }
    if (caption.length == 0) {
      toast.error("Please give some caption");
      return;
    }
    if (tags.length == 0) {
      toast.error("Please enter some tags");
      return;
    }
    try {
      axios
        .post(apiEndpoint, { user, caption, tags, auctionImage })
        .then((res) => {
          console.log(res.data);
        });
      router.push("/");
    } catch (error) {
      console.error("error in publishing auction", error);
    }
  };
  const handleUpdate = async () => {
    if (file == null) {
      toast.error("Please upload Image");
      return;
    }
    if (caption.length == 0) {
      toast.error("Please give some caption");
      return;
    }
    if (tags.length == 0) {
      toast.error("Please enter some tags");
      return;
    }
    try {
      axios.post(apiEndpoint, { caption, tags, auctionImage }).then((res) => {
        console.log(res.data);
      });
      router.push("/");
    } catch (error) {
      console.error("error in publishing auction", error);
    }
  };
  useEffect(() => {
    if (apiEndpoint != "/api/post/new") {
      getPostDetails();
    }
  }, []);

  return (
    <div className="flex  justify-center min-h-screen">
      <div className="w-full max-w-md flex flex-col gap-4 rounded-lg shadow-md">
        <div>
          {auctionImage && displayimage ? (
            <div className="relative">
              <div
                onClick={() => setdisplayimage(false)}
                className="font-bold text-black cursor-pointer absolute top-2 right-2 "
              >
                X
              </div>
              <Image
                src={auctionImage}
                width={90}
                height={90}
                className="h-full w-full object-fill"
              />
            </div>
          ) : (
            <UploadPostImageDialog
              title="Upload Post Image"
              open={open}
              setOpen={setOpen}
              setFile={(file) => {
                setFile(file);
                setError("");
              }}
              upload={(file) => handleUploadAuctionImage(file)}
              uploadProgress={auctionImagePercentage}
              image={auctionImage}
            />
          )}
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Caption</label>
          <textarea
            className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="What's on your mind?"
            rows="3"
            value={caption}
            onChange={(e) => setcaption(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Tag</label>
          <input
            type="text"
            className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="#tag"
            onChange={(e) => settags(e.target.value)}
            value={tags}
          />
        </div>
        <div className="w-full bg-violet-900  rounded-lg flex justify-center">
          {apiEndpoint != "/api/post/new" ? (
            <button
              className="text-lg py-2 font-semibold w-full"
              onClick={handleUpdate}
            >
              Update
            </button>
          ) : (
            <button
              className="text-lg py-2 font-semibold w-full"
              onClick={handlePublish}
            >
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posting;

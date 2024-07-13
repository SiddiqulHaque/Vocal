import React, { useEffect, useState } from "react";

function UploadPostImageDialog({
  title,
  setOpen,
  setFile,
  upload,
  uploadProgress,
  exist,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [filePreview, setFilePreview] = useState(exist || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setuploaded] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setUploading(true);
      setFile(selectedFile);
      upload(selectedFile);
    }
  };

  useEffect(() => {
    if (uploadProgress === 100) {
      setUploading(false);
      setOpen(false);
      setuploaded(true);
    }
  }, [uploadProgress, setOpen]);

  return (
    <div className="mx-auto max-w-lg rounded p-4 shadow">
      <h2 className="mb-4 text-lg font-bold">{title}</h2>
      <div className="flex flex-col items-center justify-center space-y-4">
        <div
          className={`flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-400 p-4 ${
            isDragging ? "border-black bg-gray-300" : "bg-gray-200"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label
            htmlFor="file"
            className="flex h-full w-full cursor-pointer items-center justify-center overflow-hidden p-4"
          >
            <input
              type="file"
              id="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="flex h-full w-full items-center justify-center text-gray-500">
              {filePreview ? (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                "Select or Drop Image"
              )}
            </div>
          </label>
        </div>
        {filePreview && (
          <div className="mt-2 text-center text-gray-600">
            {filePreview.startsWith("blob:")
              ? "Image preview"
              : "File name: " + filePreview}
          </div>
        )}
        <button
          onClick={handleUpload}
          className={`w-full py-2 rounded-md ${
            uploading || uploaded
              ? "bg-violet-700 cursor-not-allowed"
              : "bg-violet-900"
          }`}
          disabled={uploading || uploaded}
        >
          {uploading
            ? `Uploading... ${uploadProgress}%`
            : uploaded
            ? "Uploaded"
            : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default UploadPostImageDialog;

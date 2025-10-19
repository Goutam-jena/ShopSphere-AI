


export const uploadToCloudinary = async (pics: any) => {
  const cloud_name = "dyecbtgbu"; // ✅ Your Cloudinary cloud name
  const upload_preset = "shopsphere2"; // ✅ Your Cloudinary upload preset

  if (!pics) {
    console.log("No picture selected for upload.");
    return null;
  }

  const data = new FormData();
  data.append("file", pics);
  data.append("upload_preset", upload_preset);
  data.append("cloud_name", cloud_name);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "post",
      body: data,
    });

    const fileData = await res.json();
    console.log("Cloudinary Upload Response:", fileData);

    // ✅ Return full object (contains url + secure_url + public_id etc.)
    return fileData;

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};


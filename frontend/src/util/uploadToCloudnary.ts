export const uploadToCloudinary = async (pics: any) => {
  const cloud_name = "dyecbtgbu"; 
  const upload_preset = "shopsphere2"; 

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

  
    return fileData;

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};
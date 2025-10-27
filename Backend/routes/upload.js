

// import express from "express";
// import multer from "multer";
// import cloudinary from "../utils/cloudinary.js";
// import fs from "fs";

// const router = express.Router();

// // Ensure temporary folder exists
// const tmpDir = "tmp/uploads";
// if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

// // Multer setup
// const upload = multer({ dest: tmpDir });

// // POST /api/upload
// router.post("/", upload.single("file"), async (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//   try {
//     // Upload file to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: "movies",
//       resource_type: "auto", // automatically detect image/video
//     });

//     // Remove temporary file
//     fs.unlink(req.file.path, (err) => {
//       if (err) console.error("Failed to delete temp file:", err);
//     });

//     // Determine type based on mimetype
//     const fileType = req.file.mimetype.includes("video") ? "video" : "image";

//     // Optional: force mp4 URL for videos
//     let secureUrl = result.secure_url;
//     if (fileType === "video") {
//       secureUrl = cloudinary.url(result.public_id, {
//         resource_type: "video",
//         format: "mp4",
//       });
//     }

//     // Send response
//     res.status(200).json({
//       url: secureUrl,
//       type: fileType,
//       originalName: req.file.originalname,
//     });
//   } catch (err) {
//     console.error("Cloudinary upload error:", err);
//     try { fs.unlinkSync(req.file.path); } catch (e) {}
//     res.status(500).json({ error: "Upload failed", details: err.message || err });
//   }
// });

// export default router;


import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

const router = express.Router();

// Ensure tmp folder exists
const tmpDir = "tmp/uploads";
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

const upload = multer({ dest: tmpDir });

router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    let result;

    // ✅ If file > 100MB, use chunked upload
    const stats = fs.statSync(req.file.path);
    if (stats.size > 100 * 1024 * 1024) {
      result = await cloudinary.uploader.upload_large(req.file.path, {
        folder: "movies",
        resource_type: "video",
        chunk_size: 20 * 1024 * 1024, // 20MB chunks
      });
    } else {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "movies",
        resource_type: "auto",
      });
    }

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete tmp file:", err);
    });

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    try { fs.unlinkSync(req.file.path); } catch (e) {}
    res.status(500).json({ error: "Upload failed", details: err.message || err });
  }
});

export default router;

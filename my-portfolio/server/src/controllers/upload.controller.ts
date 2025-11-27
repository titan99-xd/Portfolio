import { Request, Response } from "express";

export const uploadImage = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const fileUrl = `/uploads/${req.file.filename}`;

  return res.json({
    success: true,
    url: fileUrl,
  });
};

import fs from "fs";

import { Request, Response } from "express";

export const getApiDocs = (req: Request, res: Response) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    try {
      const apiDocs = JSON.parse(data);
      res.status(200).json(apiDocs);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

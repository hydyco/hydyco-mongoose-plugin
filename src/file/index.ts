// express router to handle file uploads

import { HydycoFile } from "@hydyco/core";
import { Router, Request, Response } from "express";
import * as path from "path";
import * as multer from "multer";

import HydycoModel from "../parser";
import * as data from "./file.json";

const file = new HydycoFile();

file.writeMappingFile("file", data); // create file json for admin to view it

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

/**
 * Express router to handle file upload
 * @param {string} uploadDir - Directory for uploading files from root folder
 * @return {Router} router - Express router
 */
const fileUpload = (uploadDir: string = "uploads") => {
  var router = Router();
  const File = new HydycoModel("file").mongooseModel();

  router.get("/file/get/:fileName", (req, res) => {
    const { fileName } = req.params;
    return res.sendFile(path.join(file.rootPath, uploadDir, fileName));
  });

  router.post(
    "/file/:field",
    (req, res, next) => {
      const { field } = req.params;
      upload.single(field)(req, res, next);
    },
    async function (req: any, res, next) {
      const { field } = req.params;
      req.file.fieldname = field;
      const file = await File.create(req.file);
      return res.send(file._id);
    }
  );

  return router;
};

export default fileUpload;

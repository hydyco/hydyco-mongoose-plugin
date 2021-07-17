/**
 * Express router to handle file upload
 * @param {string} uploadDir - Directory for uploading files from root folder
 * @return {Router} router - Express router
 */
declare const fileUpload: (uploadDir?: string) => import("express-serve-static-core").Router;
export default fileUpload;

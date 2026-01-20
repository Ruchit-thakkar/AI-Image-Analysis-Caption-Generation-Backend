const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
async function uploadImage(file, fileName) {
  const uploadResponse = await imagekit.upload({
    file: file,
    fileName: fileName,
    folder: "test_Image",
  });
  return uploadResponse;
}

module.exports = { uploadImage };
// uploadImage

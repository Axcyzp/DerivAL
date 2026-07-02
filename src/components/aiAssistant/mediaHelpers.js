export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
};

export const createMediaPayload = async (fileObj) => ({
  mimeType: fileObj.rawFile.type || "image/jpeg",
  base64: await fileToBase64(fileObj.rawFile),
});

export const createAttachmentPreviews = (files, isImage) =>
  files.map((file) => ({
    name: file.name,
    isImage,
    url: isImage ? URL.createObjectURL(file) : "",
    rawFile: file,
  }));

export const revokeAttachmentPreview = (attachment) => {
  if (attachment?.isImage && attachment.url) {
    URL.revokeObjectURL(attachment.url);
  }
};

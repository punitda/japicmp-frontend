import type { UploadHandler } from "@remix-run/node";

export const cloudStorageUploaderHandler: UploadHandler = async ({
  filename,
  data: fileStream,
}) => {
  return await uploadToR2Storage(fileStream, filename);
};

const uploadToR2Storage = async (
  fileStream: AsyncIterable<Uint8Array>,
  filename?: string
) => {
  if (!filename) return;

  // Get presigned url for file upload
  const preSignedApiURl = `${process.env.SERVER_BASE_URL}/presigned`;
  const requestBody = {
    fileName: filename,
    fileType: "application/java-archive",
  };

  const response = await fetch(preSignedApiURl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (response.status != 201) throw Error("Error generating presiged url");
  const { preSignedUrl, objectKey } = await response.json();

  // Generate file in memory using fileStream.
  // TODO: Figure out better way to do it
  const fileData = [];
  for await (const x of fileStream) {
    fileData.push(x);
  }

  // Upload files to presigned url
  const file = new File(fileData, filename, {
    type: "application/java-archive",
  });
  const uploadResponse = await fetch(preSignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/java-archive",
    },
    body: file,
  });

  if (uploadResponse.status == 200) return objectKey;
  throw Error("Unable to upload");
};

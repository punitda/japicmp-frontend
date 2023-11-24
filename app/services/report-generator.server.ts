import {
  json,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { cloudStorageUploaderHandler } from "./uploader.server";

export async function generateReportUsingFile(request: Request) {
  try {
    const uploadHandler = unstable_composeUploadHandlers(
      cloudStorageUploaderHandler,
      unstable_createMemoryUploadHandler()
    );

    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );

    const generateReportRequestBody = {
      oldFileKeyName: formData.get("old-artifact"),
      oldVersion: formData.get("old-library-version"),
      newFileKeyName: formData.get("new-artifact"),
      newVersion: formData.get("new-library-version"),
    };

    const generateReportResponse = await fetch(
      `${process.env.SERVER_BASE_URL}/report/file`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(generateReportRequestBody),
      }
    );

    if (generateReportResponse.status != 201) {
      return json({
        error: await generateReportResponse.text(),
        status: generateReportResponse.status,
      });
    }

    return json({
      reportOutput: await generateReportResponse.text(),
      status: generateReportResponse.status,
    });
  } catch (error) {
    return json({
      error: "Uh-Oh! Looks like we messed up. Please try again!",
      status: 500,
    });
  }
}

export async function generateReportUsingMaven(request: Request) {
  const formData = await request.formData();
  const oldPackageName = String(formData.get("old-library"));
  const newPackageName = String(formData.get("new-library"));

  if (oldPackageName.length == 0 || newPackageName.length == 0) {
    return json({
      error: "Please provide valid package names to generate report",
      status: 400,
    });
  }

  const url = `${process.env.SERVER_BASE_URL}/report/maven`;
  const requestBody = {
    oldPackageName,
    newPackageName,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status != 201) {
      return json({
        error: await response.text(),
        status: response.status,
      });
    }

    return json({
      reportOutput: await response.text(),
      status: response.status,
    });
  } catch (error) {
    return json({ error, status: 500 });
  }
}

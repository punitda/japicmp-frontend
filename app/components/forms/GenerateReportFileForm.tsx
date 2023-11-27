import { Button } from "../Button";
import { useState } from "react";
import { ReportConfigurationFieldSet } from "./ReportConfigurationFieldSet";
import type { GenerarteReportProps } from "~/types";
import { GenerateReportButton } from "../GenerateReportButton";

export function GenerateReportFileForm({
  fetcher,
  data,
  isSubmitting,
}: GenerarteReportProps) {
  const [fileSizeError, setFileSizeError] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target?.files?.[0];
    // Don't allow file size above 5 Mb. We might change it later, if required.
    if (file && file.size > 5 * 1024 * 1024) {
      setFileSizeError(true);
    } else {
      setFileSizeError(false);
    }
  }

  return (
    <fetcher.Form
      method="post"
      className="px-4 py-5 sm:p-6"
      encType="multipart/form-data"
    >
      <input type="hidden" name="reportType" value="File" />

      <label
        htmlFor="new-library"
        className="block text-md font-medium leading-6 text-gray-900"
      >
        New Library File
      </label>
      <div className="mt-2">
        <input
          type="file"
          name="new-artifact"
          accept=".aar, .jar"
          onChange={(e) => {
            e.preventDefault();
          }}
        />
        <p className="text-xs leading-5 text-gray-400 mt-1">
          Only .aar and .jar files can be uploaded
        </p>
      </div>

      <label
        htmlFor="old-library-file"
        className="block text-md font-medium leading-6 text-gray-900 mt-3"
      >
        Old Library File
      </label>
      <div className="mt-2">
        <input
          type="file"
          name="old-artifact"
          accept=".aar, .jar"
          onChange={onChange}
        />
        <p className="text-xs leading-5 text-gray-400 mt-1">
          Only .aar and .jar files can be uploaded
        </p>
      </div>

      <ReportConfigurationFieldSet />

      <div className="pt-8 pb-2 flex items-center gap-4">
        <div>
          <GenerateReportButton isSubmitting={isSubmitting} />
          {data?.error && !isSubmitting ? (
            <p className="text-red-400 mt-2">{data.error}</p>
          ) : null}
          {fileSizeError && !isSubmitting ? (
            <p className="text-red-400 mt-2">
              The file size cannot exceed 5 Mb
            </p>
          ) : null}
        </div>
        {data?.reportOutput?.preSignedUrl && !isSubmitting ? (
          <a
            href={data.reportOutput?.preSignedUrl}
            className="font-semibold text-sky-600 inline-block cursor-pointer"
          >
            View Report
          </a>
        ) : null}
      </div>
    </fetcher.Form>
  );
}

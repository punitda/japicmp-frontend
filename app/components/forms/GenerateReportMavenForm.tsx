import type { MouseEventHandler } from "react";
import type { GenerarteReportProps } from "~/types";

import { Button } from "../Button";
import { ReportConfigurationFieldSet } from "./ReportConfigurationFieldSet";
import clsx from "clsx";
import { GenerateReportButton } from "../GenerateReportButton";

interface Props extends GenerarteReportProps {
  onTabChange: MouseEventHandler<HTMLDivElement>;
}

export function GenerateReportMavenForm({
  fetcher,
  data,
  isSubmitting,
  onTabChange,
}: Props) {
  return (
    <fetcher.Form method="post" className="px-4 py-5 sm:p-6">
      <input type="hidden" name="reportType" value="Maven" />
      <label
        htmlFor="new-library"
        className="block text-md font-medium leading-6 text-gray-900"
      >
        New Version
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="new-library"
          id="new-library"
          className="block w-3/4 sm:w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="<groupId>:<artifactId>:<version>"
          aria-describedby="package name"
        />
      </div>
      <p className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mt-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        Ex: com.squareup.okhttp3:okhttp:4.12.0
      </p>

      <label
        htmlFor="old-library"
        className="block text-md font-medium leading-6 text-gray-900 mt-3"
      >
        Old Version
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="old-library"
          id="old-library"
          className="block w-3/4 sm:w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="<groupId>:<artifactId>:<version>"
          aria-describedby="package name"
        />
      </div>
      <p className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mt-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        Ex: com.squareup.okhttp3:okhttp:4.11.0
      </p>

      <ReportConfigurationFieldSet />

      <div className="pt-8 pb-2 flex items-center gap-4">
        <div>
          <GenerateReportButton isSubmitting={isSubmitting} />
          {data?.error && !isSubmitting ? (
            <p className="text-red-400 mt-2">{data.error}</p>
          ) : null}
        </div>
        {data?.reportOutput?.preSignedUrl && !isSubmitting ? (
          <a
            href={data.reportOutput?.preSignedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sky-600 inline-block cursor-pointer"
          >
            View Report
          </a>
        ) : null}
      </div>

      <div className="text-sm leading-6 text-gray-600">
        Library not hosted on Maven? You can generate report by{" "}
        <div
          onClick={onTabChange}
          className={clsx(
            "font-semibold text-sky-600 inline-block cursor-pointer",
            isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          )}
        >
          uploading files
        </div>
      </div>
    </fetcher.Form>
  );
}

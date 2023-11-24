import type { FetcherWithComponents } from "@remix-run/react";
import type { ReportFormData } from "~/types/ReportFormData";
import { Button } from "../Button";

interface Props {
  fetcher: FetcherWithComponents<unknown>;
  data: ReportFormData;
  isSubmitting: boolean;
}

export function GenerateReportMavenForm({
  fetcher,
  data,
  isSubmitting,
}: Props) {
  return (
    <fetcher.Form method="post" className="px-4 py-5 sm:p-6">
      <input type="hidden" name="reportType" value="Maven" />
      <label
        htmlFor="old-library"
        className="block text-md font-medium leading-6 text-gray-900"
      >
        Old Library
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="old-library"
          id="old-library"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="<groupId>:<artifactId>:<version>"
          aria-describedby="package name"
        />
      </div>
      <p className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mt-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        Ex: com.squareup.okhttp3:okhttp:4.11.0
      </p>
      <label
        htmlFor="new-library"
        className="block text-md font-medium leading-6 text-gray-900 mt-3"
      >
        New Library
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="new-library"
          id="new-library"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="<groupId>:<artifactId>:<version>"
          aria-describedby="package name"
        />
      </div>
      <p className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mt-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        Ex: com.squareup.okhttp3:okhttp:4.12.0
      </p>{" "}
      <div className="py-4">
        <Button type="submit">
          {isSubmitting ? "Generating Report" : "Generate Report"}
        </Button>
        {data?.error ? <p className="text-red-400 mt-2">{data.error}</p> : null}
      </div>
    </fetcher.Form>
  );
}
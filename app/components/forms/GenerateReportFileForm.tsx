import type { FetcherWithComponents } from "@remix-run/react";
import type { ReportFormData } from "~/types/ReportFormData";
import { Button } from "../Button";

interface Props {
  fetcher: FetcherWithComponents<unknown>;
  data: ReportFormData;
  isSubmitting: boolean;
}

export function GenerateReportFileForm({ fetcher, data, isSubmitting }: Props) {
  return (
    <fetcher.Form
      method="post"
      className="px-4 py-5 sm:p-6"
      encType="multipart/form-data"
    >
      <input type="hidden" name="reportType" value="File" />
      <label
        htmlFor="old-library-file"
        className="block text-md font-medium leading-6 text-gray-900"
      >
        Old Library File
      </label>
      <div className="mt-2">
        <input
          type="file"
          name="old-artifact"
          accept=".aar, .jar"
          onChange={(e) => {
            e.preventDefault();
          }}
        />
        <p className="text-xs leading-5 text-gray-400 mt-1">
          Only .aar and .jar files are allowed
        </p>
      </div>
      <label
        htmlFor="old-library-version"
        className="block text-md font-medium leading-6 text-gray-900 mt-3"
      >
        Old Library Version
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="old-library-version"
          id="old-library-version"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="<version>"
          aria-describedby="version"
        />
      </div>
      <p className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mt-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        Ex: 1.2.0
      </p>
      <label
        htmlFor="new-library"
        className="block text-md font-medium leading-6 text-gray-900 mt-3"
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
          Only .aar and .jar files are allowed
        </p>
      </div>
      <label
        htmlFor="new-library-version"
        className="block text-md font-medium leading-6 text-gray-900"
      >
        New Library Version
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="new-library-version"
          id="new-library-version"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="<version>"
          aria-describedby="version"
        />
      </div>
      <p className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mt-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        Ex: 1.2.2
      </p>
      <div className="py-4">
        <Button type="submit">
          {isSubmitting ? "Generating Report" : "Generate Report"}
        </Button>
        {data?.error ? <p className="text-red-400 mt-2">{data.error}</p> : null}
      </div>
    </fetcher.Form>
  );
}
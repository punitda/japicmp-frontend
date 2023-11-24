import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";

import clsx from "clsx";
import { useEffect, useState } from "react";

import { Button } from "~/components/Button";
import { Header } from "~/components/Header";
import { Hero } from "~/components/Hero";

import {
  generateReportUsingFile,
  generateReportUsingMaven,
} from "~/services/report-generator.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Japicmp Report Generator" },
    {
      name: "description",
      content:
        "Generate source and binary compatibility reports for java/android libraries",
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const contentType = request.headers.get("Content-Type");
  if (contentType?.includes("application/x-www-form-urlencoded")) {
    return generateReportUsingMaven(request);
  } else if (contentType?.includes("multipart/form-data")) {
    return generateReportUsingFile(request);
  }
  return json({ error: "Unknown request", status: 400 });
}

interface FormData {
  reportOutput?: string;
  error?: string;
}

interface Tab {
  name: "Maven" | "File";
  current: boolean;
}

export default function Index() {
  const fetcher = useFetcher();
  const data = fetcher.data as FormData;
  const isSubmitting = fetcher.state === "submitting";
  const navigate = useNavigate();

  const [tabs, setTabs] = useState<Tab[]>([
    {
      name: "Maven",
      current: true,
    },
    {
      name: "File",
      current: false,
    },
  ]);

  useEffect(() => {
    if (fetcher.state == "idle" && data?.reportOutput) {
      navigate("/#report-output");
    }
  }, [fetcher.state, data?.reportOutput, navigate]);

  const currentTab = tabs.find((tab) => tab.current);

  return (
    <div className="flex w-full flex-col bg-white">
      <Header />
      <main className="isolate">
        <Hero />
        <section
          id="generate"
          className="divide-yoverflow-hidden rounded-lg bg-white shadow-lg lg:w-1/2 w-4/5 mx-auto mt-6 mb-20"
        >
          <div className="px-4 py-5 sm:px-6">
            <p className="text-gray-900 text-2xl font-semibold">
              Generate Report
            </p>
          </div>
          <div>
            <div className="sm:hidden px-4 sm:px-6">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                defaultValue={currentTab?.name}
                onChange={(e) => {
                  setTabs(
                    tabs.map((_tab) => ({
                      ..._tab,
                      current: _tab.name == e.target.value ? true : false,
                    }))
                  );
                }}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block px-4 sm:px-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <div
                      key={tab.name}
                      onClick={(e) => {
                        e.preventDefault();
                        setTabs(
                          tabs.map((_tab) => ({
                            ..._tab,
                            current: _tab.name == tab.name ? true : false,
                          }))
                        );
                      }}
                      className={clsx(
                        tab.current
                          ? "border-sky-500 text-sky-600"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium"
                      )}
                      aria-current={tab.current ? "page" : undefined}
                    >
                      {tab.name}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {currentTab?.name == "Maven" ? (
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
                {data?.error ? (
                  <p className="text-red-400 mt-2">{data.error}</p>
                ) : null}
              </div>
            </fetcher.Form>
          ) : null}

          {currentTab?.name == "File" ? (
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
                {data?.error ? (
                  <p className="text-red-400 mt-2">{data.error}</p>
                ) : null}
              </div>
            </fetcher.Form>
          ) : null}
        </section>

        {data?.reportOutput ? (
          <section
            id="report-output"
            className="mx-auto w-11/12 py-12 divide-y divide-gray-200 overflow-auto rounded-lg bg-white shadow-lg"
          >
            <div className="px-4 py-5 sm:px-6">
              <p className="text-gray-900 text-2xl font-semibold">Report</p>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: data?.reportOutput }}
              className="px-4 py-5 sm:p-6"
            />
          </section>
        ) : null}
      </main>
    </div>
  );
}

import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useFetcher } from "@remix-run/react";

import { Button } from "~/components/Button";
import { Header } from "~/components/Header";
import { Hero } from "~/components/Hero";

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
  const formData = await request.formData();
  const oldPackageName = formData.get("old-library");
  const newPackageName = formData.get("new-library");
  const url = "http://localhost:8080/report/maven";
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

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("error", error);
    return json({ error, status: 200 });
  }
}

export default function Index() {
  const fetcher = useFetcher();
  const { data: reportOutput } = fetcher;
  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className="flex w-full flex-col bg-white">
      <Header />
      <main className="isolate">
        <Hero />
        <section
          id="generate"
          className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg lg:w-1/2 w-4/5 mx-auto mt-6 mb-20"
        >
          <div className="px-4 py-5 sm:px-6">
            <p className="text-gray-900 text-2xl font-semibold">
              Generate Report
            </p>
          </div>
          <fetcher.Form method="post" className="px-4 py-5 sm:p-6">
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
            </div>
          </fetcher.Form>
        </section>

        {reportOutput ? (
          <section
            id="report-output"
            className="mx-auto w-11/12 py-12 divide-y divide-gray-200 overflow-auto rounded-lg bg-white shadow-lg"
          >
            <div className="px-4 py-5 sm:px-6">
              <p className="text-gray-900 text-2xl font-semibold">Report</p>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: reportOutput }}
              className="px-4 py-5 sm:p-6"
            />
          </section>
        ) : null}
      </main>
    </div>
  );
}

import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useFetcher } from "@remix-run/react";

import { Background } from "~/components/Background";
import { Button } from "~/components/Button";

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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <Background />
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <p className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
          Generate source and binary compatibility report
        </p>
        <p className="mt-3 text-2xl tracking-tight text-slate-400">
          Check compatibility, so you can update your libraries without worrying
          about breaking the app
        </p>
        <fetcher.Form method="post" className="mt-12">
          <label
            htmlFor="old-library"
            className="block text-md font-medium leading-6 text-gray-100"
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
          <p className="inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 mt-1.5 text-xs font-medium text-pink-400 ring-1 ring-inset ring-pink-400/20">
            Ex: com.squareup.okhttp3:okhttp:4.11.0
          </p>
          <label
            htmlFor="new-library"
            className="block text-md font-medium leading-6 text-gray-100 mt-3"
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
          <p className="inline-flex items-center rounded-md bg-pink-400/10 px-2 py-1 mt-1.5 text-xs font-medium text-pink-400 ring-1 ring-inset ring-pink-400/20">
            Ex: com.squareup.okhttp3:okhttp:4.12.0
          </p>{" "}
          <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
            <Button type="submit">
              {isSubmitting ? "Generating Report" : "Generate Report"}
            </Button>
          </div>
        </fetcher.Form>
      </div>

      {reportOutput ? (
        <div dangerouslySetInnerHTML={{ __html: reportOutput }} />
      ) : null}
    </div>
  );
}

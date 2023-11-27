import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Scripts,
  useFetcher,
  useRouteError,
} from "@remix-run/react";
import {
  generateReportUsingFile,
  generateReportUsingMaven,
} from "~/services/report-generator.server";

import { Header } from "~/components/Header";
import { Hero } from "~/components/Hero";

import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import type { ReportFormData } from "~/types";
import { Faqs } from "~/components/Faqs";
import { GenerateReport } from "~/components/GenerateReport";
import { Footer } from "~/components/Footer";

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

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh Snap!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-sky-600">Aw, Snap!</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Application Error
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we've messed up. Please try again
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Go back home
              </a>
            </div>
          </div>
        </main>
        <Scripts />
      </body>
    </html>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const contentType = request.headers.get("Content-Type");
  if (contentType?.includes("application/x-www-form-urlencoded")) {
    return generateReportUsingMaven(request);
  } else if (contentType?.includes("multipart/form-data")) {
    return generateReportUsingFile(request);
  }
  return json({ error: "Unknown request", status: 400 });
}

export default function Index() {
  const fetcher = useFetcher();
  const data = fetcher.data as ReportFormData;
  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className="flex w-full flex-col bg-white">
      <Header />
      <main className="isolate">
        <Hero />
        <GenerateReport
          data={data}
          isSubmitting={isSubmitting}
          fetcher={fetcher}
        />
        <Faqs />
        <Footer />
      </main>
    </div>
  );
}

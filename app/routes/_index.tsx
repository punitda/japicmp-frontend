import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
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

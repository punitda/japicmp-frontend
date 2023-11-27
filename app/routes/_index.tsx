import clsx from "clsx";
import { useState } from "react";

import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import {
  generateReportUsingFile,
  generateReportUsingMaven,
} from "~/services/report-generator.server";

import { GenerateReportMavenForm } from "~/components/forms/GenerateReportMavenForm";
import { GenerateReportFileForm } from "~/components/forms/GenerateReportFileForm";
import { Header } from "~/components/Header";
import { Hero } from "~/components/Hero";

import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import type { ReportFormData } from "~/types";
import { Faqs } from "~/components/Faqs";

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

interface Tab {
  name: "Maven" | "File";
  current: boolean;
}

export default function Index() {
  const fetcher = useFetcher();
  const data = fetcher.data as ReportFormData;
  const isSubmitting = fetcher.state === "submitting";

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

  const currentTab = tabs.find((tab) => tab.current);

  function onSwitchToFileTab(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    if (isSubmitting) return;
    setTabs(
      tabs.map((_tab) => ({
        ..._tab,
        current: _tab.name == "File" ? true : false,
      }))
    );
  }

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
                disabled={isSubmitting}
                onChange={(e) => {
                  e.preventDefault();
                  setTabs(
                    tabs.map((_tab) => ({
                      ..._tab,
                      current: _tab.name == e.target.value ? true : false,
                    }))
                  );
                }}
                value={currentTab?.name}
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
                        if (isSubmitting) return;
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
                        isSubmitting ? "opacity-50 cursor-not-allowed" : "",
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
            <GenerateReportMavenForm
              fetcher={fetcher}
              isSubmitting={isSubmitting}
              data={data}
              onTabChange={onSwitchToFileTab}
            />
          ) : null}

          {currentTab?.name == "File" ? (
            <GenerateReportFileForm
              fetcher={fetcher}
              isSubmitting={isSubmitting}
              data={data}
            />
          ) : null}
        </section>
        <Faqs />
      </main>
    </div>
  );
}

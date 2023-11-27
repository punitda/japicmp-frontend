import clsx from "clsx";
import { useState } from "react";
import { GenerateReportMavenForm } from "./forms/GenerateReportMavenForm";
import { GenerateReportFileForm } from "./forms/GenerateReportFileForm";
import type { GenerarteReportProps, Tab } from "~/types";

export function GenerateReport({
  fetcher,
  data,
  isSubmitting,
}: GenerarteReportProps) {
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
    <section
      id="generate"
      className="divide-yoverflow-hidden rounded-lg bg-white shadow-lg lg:w-1/2 w-4/5 mx-auto mt-6 mb-20"
    >
      <div className="px-4 py-5 sm:px-6">
        <p className="text-gray-900 text-2xl font-semibold">Generate Report</p>
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
  );
}

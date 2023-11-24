interface Props {
  reportOutput: string;
}
export function ReportOutput({ reportOutput }: Props) {
  return (
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
  );
}

export function ReportConfigurationFieldSet() {
  return (
    <fieldset className="mt-12">
      <legend className="sr-only">Report Configuration</legend>
      <div className="space-y-2">
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="only-modified"
              aria-describedby="only-modified-description"
              name="output-only-modified"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label
              htmlFor="only-modified"
              className="font-medium text-gray-900"
            >
              Only Modified
            </label>
            <p id="only-modified-description" className="text-gray-500">
              Outputs only modified classes/methods.
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="only-binary-incompatible"
              aria-describedby="only-binary-incompatible-description"
              name="output-only-binary-incompatible"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label
              htmlFor="only-binary-incompatible"
              className="font-medium text-gray-900"
            >
              Only Binary Incompatible
            </label>
            <p
              id="only-binary-incompatible-description"
              className="text-gray-500"
            >
              Outputs only classes/methods that are binary incompatible. If not
              given, all classes and methods are printed.
            </p>
          </div>
        </div>
      </div>
    </fieldset>
  );
}

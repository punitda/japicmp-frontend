import type { FetcherWithComponents } from "@remix-run/react";

export interface ReportFormData {
  reportOutput?: ReportOutput;
  error?: string;
}

export interface ReportOutput {
  preSignedUrl: string;
}

export interface GenerateReportRequestBodyFile {
  oldFileKeyName: string;
  newFileKeyName: string;
  outputOnlyModifications: boolean;
  outputOnlyBinaryIncompatibleModifications: boolean;
}

export interface GenerateReportRequestBodyMaven {
  oldPackageName: string;
  newPackageName: string;
  outputOnlyModifications: boolean;
  outputOnlyBinaryIncompatibleModifications: boolean;
}

export interface Faq {
  question: string;
  answer: () => JSX.Element;
}

export interface Tab {
  name: "Maven" | "File";
  current: boolean;
}

export interface GenerarteReportProps {
  fetcher: FetcherWithComponents<unknown>;
  data: ReportFormData;
  isSubmitting: boolean;
}

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

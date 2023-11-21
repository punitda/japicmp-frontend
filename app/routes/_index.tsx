import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Japicmp Report Generator" },
    { name: "description", content: "Generate source and binary compatibility reports for java/android libraries" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Generate Source and Binary compatibility reports</h1>
    </div>
  );
}

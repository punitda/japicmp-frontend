const linkStyle = "underline-offset-2 underline text-sky-600";
export function AnswerOne() {
  return (
    <p>
      Good question! Instead of explaining it here in few words let me redirect
      you to couple of excellent blog posts written on this subject.{" "}
      <a
        href="https://proandroiddev.com/source-binary-and-backward-compatibility-rule-them-all-61d3d358582e"
        className={linkStyle}
      >
        Post #1
      </a>{" "}
      and{" "}
      <a
        href="https://zsmb.co/maintaining-compatibility-in-kotlin-libraries/"
        className={linkStyle}
      >
        Post #2
      </a>
    </p>
  );
}

export function AnswerTwo() {
  return (
    <p>
      Behind the scenes it uses{" "}
      <a href="https://siom79.github.io/japicmp/" className={linkStyle}>
        japicmp
      </a>{" "}
      to generate the compatiblity report. If you want, you can use japicmp{" "}
      <a
        href="https://siom79.github.io/japicmp/CliTool.html"
        className={linkStyle}
      >
        cli
      </a>{" "}
      to generate it. However, the purpose of this small app is to avoid hassle
      of doing all the grunt work to generate the report. So, you can focus on
      the main task which is checking source and binary compatibility between
      two library versions
    </p>
  );
}

export function AnswerThree() {
  return (
    <p>
      If you use third-party java or android dependencies in your source code,
      you can use this tool to check source and binary compatibility between the
      two library versions before upgrading. <br />
      If you're library author, you can integrate tools like{" "}
      <a
        href="https://github.com/tylerbwong/metalava-gradle"
        className={linkStyle}
      >
        Metalava
      </a>{" "}
      or{" "}
      <a
        href="https://github.com/melix/japicmp-gradle-plugin"
        className={linkStyle}
      >
        Japicmp
      </a>{" "}
      Gradle plugin in your CI workflow to make sure you don't introduce
      unintended incompatiblities in your library
    </p>
  );
}

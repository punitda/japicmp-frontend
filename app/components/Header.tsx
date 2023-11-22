import { Link } from "@remix-run/react";
import { Logo } from "./Logo";
import { GitHubIcon } from "./icons/GithubIcon";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8">
      <div className="relative flex flex-grow basis-0 items-center">
        <Link
          to="/"
          aria-label="Home page"
          className="inline-flex items-center"
        >
          <Logo className="h-9 w-auto stroke-sky-300 fill-sky-300" />
          <h2 className="ml-2 text-2xl text-slate-700  hidden lg:block">
            JCMPREPORT
          </h2>
        </Link>
        <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
          <Link to="https://github.com" className="group" aria-label="GitHub">
            <GitHubIcon className="h-6 w-6 fill-slate-400 group-hover:fill-slate-500" />
          </Link>
        </div>
      </div>
    </header>
  );
}

import { Link } from "@remix-run/react";
import { Logo } from "./icons/Logo";
import { GitHubIcon } from "./icons/GithubIcon";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Home</span>
            <Logo />
          </Link>
        </div>

        <div className="flex flex-1 justify-end group">
          <a
            href="https://github.com/punitda/japicmp-frontend"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            <GitHubIcon className="h-6 w-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
          </a>
        </div>
      </nav>
    </header>
  );
}

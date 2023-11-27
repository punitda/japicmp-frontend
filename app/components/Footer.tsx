export function Footer() {
  return (
    <div className="mt-8 border-t pt-8 border-gray-900/10 flex justify-center">
      <p className="my-8 text-base leading-5 text-gray-500 md:order-1 md:mt-0 ">
        &copy; {new Date().getFullYear()}{" "}
        <a href="https://punitd.dev" className="underline underline-offset-4">
          Punit Dama
        </a>
        . All rights reserved.
      </p>
    </div>
  );
}

import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { MoveUpRightIcon, TerminalSquareIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex sm:min-h-[92vh] min-h-[85vh] flex-col items-center justify-center text-center px-2 py-8">
      <Link
        href="https://github.com/Storik4pro/GoodbyeDPI-UI"
        target="_blank"
        className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4 sm:-mt-12"
      >
        Следите за проектом на GitHub{" "}
        <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
      </Link>
      <h1 className="text-5xl font-bold mb-4 sm:text-6xl">
        GoodbyeDPI UI
      </h1>
      <p className="mb-8 sm:text-xl max-w-[750px] text-muted-foreground">
        Удобный графический интерфейс для управления GoodbyeDPI, Zapret, ByeDPI и SpoofDPI. <wbr/>
        С его помощью вы можете легко изменять настройки DPI и запускать приложение в трее.
      </p>
      <div className="flex flex-row items-center gap-5">
        <Link
          href={`/docs${page_routes[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          Подробнее
        </Link>
        <Link
          href="/blog"
          className={buttonVariants({
            variant: "secondary",
            className: "px-6",
            size: "lg",
          })}
        >
          Блог
        </Link>
      </div>
      <span className="flex flex-row items-start sm:gap-2 gap-0.5 text-muted-foreground text-md mt-7 -mb-12 max-[800px]:mb-12 font-code text-base font-medium">
        <TerminalSquareIcon className="w-5 h-5 mr-1 mt-0.5" />
        {"git clone https://github.com/Storik4pro/GoodbyeDPI-UI.git"}
      </span>
    </div>
  );
}

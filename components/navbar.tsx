import Anchor from "@/components/anchor";
import ExternalArrow from "@/components/atoms/external-arrow";
import { SheetLeftbar } from "@/components/leftbar";
import Search from "@/components/search";
import { ModeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { page_routes } from "@/lib/routes-config";
import { GeistMono } from "geist/font/mono";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export interface NavLink {
  title: string;
  href: string;
  external?: boolean;
}

const ROUTES = {
  documentation: `/docs${page_routes[0].href}`,
  blog: "/blog",
  changelog: "/changelog",
  support: "https://github.com/Storik4pro/goodbyeDPI-UI/issues/",
} as const;

export function getNavLinks(): NavLink[] {
  const links: Omit<NavLink, "external">[] = [
    {
      title: "Документация",
      href: ROUTES.documentation,
    },
    {
      title: "Блог",
      href: ROUTES.blog,
    },
    {
      title: "Журнал изменений",
      href: ROUTES.changelog,
    },
    {
      title: "Поддержка",
      href: ROUTES.support,
    },
  ];

  return links.map((link) => ({
    ...link,
    external: link.href.startsWith("http"),
  }));
}

export const NAVLINKS = getNavLinks();

export function Navbar() {
  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 backdrop-filter backdrop-blur-xl bg-opacity-5">
      <div className="sm:container mx-auto w-[95vw] h-full flex items-center justify-between md:gap-2">
        <div className="flex items-center gap-5 pr-[22px]">
          <SheetLeftbar />
          <div className="flex items-center gap-6">
            <div className="md:flex hidden">
              <Logo />
            </div>
            <div className="md:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
              <NavMenu />
            </div>
          </div>
        </div>
        <div className="w-full md:w-auto flex items-center gap-3">
          <div className="w-full md:w-auto flex items-center gap-2">
            <Search />
            <div className="flex ml-2.5 sm:ml-0">
              <Link
                href="https://github.com/Storik4pro/goodbyeDPI-UI/"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export const LogoIcon = ({ className }: { className?: string }): JSX.Element => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 495.46 495.46" 
      className={className}
    >
      <path d="M247.44,167.1l81.11,81.1-81.11,81.11L166.33,248.2Z" style={{ fill: "none" }} />
      <path d="M199.86,0,0,199.86v93l80.09,80.08L142,311.07,78,247.15,247.73,77.46l63.92,63.92,62.67-62.65L295.6,0Z" style={{ fill: "#009bff" }} />
      <path d="M416.73,121.14,354.07,183.8l63.35,63.35L247.73,416.85,184.38,353.5l-61.87,61.87,80.08,80.09h90.28L495.46,292.87v-93Z" style={{ fill: "#009bff" }} />
      <path d="M247.73,167.39l80.74,80.74-80.74,80.74L167,248.13Z" style={{ fill: "#009bff" }} />
      <path d="M347.29,431.53s8.74,6.46,15.5,8.27m-47.06-88.47s7.25,10.31,29.51,30.24S381,409.51,381,409.51m-42.71-94s15.9,17.25,35.67,34.68a406.83,406.83,0,0,0,35.76,28.37m-41.84-84.31s22.13,15.62,39.72,29.62,21.28,20.05,21.28,20.05m-58.72-57.77a34.63,34.63,0,0,0-2.28,8.1c-15.38-3.17-27,7.63-29.62,21.28-12.82.73-25.24,16.73-26.64,26.5-.39,3.36,4.06,9.3,4.06,9.3s-2.78-6-8.83-3-16.41,15-12,31.59c3.62,13.5,52.37,51.64,52.37,51.64a130.09,130.09,0,0,0-37.49-2.72c-12.71,1.1-21,14.23-11.87,24.47,5,5.54,22.61,8.52,30.06,9.4,20.85,2.45,50.6,11.37,67.39,5.68,12.41-5.33,13.6-14.29,15.26-30.3,19.72-.77,32.16-18.47,32.16-34.8a24.35,24.35,0,0,0,18.06-28.22c11.57-1.37,15.22-13,15.22-22.47-.57-27-89-98.68-105.89-66.42ZM58.13,154s-6.46-8.74-8.27-15.5m88.47,47.08S128,178.3,108.08,156s-27.94-35.78-27.94-35.78m94,42.71s-17.24-15.9-34.68-35.67a406.89,406.89,0,0,1-28.35-35.78m84.31,41.84S179.8,111.23,165.8,93.63s-20.07-21.27-20.07-21.27m57.78,58.72a35.2,35.2,0,0,1-8.11,2.28c3.17,15.38-7.63,27-21.28,29.61-.72,12.83-16.72,25.24-26.49,26.64-3.36.39-9.3-4.06-9.3-4.06s6,2.78,3,8.83-15,16.41-31.59,12C96.26,202.73,58.13,154,58.13,154a130.09,130.09,0,0,1,2.71,37.49c-1.09,12.71-14.23,21-24.47,11.87-5.53-5-8.52-22.6-9.39-30-2.46-20.86-11.38-50.6-5.68-67.39,5.32-12.42,14.28-13.61,30.3-15.26C52.36,71,70.06,58.51,86.39,58.51a24.34,24.34,0,0,1,28.22-18c1.38-11.58,13-15.22,22.47-15.22,27,.57,98.68,89,66.43,105.89Z" style={{ fill: "#fff", stroke: "#000050", strokeLinecap: "round", strokeLinejoin: "round", strokeOpacity: 0.957, strokeWidth: "8.06px" }} />
      <path d="M166.37,92.33c-2.41-.39-32.56,28.44-32.66,30.4s11.6,14.48,13.42,14.8,31.18-27.13,31.39-29.44S168.44,92.67,166.37,92.33Z" style={{ fill: "#ffe10a", stroke: "#e6c800", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "5px" }} />
    </svg>
  );
};

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 select-none">
      <LogoIcon className="w-6 h-6 text-muted-foreground" />
      <h2 className={`text-md font-bold ${GeistMono.variable}`}>GoodbyeDPI.UI</h2>
    </Link>
  );
}

export function NavMenu({ isSheet = false }) {
  return (
    <>
      {NAVLINKS.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="!text-primary md:font-semibold font-medium"
            absolute
            className="flex items-center gap-1 dark:text-stone-300/85 text-stone-800 whitespace-nowrap relative"
            href={item.href}
          >
            {item.title}{" "}
            {item.external && (
              <ExternalArrow className="absolute top-[2px] -right-[10px] hidden md:block" />
            )}
          </Anchor>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}

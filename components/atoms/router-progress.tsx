"use client";

import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";

const RouterProgress = () => {
  const pathname = usePathname();
  
  useEffect(() => {
    NProgress.configure({ showSpinner: true });
    NProgress.start();
    NProgress.done();

    return () => {
      NProgress.done();
    };
  }, [pathname]);

  return null;
};

export default RouterProgress;

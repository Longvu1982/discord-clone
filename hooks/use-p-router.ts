// useRouter.ts

import {
  useRouter as useBaseRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";

export function useRouter() {
  const router = useBaseRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { push, refresh } = router;

  router.push = async (...args: Parameters<typeof push>) => {
    NProgress.start();
    return push(...args);
  };

  router.refresh = async (...args: Parameters<typeof refresh>) => {
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
    }, 1000);
    return refresh(...args);
  };

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);
  return router;
}

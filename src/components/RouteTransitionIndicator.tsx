"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function RouteTransitionIndicator() {
  const pathname = usePathname();
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  useEffect(() => {
    console.log(pathname);
    const handleRouteChange = () => {
      setIsLoaderVisible(true);
    };

    const handleRouteComplete = () => {
      setIsLoaderVisible(false);
    };

    // here we subscribe to router change start and complete events
    // router.events.on("routeChangeStart", handleRouteChange);
    // router.events.on("routeChangeComplete", handleRouteComplete);

    // // unsubscribing to router events when component unmounts to prevent memeory leaks
    // return () => {
    //   router.events.off("routeChangeStart", handleRouteChange);
    //   router.events.off("routeChangeComplete", handleRouteComplete);
    // };
  }, [pathname]);

  if (isLoaderVisible) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Hell
      </div>
    );
  }

  return null;
}

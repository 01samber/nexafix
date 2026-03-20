"use client";

import { useState, useEffect } from "react";

export function useIsNetworkAccess() {
  const [isNetworkAccess, setIsNetworkAccess] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    setIsNetworkAccess(host !== "localhost" && host !== "127.0.0.1");
  }, []);

  return isNetworkAccess;
}

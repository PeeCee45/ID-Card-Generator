"use client";
import { useEffect } from "react";

export default function VisitorNotifier() {
  useEffect(() => {
    // only send once per session
    if (!sessionStorage.getItem("visited")) {
      fetch("/api/visits", { method: "POST" });
      sessionStorage.setItem("visited", "true");
    }
  }, []);
}

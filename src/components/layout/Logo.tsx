"use client";

import { useState } from "react";
import Image from "next/image";

export default function Logo() {
  const [assetPath, setAssetPath] = useState("/logo-minaz.svg");

  if (assetPath === "fallback") {
    return (
      <span className="group flex items-center gap-3" aria-label="MINAZ home">
        <span className="flex h-9 w-9 items-center justify-center border border-red text-[11px] font-bold tracking-[-0.08em] text-white transition-colors group-hover:bg-red">M</span>
        <span className="text-[18px] font-semibold tracking-[0.28em] text-white">MINAZ</span>
      </span>
    );
  }

  return (
    <span className="flex h-10 items-center">
      <Image
        src={assetPath}
        alt="MINAZ"
        width={150}
        height={36}
        className="h-9 w-auto max-w-[150px] object-contain"
        onError={() => setAssetPath(assetPath === "/logo-minaz.svg" ? "/logo-minaz.png" : "fallback")}
      />
    </span>
  );
}
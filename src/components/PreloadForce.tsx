import Image from "next/image";

export function PreloadForce() {
  // This is necessary to force preloading of those specific background images
  // Since Next.js disables our ability to manually set <head> tags for the sake
  // Of getting devs to spend money on their Image Optimization service
  // (This sort of stuff is why I'm probably migrating to TanStack Start in the near future)
  return (
    <>
      <Image src="/assets/header_4k.webp" className="preload-force" alt="" width={1} height={1} priority unoptimized />
      <Image src="/assets/dot-pattern.svg" className="preload-force" alt="" width={1} height={1} priority unoptimized />
    </>
  );
}

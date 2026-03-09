import Image from "next/image";
import Dock from "./components/Dock";

export default function Page() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Image
        src="/images/home.webp"
        alt="background"
        fill
        priority
        className="object-cover"
      />
      <Dock />
    </main>
  );
}

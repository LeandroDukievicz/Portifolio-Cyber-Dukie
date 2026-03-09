import Image from "next/image";

export default function Projetos() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Image
        src="/images/project.webp"
        alt="background projetos"
        fill
        priority
        className="object-cover"
      />
    </main>
  );
}

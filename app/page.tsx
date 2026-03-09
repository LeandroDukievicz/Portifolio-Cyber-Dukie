import BackgroundImage from "./components/BackgroundImage";

export default function Page() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <BackgroundImage src="/images/home.webp" alt="background home" />
    </main>
  );
}

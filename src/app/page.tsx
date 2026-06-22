
import Welcome from "@/components/Welcome";

export default function Page() {
  return (
    <main className="h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl flex items-center justify-center">
        <Welcome />
      </div>
    </main>
  );
}
import ProfileForm from "@/components/forms/profile-form";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        sveiki grybai

        <Button variant="outline">Get Started</Button>

        sveiki draugai

        <ProfileForm />
      </div>
    </div>
  );
}

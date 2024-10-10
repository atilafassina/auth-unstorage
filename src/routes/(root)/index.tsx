import { Title } from "@solidjs/meta";
import { Login } from "~/components/ui/login";

export default function Home() {
  return (
    <div>
      <Title>Login</Title>
      <div class="grid place-items-center h-full pt-20">
        <Login />
      </div>
    </div>
  );
}

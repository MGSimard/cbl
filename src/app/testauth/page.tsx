import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import { User } from "./User";
export default function PageTestAuth() {
  return (
    <main>
      <h1>TestAuth</h1>
      <SignIn />
      <SignOut />
      <hr />
      <User />
    </main>
  );
}

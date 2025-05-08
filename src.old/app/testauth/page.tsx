import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import { User } from "./User";
import { TestAction } from "./testAction";

export default function PageTestAuth() {
  return (
    <main>
      <h1>TestAuth</h1>
      <SignIn />
      <SignOut />
      <hr />
      <User />
      <TestAction />
    </main>
  );
}

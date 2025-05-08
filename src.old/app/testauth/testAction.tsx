"use client";
import { testAction } from "@/server/actions";

export function TestAction() {
  const handleClick = async () => {
    const result = await testAction();
    console.log(result);
  };

  return (
    <button type="button" onClick={handleClick}>
      TestAction
    </button>
  );
}

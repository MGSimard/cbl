"use client";
import { useRouter } from "next/navigation";

export default function SumSearch() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const region = formData.get("region");
    const name = formData.get("name");
    const tag = formData.get("tag");
    router.push(`/summoner/${region}/${name}-${tag}`);
  };

  return (
    <form id="sum-search" onSubmit={handleSubmit}>
      <label htmlFor="region">
        <span>Region</span>
        <select name="region" id="region" required>
          <option value="na">NA</option>
          <option value="euw">EUW</option>
          <option value="kr">KR</option>
        </select>
      </label>
      <label htmlFor="name">
        <span>Name</span>
        <input type="text" name="name" placeholder="Name..." required min={3} max={16} size={16} />
      </label>
      <label htmlFor="tag">
        <span>Tag</span>
        <div id="tag-container">
          <span>#</span>
          <input type="text" name="tag" placeholder="ABC" required min={3} max={5} size={5} />
        </div>
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

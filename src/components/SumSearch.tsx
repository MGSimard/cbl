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
      <label htmlFor="region" id="region-label">
        <span>Region</span>
        <select name="region" id="region" className="vis-target" required>
          <option value="na">NA</option>
          <option value="euw">EUW</option>
          <option value="kr">KR</option>
        </select>
      </label>
      <label htmlFor="name">
        <span>Name</span>
        <input type="text" className="vis-target" name="name" placeholder="..." size={16} required />
      </label>
      <label htmlFor="tag">
        <span>Tag</span>
        <div id="tag-container" className="vis-target">
          <span>#</span>
          <input type="text" name="tag" placeholder="..." size={5} required />
        </div>
      </label>

      <button type="submit" id="sum-search-submit">
        <span>SEARCH</span>
      </button>
    </form>
  );
}

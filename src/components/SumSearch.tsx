"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SumSearch() {
  const router = useRouter();
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  const REGIONS = [
    { val: "br", label: "Brazil" },
    { val: "euw", label: "Europe West" },
    { val: "lan", label: "Latin America North" },
    { val: "las", label: "Latin America South" },
    { val: "kr", label: "Korea" },
    { val: "jp", label: "Japan" },
    { val: "eun", label: "Europe Nordic & East" },
    { val: "me", label: "Middle East" },
    { val: "na", label: "North America" },
    { val: "tr", label: "Türkiye" },
    { val: "ru", label: "Russia" },
    { val: "oce", label: "Oceania" },
    { val: "sg", label: "Singapore" },
    { val: "ph", label: "Phillippines" },
    { val: "th", label: "Thailand" },
    { val: "tw", label: "Taiwan" },
    { val: "vn", label: "Vietnam" },
  ];

  const isFormValid = region && name.trim() && tag.trim();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      router.push(`/summoner/${region}/${name.trim()}-${tag.trim()}`);
    }
  };

  return (
    <form id="sum-search" onSubmit={handleSubmit} noValidate>
      <label htmlFor="region" id="region-label">
        <span>Region</span>
        <select
          name="region"
          id="region"
          className="vis-target"
          required
          value={region}
          onChange={(e) => setRegion(e.target.value)}>
          <option value="" disabled>
            . . .
          </option>
          {REGIONS.map((region) => (
            <option key={region.val} value={region.val}>
              {region.label}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="name">
        <span>Name</span>
        <input
          type="text"
          className="vis-target"
          name="name"
          placeholder="..."
          size={16}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="tag">
        <span>Tag</span>
        <div id="tag-container" className="vis-target">
          <span>#</span>
          <input
            type="text"
            name="tag"
            placeholder="..."
            size={5}
            required
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
      </label>
      <button type="submit" className="btn-primary-action" disabled={!isFormValid}>
        <span>SEARCH</span>
      </button>
    </form>
  );
}

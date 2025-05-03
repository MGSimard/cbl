import { getPlayerData } from "@/server/actions";

export default async function PageSummoner({ params }: { params: Promise<{ region: string; player: string }> }) {
  const { region: regionPrefix, player: summoner } = await params;
  const { data, message } = await getPlayerData(regionPrefix, summoner);

  if (!data) {
    return <div>{message}</div>;
  }

  console.log(data);
  const { summonerName, summonerTag, puuid, profileIconId, level, profileIconUrl } = data;

  return (
    <>
      <header>
        <h1>Summoner Profile</h1>
      </header>
      <main>
        <section>
          <details>
            <summary>
              <h2>Aliases</h2>
            </summary>
          </details>
          <details>
            <summary>
              <h2>Reports</h2>
            </summary>
          </details>
          <details>
            <summary>
              <h2>Teammates</h2>
            </summary>
          </details>
        </section>

        <section>
          <h2>Match History</h2>
        </section>
      </main>
    </>
  );
}

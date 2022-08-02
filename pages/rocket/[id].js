import Image from "next/image";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import Dropdown from "../../components/dropdown";

export default function rockets({ rocketsData, upcomingData, pastData }) {
  const router = useRouter();
  const { id } = router.query;

  const rocketsFiltered = rocketsData.filter((obj) => {
    return obj.id === id;
  });

  //   Filter and sorting of the upcoming launches.
  const upcomingFiltered = upcomingData.filter((obj) => {
    return obj.rocket === id;
  });
  const upcompingSorted = upcomingFiltered.sort((a, b) =>
    a.date_unix > b.date_unix ? 1 : -1
  );

  //   Filter and sorting of the past launches.
  const pastFiltered = pastData.filter((obj) => {
    return obj.rocket === id;
  });
  const pastSorted = pastFiltered.sort((a, b) =>
    a.date_unix < b.date_unix ? 1 : -1
  );

  //   Wrapper to give logic to API data that is not available.
  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  return (
    <div className="flex flex-col justify-center items-center bg-space_wallpaper bg-fixed">
      <div className="block m-8">
        <Dropdown />
      </div>
      <h1 className="m-1 font-bold text-5xl text-white underline decoration-orange-400">
        {rocketsFiltered[0].name}
      </h1>

      <ConditionalWrapper
        condition={upcomingFiltered.length === 0 && pastFiltered.length === 0}
        wrapper={(children) => (
          <div className="text-white my-40 mx-10">
            <p>
              Sorry, there isn't any recorded launch data for{" "}
              <span className="underline decoration-orange-400">
                {rocketsFiltered[0].name}
              </span>
              .
            </p>
          </div>
        )}
      >
        <div className="w-full md:w-5/6 lg:w-3/5 xl:w-1/2">
          <ConditionalWrapper
            condition={upcomingFiltered.length === 0}
            wrapper={(children) => <div></div>}
          >
            <div className="mt-8 mx-4 p-2 rounded-t-lg bg-zinc-800 text-white w-5/12 md:w-1/3 text-center">
              <p>Upcoming Launches</p>
            </div>
          </ConditionalWrapper>

          {upcompingSorted.map((upcomingMapped) => (
            <div
              key={upcomingMapped.id}
              className="flex items-center bg-zinc-800 border border-zinc-500 mb-4"
            >
              <div className="flex p-4 justify-center items-center h-auto w-40">
                <ConditionalWrapper
                  condition={upcomingMapped.links.patch.small}
                  wrapper={(children) => (
                    <Image
                      alt={upcomingMapped.name}
                      src={upcomingMapped.links.patch.small}
                      width={150}
                      height={150}
                    />
                  )}
                >
                  <Image
                    alt={upcomingMapped.name}
                    src={"/spacex_logo.jpeg"}
                    width={125}
                    height={125}
                    className="rounded-full"
                  />
                </ConditionalWrapper>
              </div>
              <div className="text-white">
                <p className="my-2 pr-4">
                  Mission Name:{" "}
                  <span className="text-orange-400 inline-block">
                    {upcomingMapped.name}
                  </span>
                </p>
                <p className="my-4 pr-4">
                  Launch Date:{" "}
                  <span className="text-orange-400 inline-block">
                    {dayjs
                      .unix(upcomingMapped.date_unix)
                      .format("dddd, MMMM D, YYYY [at] HH:mm")}
                  </span>
                </p>
                <p className="my-2 pr-4">
                  Success/Failure:{" "}
                  <span className="text-orange-400 inline-block">TBD</span>
                </p>
              </div>
            </div>
          ))}

          <ConditionalWrapper
            condition={pastFiltered.length === 0}
            wrapper={(children) => <div></div>}
          >
            <div className="mt-8 mx-4 p-2 rounded-t-lg bg-zinc-800 text-white w-5/12 md:w-1/3 text-center">
              <p>Past Launches</p>
            </div>
          </ConditionalWrapper>
          {pastSorted.map((pastMapped) => (
            <div
              key={pastMapped.id}
              className="flex items-center bg-zinc-800 border border-zinc-500 mb-4"
            >
              <div className="flex p-4 justify-center items-center h-auto w-40">
                <ConditionalWrapper
                  condition={pastMapped.links.patch.small}
                  wrapper={(children) => (
                    <Image
                      alt={pastMapped.name}
                      src={pastMapped.links.patch.small}
                      width={150}
                      height={150}
                    />
                  )}
                >
                  <Image
                    alt={pastMapped.name}
                    src={"/spacex_logo.jpeg"}
                    width={125}
                    height={125}
                    className="rounded-full"
                  />
                </ConditionalWrapper>
              </div>
              <div className="text-white">
                <p className="my-2 pr-4">
                  Mission Name:{" "}
                  <span className="text-orange-400 inline-block">
                    {pastMapped.name}
                  </span>
                </p>
                <p className="my-2 pr-4">
                  Launch Date:{" "}
                  <span className="text-orange-400 inline-block">
                    {dayjs
                      .unix(pastMapped.date_unix)
                      .format("dddd, MMMM D, YYYY [at] HH:mm")}
                  </span>
                </p>
                <p className="my-2 pr-4">
                  Success/Failure:{" "}
                  <ConditionalWrapper
                    condition={pastMapped.success}
                    wrapper={(children) => (
                      <span className="text-orange-400 inline-block">
                        Success
                      </span>
                    )}
                  >
                    <span className="text-orange-400 inline-block">
                      Failure - ________
                    </span>
                  </ConditionalWrapper>
                </p>
              </div>
            </div>
          ))}
        </div>
      </ConditionalWrapper>
    </div>
  );
}

export async function getServerSideProps() {
  //   API request of rockets.
  const rockets = await fetch(`https://api.spacexdata.com/v4/rockets`);
  const rocketsData = await rockets.json();

  //   API fetch of upcoming launches.
  const upcoming = await fetch(
    `https://api.spacexdata.com/v4/launches/upcoming`
  );
  const upcomingData = await upcoming.json();

  //   API fetch of past launches.
  const past = await fetch(`https://api.spacexdata.com/v4/launches/past`);
  const pastData = await past.json();

  return { props: { rocketsData, upcomingData, pastData } };
}

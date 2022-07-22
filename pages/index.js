import Head from "next/head";
import Dropdown from "../components/dropdown";

export default function Home() {
  return (
    <div>
      <Head>
        <title>SpaceX Launch Data</title>
        <meta
          name="App to navigate all of SpaceX's launch data."
          content="App to find all you want to know about a SpaceX rockets launch."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center h-screen bg-spacex_background bg-contain bg-no-repeat xl:bg-cover">
        <h1 className=" font-bold text-4xl m-4 text-white">Launch Data</h1>
        <div className="block mb-32">
          <Dropdown />
        </div>
      </main>
    </div>
  );
}

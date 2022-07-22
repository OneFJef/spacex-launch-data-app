import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import Link from "next/link";

const rockets = [
  { id: "5e9d0d95eda69955f709d1eb", name: "Falcon 1" },
  { id: "5e9d0d95eda69973a809d1ec", name: "Falcon 9" },
  { id: "5e9d0d95eda69974db09d1ed", name: "Falcon Heavy" },
  { id: "5e9d0d96eda699382d09d1ee", name: "Starship" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function dropdown() {
  const [selected, setSelected] = useState(null);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Button className="relative w-52 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
        <span className="ml-3 block truncate">
          {selected ? selected.name : "Select a rocket..."}
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options className="absolute z-10 mt-1 w-52 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {rockets.map((rocket) => (
            <Listbox.Option
              key={rocket.id}
              className={({ active }) =>
                classNames(
                  active ? "text-white bg-orange-400" : "text-zinc-800",
                  "cursor-default select-none relative py-2 pl-3 pr-9"
                )
              }
              value={rocket}
            >
              {({ selected, active }) => (
                <>
                  <div className="flex items-center">
                    <span
                      className={classNames(
                        selected ? "font-semibold" : "font-normal",
                        "ml-3 block truncate"
                      )}
                    >
                      <Link href={`/rocket/${rocket.id}`}>{rocket.name}</Link>
                    </span>
                  </div>

                  {selected ? (
                    <span
                      className={classNames(
                        active ? "text-white" : "text-zinc-800",
                        "absolute inset-y-0 right-0 flex items-center pr-4"
                      )}
                    ></span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}

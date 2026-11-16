import clsx from "clsx";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { locations } from "../constants";
import useWindowStore from "../store/window";
import useLocationStore from "../store/location";

const projects = locations.work?.children ?? [];

type LocationValue = (typeof locations)[keyof typeof locations];
type ChildItem = LocationValue["children"][number];
type ListItem = LocationValue | ChildItem;

export default function Home() {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  function handleOpenProjectFinder(project: ListItem) {
    setActiveLocation(project);
    openWindow("finder");
  }

  useGSAP(() => {
    Draggable.create(".folder");
  }, []);

  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProjectFinder(project)}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

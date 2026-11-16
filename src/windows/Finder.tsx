import { Search } from "lucide-react";
import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWrapper";
import { locations } from "../constants";
import useLocationStore from "../store/location";
import clsx from "clsx";
import useWindowStore from "../store/window";

type LocationValue = (typeof locations)[keyof typeof locations];
type ChildItem = LocationValue["children"][number];
type ListItem = LocationValue | ChildItem;

function Finder() {
  const { openWindow } = useWindowStore();  
  const { activeLocation, setActiveLocation } = useLocationStore();

  function renderList(name: string, items: ListItem[]) {
    return (
      <div>
        <h3>{name}</h3>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveLocation(item)}
              className={clsx(
                item.id === activeLocation?.id ? "active" : "not-active",
              )}
            >
              <img src={item.icon} alt={item.name} className="w-4" />
              <p className="text-sm font-medium truncate">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function openItem(item: ChildItem){
    if("fileType" in item && item.fileType === "pdf") return openWindow("resume");
    if(item.kind === "folder") return setActiveLocation(item);
    if("fileType" in item && "href" in item){
        const fileType = item.fileType as string;
        const href = item.href as string;
        if(["fig", "url"].includes(fileType) && href)
            return window.open(href, "_blank");
    }
    if("fileType" in item && item.fileType === "txt")
        return openWindow("txtfile", item as Record<string, unknown>);
    if("fileType" in item && item.fileType === "img")
        return openWindow("imgfile", item as Record<string, unknown>);
  }

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("Favorites",Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>
        <ul className="content">
            {activeLocation && "children" in activeLocation && activeLocation.children.map((item)=>(
                <li
                key={item.id}
                className={"position" in item ? (item.position as string) : ""}
                onClick={()=>openItem(item)}
                >
                    <img src={item.icon} alt={item.name} />
                    <p>{item.name}</p>

                </li>
            ))}

        </ul>

      </div>
    </>
  );
}

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;

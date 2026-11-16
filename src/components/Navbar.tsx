import dayjs from "dayjs";
import { navIcons, navLinks, WINDOW_CONFIG } from "../constants";
import useWindowStore from "../store/window";

type WindowKey = keyof typeof WINDOW_CONFIG;

export default function Navbar() {
    const {openWindow} = useWindowStore();
  return (
    <nav>
        <div>
            <img src="images/logo.svg" alt="logo" />
            <p className="font-bold"> Monis's Portfolio</p>
            <ul>
                {navLinks.map(({id, name, type})=> (
                    <li key={id} onClick={()=>openWindow(type as WindowKey)}>
                        <p>{name}</p>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <ul>
                {navIcons.map(({id,img})=>(
                    <li key={id}>
                        <img src={img} className="icon" alt={`icon-${id}`} />
                    </li>
                ))}
            </ul>

            <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </div>
    </nav>
  )
}

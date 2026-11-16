import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWrapper";
import useWindowStore from "../store/window";

type TextData = {
  name: string;
  description: string[];
  subtitle?: string;
  image?: string;
};

function Text() {
  const { windows } = useWindowStore();
  const data = windows.txtfile.data as TextData | null;

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data.name}</h2>
      </div>

      <div className="p-5 space-y-6 bg-white">
        {data.image && (
          <div className="w-full">
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-auto rounded"
            />
          </div>
        )}

        {data.subtitle && (
          <h3 className="text-lg font-semibold">{data.subtitle}</h3>
        )}

        <div className="space-y-3 leading-relaxed text-base text-gray-800">
          {data.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </>
  );
}

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;

import * as React from "react";
import "./styles.css";
import { AnimatePresence, motion } from "framer-motion";

const systems = ["cl", "ui", "wh", "ff"];

const flows = [
  { text: "starting..." },
  { text: "some interesting text", system: "ff" },
  { text: "this thing also happens", system: "ui" },
  [
    { text: "happens here", system: "cl" },
    { text: "happens here also", system: "wh" },
  ],
  { text: "this too", demo: true },
  { text: "and this also" },
  { text: "that was so fancy, IKR!" },
  { text: "reaches here", system: "cl" },
];

export default function App() {
  const [pos, setPos] = React.useState(0);
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") {
        setPos((pos) => {
          if (pos === 0) return pos;
          return pos - 1;
        });
      }

      if (e.key === "ArrowRight") {
        setPos((pos) => {
          if (pos === flows.length - 1) return 0;
          return pos + 1;
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const prev = Array.isArray(flows[pos - 1])
    ? flows[pos - 1]
    : [flows[pos - 1]].filter(Boolean);

  const current = Array.isArray(flows[pos]) ? flows[pos] : [flows[pos]];
  const rawSystems = Array.isArray(current)
    ? current.map((c) => "system" in c && c.system)
    : ["system" in current && current.system];
  const activated = rawSystems.filter(Boolean);
  return (
    <main>
      <mark>{pos}</mark>
      <article style={{ display: "flex" }}>
        {systems.map((s) => {
          return (
            <mark
              key={s}
              className="pill"
              style={
                activated.includes(s)
                  ? {
                      filter: "grayscale(0)",
                      opacity: 1,
                    }
                  : {}
              }
            >
              {s}
            </mark>
          );
        })}
      </article>
      <hr />

      <article className="main" style={{}}>
        <AnimatePresence>
          <motion.div
            layoutId={pos + prev}
            className="prev"
            initial={{ x: 0 }}
            animate={{
              scale: [1, 0.9, 0.7, 0.6],
              x: -400,
              filter: "grayscale()",
            }}
            transition={{ duration: 0.8 }}
            key={pos + "back"}
            exit={{ scale: 0 }}
          >
            {prev.map((c) => c && <div className={`content`}>{c.text}</div>)}
          </motion.div>
        </AnimatePresence>

        <motion.div
          layoutId={pos}
          className="prev"
          key={pos + "for"}
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.4 }}
        >
          {current.map((c) => (
            <div className={`content`}>{c.text}</div>
          ))}
        </motion.div>
      </article>
    </main>
  );
}

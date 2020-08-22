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
                      transform: "scale(1.3)",
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
            className="prev"
            initial={{ x: 0, scale: 0 }}
            animate={{
              scale: [0.1, 0.6],
              left: 140,

              filter: "grayscale()",
            }}
            transition={{ duration: 1.4 }}
            key={pos + "back"}
            exit={{scale: 0}}
          >
            {prev.map(
              (c) => c && <div className={`content`}>Prev: {c.text}</div>
            )}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            className="prev"
            key={pos + "for"}
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.4 }}
            exit={{ scale: 0 }}
          >
            {current.map((c) => (
              <div className={`content ${c.demo ? "animate__tada" : ""}`}>
                Forward: {c.text}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </article>
    </main>
  );
}

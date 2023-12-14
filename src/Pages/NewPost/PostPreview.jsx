import React, { useContext } from "react";
import "./Editor.css";
import { motion } from "framer-motion";
import { ButtonWhite } from "../../Components/Buttons/Button1";
import { PostContext } from "../../context/Post/PostContext";

const PostPreview = () => {
  const { handlePreview, article } = useContext(PostContext);
  const PostContent = article.blocks;
  console.log(PostContent);
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed z-[1000] top-0 left-0 w-screen h-screen bg-white overflow-y-scroll"
    >
      <div className="p-5 lg:px-10 border-b-2 flex items-center justify-between">
        <p className="text-xl font-semibold text-slate-600">Preview</p>
        <ButtonWhite name={"close"} onClick={handlePreview} />
      </div>
      <div className="w-full h-fit p-5 lg:px-10">
        {PostContent.map((block, i) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p
                  style={{
                    color: block.data.color,
                    textAlign: block.data.alignment,
                  }}
                  key={i}
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                />
              );

            case "header":
              return React.createElement(`h${block.data.level}`, {
                style: {
                  color: block.data.color,
                  textAlign: block.data.alignment,
                },
                key: i,
                dangerouslySetInnerHTML: { __html: block.data.text },
              });

            case "list":
              if (block.data.style === "ordered") {
                return (
                  <ol
                    style={{ listStyle: "inside", color: block.data.color }}
                    key={i}
                  >
                    {block.data.items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ol>
                );
              }
              if (block.data.style === "unordered") {
                return (
                  <ul
                    style={{ listStyle: "inside", color: block.data.color }}
                    key={i}
                  >
                    {block.data.items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                );
              }
              break;

            case "image":
              return (
                <img
                  src={block.data.file.url}
                  alt={block.data.caption}
                  key={i}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              );

            case "table":
              return (
                <table
                  style={{ borderCollapse: "collapse", width: "100%" }}
                  key={i}
                >
                  <thead>
                    <tr>
                      {block.data.content[0].map((header, j) => (
                        <th
                          key={j}
                          dangerouslySetInnerHTML={{ __html: header }}
                        />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.data.content.slice(1).map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );

            default:
              return null;
          }
        })}
      </div>
    </motion.div>
  );
};

export default PostPreview;

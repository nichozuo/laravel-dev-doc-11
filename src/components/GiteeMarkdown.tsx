import "github-markdown-css/github-markdown-light.css";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const GiteeMarkdown = ({ fileUrl }: { fileUrl: string }) => {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/nichozuo/laravel-dev-doc-11/main/docs/" +
        fileUrl
    )
      .then((response) => response.text())
      .then((markdown) => {
        // 你可以在这里使用remark-gfm来处理Markdown，但在这个例子中我们直接使用
        setMarkdownContent(markdown);
      })
      .catch((error) => console.error("Error fetching markdown file:", error));
  }, [fileUrl]);

  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

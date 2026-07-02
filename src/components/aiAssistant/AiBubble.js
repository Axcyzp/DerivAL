import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ThinkingIndicator from "./ThinkingIndicator";
import { STATIC_STYLES } from "./styles";

// React.memo keeps older AI messages stable while the user types or hovers
// around the input controls.
const AiBubble = memo(({ msg }) => {
  return (
    <div style={STATIC_STYLES.bubbleAi}>
      {msg.isThinking ? (
        <ThinkingIndicator />
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {msg.text}
        </ReactMarkdown>
      )}
    </div>
  );
});

export default AiBubble;

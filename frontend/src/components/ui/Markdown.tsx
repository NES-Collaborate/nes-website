import React from "react"
import Markdown, { Components } from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"

const CustomMarkdown = ({ children }: { children?: string }) => {
  const components: Components = {
    strong: ({ node, ...props }) => (
      <strong className="font-bold text-primary" {...props}>
        {props.children}
      </strong>
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-2xl font-semibold mt-5 mb-3 text-secondary" {...props}>
        {props.children}
      </h2>
    ),
    h1: ({ node, ...props }) => (
      <h1 className="text-3xl font-bold mt-6 mb-4 text-primary" {...props}>
        {props.children}
      </h1>
    ),
    li: ({ node, ...props }) => (
      <li className="list-disc list-inside mb-2" {...props}>
        {props.children}
      </li>
    ),
    p: ({ node, ...props }) => (
      <p className="mb-4 leading-relaxed" {...props}>
        {props.children}
      </p>
    ),
    a: ({ node, ...props }) => (
      <a className="text-blue-500 hover:text-blue-600 underline" {...props}>
        {props.children}
      </a>
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props}>
        {props.children}
      </blockquote>
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc list-inside" {...props}>
        {props.children}
      </ul>
    ),
  }

  return (
    <Markdown
      components={components}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {children}
    </Markdown>
  )
}

export default CustomMarkdown

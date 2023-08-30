type AppType = {
  href: string;
  title: string;
  description: string;
  tags: string[];
  new?: boolean;
  featured?: boolean;
};

export const apps: AppType[] = [
  {
    href: "/chatbot",
    title: "ChatGPT",
    description:
      "Engage in a conversation with ChatGPT, OpenAI's renowned chatbot.",
    tags: ["OpenAI", "ChatGPT", "LLM"],
  },
  {
    href: "/ask-pdf",
    title: "Ask PDF",
    description:
      "Interact with your PDF documents, ask questions, and extract insights.",
    tags: ["OpenAI", "ChatGPT", "LLM"],
  },
  {
    href: "/chat-youtube",
    title: "Chat with Youtube",
    description:
      "Interact with YouTube videos through natural language conversations.",
    tags: ["OpenAI", "ChatGPT", "LLM"],
  },
  {
    href: "/image-generator",
    title: "Image Generator AI",
    description: "Create stunning images with text.",
    tags: ["DALL-E", "HuggingFace", "Cloudinary", "Image Processing"],
  },
];

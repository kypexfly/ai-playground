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
    href: "/askpdf",
    title: "Talk PDF",
    description:
      "Interact with your PDF documents, ask questions, and extract insights.",
    tags: ["OpenAI", "ChatGPT", "LLM"],
  },
  {
    href: "/youtubechat",
    title: "Chat with Youtube",
    description:
      "Interact with YouTube videos through natural language conversations.",
    tags: ["OpenAI", "ChatGPT", "LLM"],
  },
  {
    href: "/imageprocessing",
    title: "Image Processing AI",
    description: "Unlock the potential of AI for image-related tasks and more.",
    tags: ["HuggingFace", "Cloudinary", "Image Processing"],
  },
];

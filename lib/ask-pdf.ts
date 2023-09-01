import fs from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI } from "langchain/llms/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PDFPage } from "./types";
import { Document } from "langchain/document";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { nanoid } from "ai";
import { VectorDBQAChain } from "langchain/chains";

const storePath = (chatId: string) => {
  return path.join(tmpdir(), "ai-playground", "ask-pdf", chatId);
};

function getHoursDiff(a: Date, b: Date): number {
  const diffInMilliseconds = a.getTime() - b.getTime();
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  return diffInHours;
}

export async function removeOutdatedChats() {
  const ttlHours = 24;
  const now = new Date();

  const storageDir = path.join(tmpdir(), "ai-playground", "ask-pdf");
  const files = await fs.readdir(storageDir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      const fullPath = path.join(storageDir, file.name);
      const stats = await fs.stat(fullPath);

      if (getHoursDiff(now, stats.birthtime) > ttlHours) {
        await fs.rm(fullPath, { recursive: true, force: true });
      }
    }
  }
}

const createStoreDir = async (chatId: string) => {
  const path = storePath(chatId);
  await fs.mkdir(path, { recursive: true });

  return path;
};

// 1000 token ~ 4000 characters
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 4000,
  chunkOverlap: 20,
});

const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });

const embeddingModel = new OpenAIEmbeddings({
  maxConcurrency: 5,
});

export async function createChat(pages: PDFPage[]) {
  const documents = pages.map(
    (p) =>
      new Document({
        pageContent: p.text,
        metadata: {
          page: p.page,
        },
      }),
  );

  const chunkedDocuments = await splitter.splitDocuments(documents);
  const vectorStore = await HNSWLib.fromDocuments(
    chunkedDocuments,
    embeddingModel,
  );

  const chatId = nanoid();
  const path = await createStoreDir(chatId);

  await vectorStore.save(path);

  return chatId;
}

export async function askQuestion(chatId: string, question: string) {
  const vectorStore = await HNSWLib.load(storePath(chatId), embeddingModel);

  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 5,
    returnSourceDocuments: true,
  });

  const { text: responseText, sourceDocuments } = (await chain.call({
    query: question,
  })) as { text: string; sourceDocuments?: Document[] };

  const pages = (
    (sourceDocuments
      ? sourceDocuments.map((d) => d.metadata.page).sort((a, b) => a - b)
      : []) as number[]
  ).filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return {
    text: responseText,
    pages,
  };
}

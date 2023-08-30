import { loadQARefineChain, VectorDBQAChain } from "langchain/chains";
import { Document } from "langchain/document";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const dir = path.join(process.cwd(), "public", "bitcoin.pdf");
    const loader = new PDFLoader(dir);
    const docs = await loader.load();

    const { question } = await req.json();
    console.log(question);

    if (docs.length === 0) {
      console.log("No documents found.");
      return;
    }

    const splitter = new CharacterTextSplitter({
      separator: " ",
      chunkSize: 250,
      chunkOverlap: 15,
    });

    const splitDocs = await splitter.splitDocuments(docs);

    const reducedDocs = splitDocs.map((doc) => {
      const reducedMetadata = { ...doc.metadata };
      delete reducedMetadata.pdf;
      return new Document({
        pageContent: doc.pageContent,
        metadata: reducedMetadata,
      });
    });

    // reducedDocs.forEach((doc) => {
    //   console.log(doc);
    // });

    const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
    const embeddings = new OpenAIEmbeddings();
    const store = await MemoryVectorStore.fromDocuments(
      reducedDocs,
      embeddings,
    );

    /**
     * Version 1: https://github.com/Hendrixer/fullstack-ai-nextjs/blob/main/util/ai.ts
     */

    // const chain = loadQARefineChain(model, {
    //   verbose: true,
    // });
    // const relevantDocs = await store.similaritySearch(question, 3);
    // const res = await chain.call({
    //   input_documents: relevantDocs,
    //   question,
    // });

    /**
     * Version 2: https://github.com/shawnesquivel/openai-javascript-course/blob/1-start-here/pages/api/solutions/pdf-query-soln.js
     */

    const chain = VectorDBQAChain.fromLLM(model, store, {
      // k: 3,
      returnSourceDocuments: false,
      // verbose: true,
    });
    const res = await chain.call({ query: question });

    // console.log(chain);
    console.log(res);

    return new Response("OK");
  } catch (err) {
    console.log(err);
  }
}

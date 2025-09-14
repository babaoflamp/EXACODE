import { Client } from "@langchain/langgraph-sdk";

export const createClient = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_LANGGRAPH_API_URL ?? `http://localhost:8501/api`;
  return new Client({
    apiUrl,
  });
};

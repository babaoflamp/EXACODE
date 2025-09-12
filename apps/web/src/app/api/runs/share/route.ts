import { NextRequest, NextResponse } from "next/server";
import { Client } from "langsmith";

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

async function shareRunWithRetry(
  lsClient: Client,
  runId: string
): Promise<string> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await lsClient.shareRun(runId);
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        throw error;
      }
      console.warn(
        `Attempt ${attempt} failed. Retrying in ${RETRY_DELAY / 1000} seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
  throw new Error("Max retries reached"); // This line should never be reached due to the throw in the loop
}

export async function POST(req: NextRequest) {
  let runId: string;
  
  try {
    const body = await req.json();
    runId = body.runId;
    
    console.log('Sharing run request:', { runId });

    if (!runId) {
      console.error('Missing runId in request');
      return new NextResponse(
        JSON.stringify({
          error: "`runId` is required to share run.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!process.env.LANGSMITH_API_KEY) {
      console.error('LANGSMITH_API_KEY is not configured');
      return new NextResponse(
        JSON.stringify({
          error: "LANGSMITH_API_KEY is not configured.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (parseError) {
    console.error('Failed to parse request body:', parseError);
    return new NextResponse(
      JSON.stringify({
        error: "Invalid request body.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const lsClient = new Client({
    apiKey: process.env.LANGSMITH_API_KEY,
  });

  try {
    console.log('Attempting to share run with LangSmith:', { runId });
    const sharedRunURL = await shareRunWithRetry(lsClient, runId);

    return new NextResponse(JSON.stringify({ sharedRunURL }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      `Failed to share run with id ${runId} after ${MAX_RETRIES} attempts:\n`,
      error
    );
    
    // Extract more specific error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new NextResponse(
      JSON.stringify({ 
        error: "Failed to share run after multiple attempts.", 
        details: errorMessage,
        runId: runId 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

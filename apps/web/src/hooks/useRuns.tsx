export function useRuns() {
  /**
   * Generates a public shared run ID for the given run ID.
   */
  const shareRun = async (runId: string): Promise<string | undefined> => {
    const res = await fetch("/api/runs/share", {
      method: "POST",
      body: JSON.stringify({ runId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // Log the error details for debugging
      try {
        const errorData = await res.json();
        console.error('Failed to share run:', {
          status: res.status,
          statusText: res.statusText,
          error: errorData
        });
      } catch (parseError) {
        console.error('Failed to share run (could not parse error response):', {
          status: res.status,
          statusText: res.statusText
        });
      }
      return;
    }

    const { sharedRunURL } = await res.json();
    return sharedRunURL;
  };

  return {
    shareRun,
  };
}

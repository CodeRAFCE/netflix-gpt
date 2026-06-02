import { useState } from "react";

const useAsync = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (asyncFn: () => Promise<unknown>) => {
    setLoading(true);
    setError(null);
    try {
      await asyncFn();
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, run };
};

export default useAsync;

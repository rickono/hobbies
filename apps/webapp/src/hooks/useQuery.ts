import {
  clientQuery,
  QueryFunction,
  QueryObject,
  ValidQueryPaths,
} from "actions";
import { useEffect, useState } from "react";

export function useQuery<TPath extends ValidQueryPaths>(
  path: TPath,
  ...args: Parameters<QueryFunction<QueryObject, TPath>>
): {
  data: Awaited<ReturnType<QueryFunction<QueryObject, TPath>>> | undefined;
  error: Error | null;
  isLoading: boolean;
} {
  const [data, setData] =
    useState<Awaited<ReturnType<QueryFunction<QueryObject, TPath>>>>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const result = await clientQuery(path, ...args);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [path, ...args]);

  return { data, error, isLoading };
}

// Types for the result object with discriminated union
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Executes an asynchronous operation and wraps its result in a unified Result object.
 *
 * Awaits the provided promise and returns:
 * - A success result containing the resolved data and a null error if the promise resolves.
 * - A failure result containing a null data field and the caught error if the promise rejects.
 *
 * @example
 * const result = await tryCatch(fetchData());
 * if (result.error) {
 *   // Handle the error
 * } else {
 *   // Process result.data
 * }
 *
 * @param promise - The asynchronous operation to execute.
 * @returns A Result object encapsulating either the successfully resolved data or the encountered error.
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

export const tc = tryCatch;

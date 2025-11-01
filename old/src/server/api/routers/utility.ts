import { err, ok, type Result } from "neverthrow";
import { z } from "zod";
import { tc } from "~/lib/tryCatch";
import { publicProcedure } from "../trpc";

export const uuidType = z.string().uuid();

export const identifyingInputType = z.object({
  id: uuidType,
});

export const blankPlaceholdingCallableProcedure = publicProcedure.mutation(
  () => "",
);

export enum apiErrorTypes {
  NotFound = "NotFound",
  Forbidden = "Forbidden",
  BadRequest = "BadRequest",
  Conflict = "Conflict",
  Incomplete = "Incomplete",
  ValidationError = "ValidationError",
  Failed = "Failed",
}

export enum apiDetailedErrorType {
  NotFound = "NotFound",

  // Forbidden types
  Forbidden = "Forbidden",
  ForbiddenAuthorisation = "Forbidden.Authorisation",
  ForbiddenInvalidOwnership = "Forbidden.InvalidOwnership",
  ForbiddenActivityMismatch = "Forbidden.ActivityMismatch",

  // BadRequest types
  BadRequestUnknown = "BadRequest.Unknown",
  BadRequestInternalServerError = "BadRequest.InternalServerError",
  BadRequestSequentialOperationFailure = "BadRequest.SequentialOperationFailure",
  BadRequestCorrupted = "BadRequest.Corrupted",

  // Conflict types
  ConflictDuplicate = "Conflict.Duplicate",
  ConflictInvalid = "Conflict.Invalid",
  ConflictInvalidState = "Conflict.InvalidState",
  ConflictDataTranscending = "Conflict.DataIsTranscending",

  // Incomplete types
  IncompleteScheduling = "Incomplete.Scheduling",
  IncompleteSchedulingStartDate = "Incomplete.Scheduling.MissingStartDate",
  IncompleteProviderIdentification = "Incomplete.ProviderIdentification",

  // ValidationError types
  ValidationErrorZod = "ValidationError.Zod",
  ValidationErrorUnknown = "ValidationError.Unknown",

  // Failed types
  Failed = "Failed",
  FailedUnknown = "Failed.Unknown",
}

export type apiError =
  | {
      type: apiErrorTypes.ValidationError;
      detailedType: apiDetailedErrorType.ValidationErrorZod;
      message: string;
      validationError: z.ZodError;
    }
  | {
      type: apiErrorTypes.NotFound;
      detailedType?: apiDetailedErrorType.NotFound;
      message: string;
    }
  | {
      type: apiErrorTypes.Failed;
      detailedType?:
        | apiDetailedErrorType.FailedUnknown
        | apiDetailedErrorType.Failed;
      message: string;
    }
  | {
      type: apiErrorTypes;
      detailedType: apiDetailedErrorType;
      message: string;
    };

export enum apiResponseTypes {
  Success = "Success",
  PartialSuccess = "PartialSuccess",
  FailForeward = "FailForeward",
  Inconsequential = "Inconsequential",
}

export enum apiResponseDetailedTypes {
  Success = "Success",
  SuccessNoData = "Success.NoData",

  // PartialSuccess types
  PartialSuccessPrivate = "PartialSuccess.Private", // Returns Partial Information with info that the Data has been withheld because target hasnt been published yet
  PartialSuccessPostCompletion = "PartialSuccess.PostCompletion",
  PartialSuccessArchived = "PartialSuccess.Archived",

  // FailForeward types
  FailForewardOverwriteMessage = "FailForeward.OverwriteMessage",
  FailForewardAppendMessage = "FailForeward.AppendMessage",
  FailForewardForceStatus = "FailForeward.ForceStatus",

  Inconsequential = "Inconsequential",
}
export type apiResponse<T> =
  | {
      type: apiResponseTypes.Inconsequential;
      detailedType?: apiResponseDetailedTypes.Inconsequential;
      message?: string;
      data?: T extends void | undefined | null ? undefined : T;
    }
  | {
      type: apiResponseTypes.Success;
      detailedType?: apiResponseDetailedTypes.Success;
      message?: string;
      data: T;
    }
  | {
      type: apiResponseTypes.Success;
      detailedType: apiResponseDetailedTypes.SuccessNoData;
      message?: string;
      data?: T extends void | undefined | null ? undefined : T;
    }
  | {
      type: apiResponseTypes.FailForeward;
      detailedType:
        | apiResponseDetailedTypes.FailForewardOverwriteMessage
        | apiResponseDetailedTypes.FailForewardAppendMessage
        | apiResponseDetailedTypes.FailForewardForceStatus;
      message: string;
      data: T extends void | undefined | null ? never : T;
    };

export type apiType<T> = Promise<Result<apiResponse<T>, apiError>>;

export enum databaseInteractionTypes {
  Default = "Default",
  Sequencial = "Sequencial",
}

/**
 * Simplifies database query operations by handling common error patterns and type checking.
 *
 * This utility function wraps database operations in try-catch logic and provides standardized
 * error handling for database interactions. It expects array results and can check for empty results.
 *
 * @param query The database query to execute
 * @param errorMessage Optional custom error message for NotFound errors
 * @returns A Result containing either the first item from the result array or an apiError
 */
export async function handleDatabaseInteraction<T, D extends boolean = true>(
  query: Promise<T[]>,
  deconstructArray = true as D,
  interactionType: databaseInteractionTypes = databaseInteractionTypes.Default,
): apiType<D extends true ? T : T[]> {
  const { data: resultArray, error: dbError } = await tc(query);
  if (dbError) {
    console.error(dbError);
    return err({
      type: apiErrorTypes.BadRequest,
      detailedType: apiDetailedErrorType.BadRequestInternalServerError,
      message: "Database operation failed",
    });
  }

  if (!deconstructArray) {
    return ok({
      type: apiResponseTypes.Success,
      detailedType: apiResponseDetailedTypes.Success,

      data: resultArray as unknown as D extends true ? T : T[],
    });
  }

  const result = resultArray?.[0];
  if (!result || result === undefined) {
    switch (interactionType) {
      default:
      case databaseInteractionTypes.Default:
        return err({
          type: apiErrorTypes.NotFound,
          detailedType: apiDetailedErrorType.NotFound,
          message: "No results found",
        });
      case databaseInteractionTypes.Sequencial:
        return err({
          type: apiErrorTypes.BadRequest,
          detailedType:
            apiDetailedErrorType.BadRequestSequentialOperationFailure,
          message: "Results should Exist but were not found",
        });
    }
  }

  return ok({
    type: apiResponseTypes.Success,
    detailedType: apiResponseDetailedTypes.Success,

    data: (deconstructArray ? result : resultArray) as D extends true ? T : T[],
  });
}

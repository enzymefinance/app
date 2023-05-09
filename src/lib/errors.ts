import { notFound } from "next/navigation";
import { ContractFunctionExecutionError, ContractFunctionRevertedError, ContractFunctionZeroDataError } from "viem";

export type CreateHandleRpcError = {
  executionError?: (error: ContractFunctionExecutionError) => never;
  revertedError?: (error: ContractFunctionRevertedError) => never;
  zeroDataError?: (error: ContractFunctionZeroDataError) => never;
};

const defaultNotFoundHandler = () => notFound();

export function handleContractError({
  executionError = defaultNotFoundHandler,
  revertedError = defaultNotFoundHandler,
  zeroDataError = defaultNotFoundHandler,
}: CreateHandleRpcError = {}) {
  return function handleContractError(error: unknown) {
    if (error instanceof ContractFunctionRevertedError) {
      return revertedError(error);
    }

    if (error instanceof ContractFunctionZeroDataError) {
      return zeroDataError(error);
    }

    if (error instanceof ContractFunctionExecutionError) {
      return executionError(error);
    }

    throw error;
  };
}

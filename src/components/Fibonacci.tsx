"use client";
import { useEffect, useState } from "react";
import type { InitInput, InitOutput } from "@/app/pkg/fibonacci";
import init from "@/app/pkg/fibonacci";

const WebAssembly = {
  fibonacci: null as ((n: bigint) => bigint) | null,
  init: async (input?: InitInput): Promise<void> => {
    const wasm: InitOutput = await init(input);
    WebAssembly.fibonacci = wasm.fibonacci;
  },
};

export default function Fibonacci() {
  const [result, setResult] = useState<bigint | null>(null);
  const [fibonacciInput, setFibonacciInput] = useState<bigint | null>(null);

  useEffect(() => {
    async function loadWasm() {
      if (typeof window !== "undefined") {
        await WebAssembly.init();
      }
    }
    loadWasm();
  }, []);

  const handleFibonacciCalculation = (value: bigint) => {
    if (WebAssembly.fibonacci) {
      const computedResult = WebAssembly.fibonacci(value);
      setResult(computedResult);
    } else {
      console.error("WASM module is not initialized.");
    }
  };
  return (
    <div>
      <h2 className="text-sm/6 font-medium text-gray-400">
        Calculate a fibonacci number
      </h2>
      <div className="grid sm:grid-cols-2 sm:gap-x-6 gap-y-4 sm:gap-y-0">
        <input
          type="number"
          onChange={(e) => setFibonacciInput(BigInt(e.currentTarget.value))}
          className="w-full px-4 py-2 bg-indigo-100 focus:bg-indigo-50 text-indigo-950 border rounded-md focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:w-1/2"
          onClick={() =>
            typeof fibonacciInput === "bigint"
              ? handleFibonacciCalculation(fibonacciInput)
              : null
          }
        >
          Get result
        </button>
        <p className="mt-4">
          <span className="text-4xl font-semibold tracking-tight text-indigo-950 dark:text-white">
            {typeof result === "bigint" ? result.toLocaleString() : null}
          </span>
        </p>
      </div>
    </div>
  );
}

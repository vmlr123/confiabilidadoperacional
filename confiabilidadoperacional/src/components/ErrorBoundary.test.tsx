import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

const ErrorComponent = () => {
  throw new Error("Test error");
};

const SafeComponent = () => <div>Safe component</div>;

describe("ErrorBoundary", () => {
  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("Safe component")).toBeInTheDocument();
  });

  it("renders error message when an error occurs", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});

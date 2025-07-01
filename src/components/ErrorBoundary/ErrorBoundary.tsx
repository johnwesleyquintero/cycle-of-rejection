import { Component, ErrorInfo, ReactNode } from "react";
import { Skull } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

// --- State Refinement ---
// We'll store not just that an error happened, but WHAT the error was.
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // --- Initial State ---
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(_: Error): Pick<ErrorBoundaryState, 'hasError'> {
    // This is the first step. It triggers the fallback UI.
    return { hasError: true };
  }

  // --- Capturing The Details ---
  // This lifecycle method captures the error details AFTER an error has been thrown.
  // We'll use it to update our state with the debugging info.
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You could also log the error to an error reporting service here
  }

  // --- Reset Function ---
  // A simple way to try re-rendering the component tree from scratch.
  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      // --- The Epic Fallback UI ---
      return (
        <div className="flex items-center justify-center min-h-screen bg-brand-black p-4">
          <div className="w-full max-w-2xl bg-gradient-metal rounded-2xl p-8 text-center border border-brand-red/20 shadow-2xl shadow-brand-red/10">
            <div className="flex justify-center mb-6">
              <Skull className="h-20 w-20 text-brand-red animate-pulse" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-3">
              A Glitch in the Codex
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              An unexpected error has corrupted this section. The system's
              guardian has contained the breach. You can attempt to rebuild or
              refresh the entire simulation.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={this.handleReset}
                className="bg-brand-gray-lighter/20 hover:bg-brand-red/20 text-gray-300 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-200"
              >
                Attempt to Rebuild
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-brand-red hover:bg-brand-red-light text-white px-6 py-3 rounded-full font-semibold transition-all duration-200"
              >
                Refresh Simulation
              </button>
            </div>

            {/* --- Developer-Only Debug Section --- */}
            {/* This block will ONLY render in your development environment */}
            {import.meta.env.MODE === "development" &&
              this.state.error &&
              this.state.errorInfo && (
                <div className="mt-8 text-left">
                  <details className="bg-brand-gray-darker/50 p-4 rounded-lg">
                    <summary className="font-semibold text-brand-red-lighter cursor-pointer hover:text-white transition-colors">
                      Show Debug Details
                    </summary>
                    <div className="mt-4">
                      <h3 className="font-bold text-white">Error Message:</h3>
                      <p className="text-red-400 font-mono bg-brand-black p-2 rounded mt-1">
                        {this.state.error.toString()}
                      </p>
                      <h3 className="font-bold text-white mt-4">
                        Component Stack:
                      </h3>
                      <pre className="text-sm text-gray-400 bg-brand-black p-3 rounded mt-1 whitespace-pre-wrap">
                        <code>{this.state.errorInfo.componentStack}</code>
                      </pre>
                    </div>
                  </details>
                </div>
              )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
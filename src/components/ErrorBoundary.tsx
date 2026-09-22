import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('DELIVR Application Error Boundary caught:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#faf8f5] text-[#2c201a] flex flex-col items-center justify-center p-6 select-none font-sans">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl border border-[#efe9e3] flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#ff6600]/10 flex items-center justify-center text-[#ff6600]">
              <span className="material-symbols-outlined text-[36px]">restaurant</span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-[#1f1915]">Something unexpected occurred</h2>
              <p className="text-xs text-[#7d7168] leading-relaxed">
                DELIVR encountered a problem while rendering this page.
              </p>
            </div>

            {this.state.error && (
              <div className="w-full p-3 rounded-xl bg-[#f5f2ed] border border-[#e8e2da] text-left text-[11px] font-mono text-[#b3261e] break-all max-h-32 overflow-y-auto">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-xl bg-[#ff6600] hover:bg-[#e65c00] text-white font-bold text-xs shadow-md shadow-[#ff6600]/20 active:scale-95 transition-all"
            >
              Reload & Clear Cache
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

import { Component, ErrorInfo, ReactNode } from 'react';

import { ErrorFallback } from '../ErrorFallback/ErrorFallback';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: 'Ooops, something went wrong.' };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Uncaught error:', error);
    return { hasError: true, errorMessage: error.message };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback errorMessage={this.state.errorMessage} />;
    }

    return this.props.children;
  }
}

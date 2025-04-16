/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ErrorInfo } from "react";
import { ReactNode } from "react";

interface IProps {
  // children 属性通常是 React.ReactNode 类型, 类似 Vue 的 slot 插槽
  children: ReactNode;
  fallback?: ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err: Error) {
    console.error("报错:", err);
    return { hasError: true };
  }

  componentDidCatch(err: Error, errorInfo: ErrorInfo) {
    console.error("报错:", err, errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Child() {
  const list: any = {};
  return (
    <div>
      {list.map((val: any, key: any) => (
        <div key={key}>{val}</div>
      ))}
    </div>
  );
}

const ErrorBoundaryDemo: React.FC = () => {
  return (
    <div>
      <ErrorBoundary fallback="报错">
        <Child />
      </ErrorBoundary>
    </div>
  );
};

export default ErrorBoundaryDemo;

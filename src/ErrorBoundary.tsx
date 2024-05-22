import React, { PropsWithChildren } from 'react';

interface State {
  hasError: boolean;
}

// Define the type of props explicitly
class ErrorBoundary extends React.Component<PropsWithChildren<{}>, State> {
  constructor(props: PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // エラーが発生したら、hasErrorをtrueに設定
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // エラー情報をログに出力するなど、エラーを処理することができます
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // エラーが発生したら、エラーメッセージを表示
      return <h1>何かが間違っています。</h1>;
    }

    return this.props.children; // エラーがない場合は、子コンポーネントをレンダリング
  }
}

export default ErrorBoundary;
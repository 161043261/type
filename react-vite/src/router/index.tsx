import { createBrowserRouter } from "react-router";
import App from "../App";
import { SuspenseDemo } from "../pages/suspense";
import StyledDemo from "../pages/Styled";
import UseStateDemo from "../pages/UseState";
import { UseReducerDemo } from "../pages/UseReducer";
import UseEffectDemo from "../pages/UseEffect";
import { UseLayoutEffectDemo } from "../pages/UseLayoutEffect";
import UseRefDemo from "../pages/UseRef";
import UseRefDemo2 from "../pages/UseRef2";
import UseMemoDemo from "../pages/UseMemo";
import { UseCallbackDemo } from "../pages/UseCallback";
import MemoUseCallback from "../pages/MemoUseCallback";
import { UseDebugValueDemo } from "../pages/UseDebugValue";
import ErrorBoundaryDemo from "../pages/error/ErrorBoundaryDemo";
import { lazy } from "react";
import HocDemo from "../hooks/HocDemo";
import HocDemo2 from "../hooks/HocDemo2";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    Component: App,
  },
  {
    path: "/parent",
    Component: lazy(() => import("../pages/Parent")),
  },
  {
    path: "/suspense",
    element: <SuspenseDemo />,
  },
  {
    path: "/styled",
    element: <StyledDemo>Styled Component</StyledDemo>,
  },
  {
    path: "/useState",
    element: <UseStateDemo />,
  },
  {
    path: "/useReducer",
    element: <UseReducerDemo />,
  },
  {
    path: "/useEffect",
    element: <UseEffectDemo />,
  },
  {
    path: "/useLayoutEffect",
    element: <UseLayoutEffectDemo />,
  },
  {
    path: "/useRef",
    element: <UseRefDemo />,
  },
  {
    path: "/useRef2",
    element: <UseRefDemo2 />,
  },
  {
    path: "/memo",
    // element: <MemoDemo />,
    Component: lazy(() =>
      import("../pages/Memo").then(({ MemoDemo }) => ({ default: MemoDemo })),
    ),
  },
  {
    path: "/useMemo",
    element: <UseMemoDemo />,
  },
  {
    path: "/useCallback",
    element: <UseCallbackDemo />,
  },
  {
    path: "/memoUseCallback",
    element: <MemoUseCallback />,
  },
  {
    path: "/useDebugValue",
    element: <UseDebugValueDemo />,
  },
  {
    path: "/error",
    element: <ErrorBoundaryDemo />,
  },
  {
    path: "/hoc",
    element: <HocDemo />,
  },
  {
    path: "/hoc2",
    element: <HocDemo2 />,
  },
]);

export default router;

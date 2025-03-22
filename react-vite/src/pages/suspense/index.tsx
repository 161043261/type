import { lazy, Suspense } from "react";
import Skeleton from "./skeleton";
// import AsyncCard from './async_card';

const AsyncCard = lazy(() => import("./async_card"));

export const SuspenseDemo: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <AsyncCard />
      </Suspense>
    </>
  );
};

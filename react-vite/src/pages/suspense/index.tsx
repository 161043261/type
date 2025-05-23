import { lazy, Suspense } from "react";
import Skeleton from "./Skeleton";
// import AsyncCard from './async_card';

const AsyncCard = lazy(() => import("./AsyncCard"));

export const SuspenseDemo: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <AsyncCard />
      </Suspense>
    </>
  );
};

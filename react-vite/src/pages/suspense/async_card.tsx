import { /** use, */ useEffect, useState } from "react";
import "./async_card.scss";

interface IRes {
  name: string;
  age: number;
  address: string;
  avatar: string;
}

const fetchData = async (): Promise<IRes> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return await fetch("/data.json").then((res) => res.json());
};

// const dataPromise = fetchData();
const AsyncCard: React.FC = () => {
  // const data = use(dataPromise);

  const [data, setData] = useState<IRes | null>(null);
  useEffect(
    () => {
      (async () => {
        const res = await fetchData();
        // 严格模式的开发环境下, 会执行两次副作用函数
        console.log(res);
        setData(res);
      })();
    },
    [], // dependencies 中有值改变时, 触发执行副作用函数
  );

  return (
    <div className="card-container">
      <header className="card-header">
        <div>{data?.name}</div>
        <div>{data?.age}</div>
      </header>
      <section className="card-content">
        <div>{data?.address}</div>
        <div>
          <img src={data?.avatar} alt="avatar" width={50} height={50} />
        </div>
      </section>
    </div>
  );
};

export default AsyncCard;

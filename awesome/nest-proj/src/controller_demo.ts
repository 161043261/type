/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// ts-node ./controller_demo.ts
// import axios from 'axios';
// Spring Boy 收收味, 这不比 Annotation 优雅多了
// 高阶函数
const Get: (url: string) => MethodDecorator = (url: string) => {
  return (target, propKey, propDescriptor) => {
    // console.log(propDescriptor.value);
    const method: any = propDescriptor.value;
    //#region
    // axios
    //   .get(url)
    //   .then((res) => {
    //     method(res.data, { statusCode: 200, statusText: 'OK' });
    //   })
    //   .catch((err) => {
    //     method(err, { statusCode: 404, statusText: 'Not Found' });
    //   });
    //#endregion
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        method(data, { statusCode: 200, statusText: 'OK' });
      })
      .catch((err) => {
        method(err, { statusCode: 404, statusText: 'Not Found' });
      });
  };
};

class Controller {
  constructor() {}
  // Get 好康的
  @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
  getList(
    res: any,
    status: {
      statusCode: number;
      statusText: string;
    },
  ) {
    console.log(res?.result?.list, status);
  }
}

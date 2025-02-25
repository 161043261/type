/* eslint-disable @typescript-eslint/no-unused-vars */
const Get: (url: string) => MethodDecorator = (url: string) => {
  return (target, propKey, propDescriptor) => {
    const method = propDescriptor.value as (
      content: unknown,
      status: {
        code: number;
        text: string;
      },
    ) => void;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        method(data, {
          code: 200,
          text: 'success',
        }); // printList
      })
      .catch((err) => {
        throw err;
      }); // printList
  };
};

class Controller {
  constructor() {}
  @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
  printList(
    content: { result: { list: any[] } },
    status: {
      code: number;
      test: string;
    },
  ) {
    console.log(content?.result?.list, status);
  }
}

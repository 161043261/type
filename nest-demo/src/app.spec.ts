import { filter, interval, map, Observable, of, retry, take } from 'rxjs';
import { v4 as uuid } from 'uuid';

describe('AppController', () => {
  describe('rxjs', () => {
    it('test1', async () => {
      await new Promise((resolve) => {
        const observable = new Observable((subscribe) => {
          subscribe.next(1); // on 1
          subscribe.next(2); // on 2
          subscribe.next(3); // on 3

          setTimeout(() => {
            subscribe.next(4); // on 4
            subscribe.complete();
            resolve(null);
          }, 3000);

          subscribe.next(5); // on 5
        });

        // emit
        observable.subscribe({
          next: (...args) => console.log(args),
        });
      });
    });

    it('test2', async () => {
      await new Promise((resolve) => {
        interval(3000)
          .pipe(take(5))
          .subscribe((arg) => {
            console.log(arg);
            resolve(null);
          });
      });
    });

    it('test2', async () => {
      await new Promise((resolve) => {
        interval(3000)
          .pipe(take(5))
          .subscribe((arg) => {
            console.log(arg);
            resolve(null);
          });
      });
    });

    it('test3', async () => {
      await new Promise((resolve) => {
        const observable = interval(100)
          .pipe(
            retry(3), // 最多重试 3 次
            map((val) => ({ val })),
            filter((wrap) => wrap.val % 2 === 0),
          )
          .subscribe((arg) => {
            console.log(arg);
            if (arg.val === 10) {
              // off
              observable.unsubscribe();
              resolve(null);
            }
          });
      });
    });

    it('test4', async () => {
      await new Promise((resolve) => {
        const observable = of(1, 6, 1, 0, 4, 3, 2, 6, 1)
          .pipe(
            map((val) => ({ val })),
            filter((wrap) => wrap.val % 2 === 0),
          )
          .subscribe((arg) => {
            console.log(arg);
            if (arg.val === 10) {
              // off
              observable.unsubscribe();
              resolve(null);
            }
          });
      });
    });
  });

  describe('uuid', () => {
    console.log(uuid());
  });
});

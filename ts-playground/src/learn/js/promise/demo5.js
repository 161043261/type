/* eslint-disable @typescript-eslint/no-unused-vars */
const p = new Promise(
  (
    //! resolve 函数将状态由 pending 修改为 fulfilled
    resolve /* function resolve(value: any): void */,
    //! reject 函数将状态由 pending 修改为 rejected
    reject /* function reject(reason: any): void */,
  ) => {
    resolve("ok1");
    console.warn(
      "[Preface] p.PromiseStage: pending => fulfilled, p.PromiseResult = 'ok1'",
    );
  },
);

// debugger
const p1 = p.then(
  (value) => {
    console.log("[Stage1] value:", value); //! value: ok1
    console.warn(
      "[Stage1] p1.PromiseState: pending => rejected, p1.PromiseResult = `new Error('err')`",
    );
    // return new Error('err') // 走 onfulfilled
    throw new Error("err"); // 走 onrejected
  },
  (reason) => {
    console.log(reason);
  },
);

// debugger
const p2 = p1.then(
  (value) => {
    console.log(value);
  }, // onfulfilled
  (reason) => {
    console.log("[Stage2] reason:", reason); //! reason: Error: err...
    //!!! 复活赛
    return new Promise((resolve, reject) => {
      resolve("ok2");
      console.warn(
        "[Stage2] p2.PromiseState: pending => fulfilled, p2.PromiseResult = 'ok2'",
      );
    });
  }, // onrejected
);

// debugger
const p3 = p2.then(
  (value) => {
    console.log("[Stage3] value:", value);
    console.warn(
      "[Stage3] p3.PromiseState: pending => fulfilled, p3.PromiseResult = 'done'",
    );
    return "done";
  },
  (reason) => {
    console.log(reason);
  },
);

// debugger
const p4 = p3.then(
  (value) => {
    console.log("[Stage4] value:", value); // value: ok2
    console.warn(
      "[Stage4] p4.PromiseState: pending => fulfilled, p4.PromiseResult = undefined",
    );
    // return undefined
  },
  (reason) => {
    console.log(reason);
  },
);

//// p4.then(
////   (value) => {
////     console.log("[Stage5] value:", value) // [Stage5] value: undefined
////   }
//// )

//! [Preface] p.PromiseStage: pending => fulfilled, p.PromiseResult = 'ok1'

//? [Stage1] value: ok1
//? [Stage1] p1.PromiseState: pending => rejected, p1.PromiseResult = `new Error('err')`

//? [Stage2] reason: Error: err...
//? [Stage2] p2.PromiseState: pending => fulfilled, p2.PromiseResult = 'ok2'

//? [Stage3] value: ok2
//? [Stage3] p3.PromiseState: pending => fulfilled, p3.PromiseResult = 'done'

//? [Stage4] value: done
//? [Stage4] p4.PromiseState: pending => fulfilled, p4.PromiseResult = undefined

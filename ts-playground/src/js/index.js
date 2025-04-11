function xhrReplace() {
  if (!("XMLHttpRequest" in window)) {
    return;
  }
  const xhrProto = XMLHttpRequest.prototype;
  // 重写 XMLHttpRequest 原型上的 open 方法

  /**
   *
   * @param {object} sourceObj 重写的对象
   * @param {string} propKey 重写的属性键
   * @param {function} wrapper 包裹函数
   */
  const replaceAop = (sourceObj, propKey, wrapper) => {
    if (!(propKey in sourceObj)) return;
    const originalFn = sourceObj[propKey];
    const wrappedFn = wrapper(originalFn);
    sourceObj[propKey] = wrappedFn;
  };

  // 重写 XMLHttpRequest 原型上的 open 方法
  replaceAop(xhrProto, "open", (originalOpen) => {
    return function (...args) {
      // 获取 xhr 请求信息
      this._xhrTrace = {
        method: typeof args[0] === "string" ? args[0].toUpperCase() : args[0],
        url: args[1],
        startTime: new Date().getTime(),
        type: "xhr",
      };
      // 执行原始的 open 方法
      originalOpen.apply(this, args);
    };
  });

  // 重写 XMLHttpRequest 原型上的 send 方法
  replaceAop(xhrProto, "send", (originalSend) => {
    return function (...args) {
      // 请求结束时触发, 不管请求是成功还是失败
      this.addEventListener("loadend", () => {
        const { responseType, response, status } = this;
        const endTime = new Date().getTime();
        this._xhrTrace.reqData = args[0];
        this._xhrTrace.status = status;
        if (["", "json", "text"].indexOf(responseType) !== -1) {
          this._xhrTrace.responseText =
            typeof response === "object" ? JSON.stringify(response) : response;
        }
        // 计算 xhr 请求时长
        this._xhrTrace.elapsedTime = endTime - this._xhrTrace.startTime;
        // 上报 xhr 请求信息给服务器
        const reportInfo = (xhrTrace) => {
          console.log("上报 xhr 请求信息");
          console.log(xhrTrace);
        };
        reportInfo(this._xhrTrace);
        // 执行原始的 send 方法
      });
      originalSend.apply(this, args);
    };
  });
}

function fetchReplace() {
  if (!("fetch" in window)) {
    return;
  }
  const replaceAop = (sourceObj, propKey, wrapper) => {
    if (!(propKey in sourceObj)) return;
    const originalFn = sourceObj[propKey];
    const wrappedFn = wrapper(originalFn);
    sourceObj[propKey] = wrappedFn;
  };

  replaceAop(window, "fetch", (originalFetch) => {
    return function (url, config) {
      const startTime = new Date().getTime();
      // config ? (config.method ?? "GET") : "GET";
      // (config && config.method) || "GET";
      const method = config?.method ?? "GET";
      let _fetchTrace = {
        type: "fetch",
        method,
        reqData: config && config.body,
        url,
      };

      const reportInfo = (xhrTrace) => {
        console.log("上报 fetch 请求信息");
        console.log(xhrTrace);
      };

      return originalFetch.apply(window, [url, config]).then(
        (res) => {
          // res.clone() 克隆响应, 防止响应被标记为已消费
          const resClone = res.clone();
          const endTime = new Date().getTime();
          _fetchTrace = {
            ..._fetchTrace,
            elapsedTime: endTime - startTime,
            status: resClone.status,
          };
          resClone.text().then((data) => {
            _fetchTrace.responseText = data;
            // 上报 fetch 请求信息给服务器
            reportInfo(_fetchTrace);
          });
          // 返回原始 res, 外部继续使用 .then 调用
          return res;
        }, // onfulfilled
        (err) => {
          const endTime = new Date().getTime();
          _fetchTrace = {
            ..._fetchTrace,
            elapsedTime: endTime - startTime,
            status: 0,
            error: err,
          };
          // 上报 fetch 请求信息给服务器
          reportInfo(_fetchTrace);
          throw err;
        }, // onrejected
      );
    };
  });
}

let preHref = document.location.href;
function historyReplace() {
  const reportInfo = (k, v) => {
    console.log("上报路由改变");
    console.log(k, v);
  };

  const replaceAop = (sourceObj, propKey, wrapper) => {
    if (!sourceObj || !(propKey in sourceObj)) return;
    const originalFn = sourceObj[propKey];
    const wrappedFn = wrapper(originalFn);
    sourceObj[propKey] = wrappedFn;
  };

  const historyReplaceFn = (originalHistoryFn) => {
    return function (...args) {
      const url = args.length > 2 ? args[2] : undefined;
      if (url) {
        const from = preHref;
        const to = String(url);
        preHref = to;
        // 上报路由改变
        reportInfo("routeChange", { from, to });
      }
      return originalHistoryFn.apply(this, args);
    };
  };
  replaceAop(window.history, "pushState", historyReplaceFn);
  replaceAop(window.history, "replaceState", historyReplaceFn);
}

function addClickListener() {
  document.addEventListener('click', ({ target }) => {
    const tagName = target.tagName.toLowerCase();
    if (tagName === 'body') {
      return null
    }
  })
}

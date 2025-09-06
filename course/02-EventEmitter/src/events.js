// 这是EventEmitter对象的自定义实现。
// 代码摘自 https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/
// 上面的代码有个小bug,在这里已经修复了

module.exports = class EventEmitter {
  listeners = {};

  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }

  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  // 向 listerners 的 eventName 属性(数组)添加 函数,触发一次之后移除该函数.
  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = () => {
      fn();
      this.off(eventName, onceWrapper);
    };
    this.listeners[eventName].push(onceWrapper);
    return this;
  }

  // 向 listerners 的 eventName 属性(数组)移除指定的 函数.
  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    let lis = this.listeners[eventName];
    if (!lis) return this;
    for (let i = lis.length - 1; i >= 0; i--) {
      if (lis[i] === fn) {
        lis.splice(i, 1);
        break;
      }
    }
    return this;
  }

  emit(eventName, ...args) {
    let fns = this.listeners[eventName];
    if (!fns) return false;
    fns.forEach((f) => {
      f(...args);
    });
    return true;
  }

  // 计算 listerners 的 eventName 属性(数组)的长度,若无 eventName 属性将返回0
  listenerCount(eventName) {
    let fns = this.listeners[eventName] || [];
    return fns.length;
  }

  // 获取 listerners 的 eventName 属性(数组)
  rawListeners(eventName) {
    return this.listeners[eventName];
  }
};

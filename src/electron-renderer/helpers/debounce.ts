export default function debounce(f:Function, ms:number): Function {
  let timer:number = null;
  return function (...args:any[]) {
    const onComplete = () => {
      f.apply(this, args);
      timer = null;
    }

    if (timer) {
      window.clearTimeout(timer);
    }

    timer = window.setTimeout(onComplete, ms);
  };
}

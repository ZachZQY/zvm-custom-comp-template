/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import zionMdapi from "zion-mdapi"

interface CountProps {
  globalData: Record<string, any>;
}

export function Count(props: CountProps) {
  console.log(props);
  console.log("zionMdapi：", zionMdapi);
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

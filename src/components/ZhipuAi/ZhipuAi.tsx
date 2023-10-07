/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */

interface DisplayProps {
  globalData: Record<string, any>;
  setGlobalData: (data: Record<string, any>) => void;
  value?: string;
}

export function ZhipuAi(props: DisplayProps) {
  return (
    <div>
      <h1>{props.value || 'NO INPUT'}</h1>
      <button onClick={
        () => {
          console.log(props)
          
          props.setGlobalData({
            ...props.globalData,
            content: "123456",
          })
        }}>{props.globalData.content||"test"}</button>

    </div>





  );
}
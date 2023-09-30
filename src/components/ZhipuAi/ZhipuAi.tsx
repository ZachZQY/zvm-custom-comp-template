/* eslint-disable @typescript-eslint/no-explicit-any */
import zionMdapi from "zion-mdapi"

interface ZhipuAiProps {
  globalData: Record<string, any>;
  config?: any;
  input?: any;
  output?: any;
}


export function ZhipuAi(props: ZhipuAiProps) {
  if (!props.config) {
    props.config = {
      env: "H5",
      zhipuAi: {
        api_key: "786b9e4cf8acffe30b7e83863545a845.tpCbmqDYbazovuaW"
      }
    }
  } else if (!props.config.zhipuAi) {
    props.config.zhipuAi = {
      api_key: "786b9e4cf8acffe30b7e83863545a845.tpCbmqDYbazovuaW"
    }
  }
  const mdapi = zionMdapi.init(props.config);
  
  return <button onClick={
    async () => {
      props.output.status = "开始"
      props.globalData.content = "";
      props.output.content = "";
      await mdapi.zhipuAi.chat(props.input, "sse-invoke", (res: any) => {
        if (res.event != "add" && res.event != "finish") {
          props.output.status = "出错";
          props.globalData.content = res.data

        } else if (res.event == 'add') {
          props.output.status = "进行";
          props.globalData.content += res.data;
          props.output.content += res.data;
        } else {
          props.output.status = "完成";
        }
      })
    }

  }>发送</button>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import zionMdapi from "zion-mdapi"

interface ZhipuAiProps {
  globalData: Record<string, any>;
  content?: string;
}


export function ZhipuAi(props: ZhipuAiProps) {
  // if (!props.config.env) {
  //   props.config.env = "H5"
  //   props.config.zhipuAi = {
  //     api_key: "786b9e4cf8acffe30b7e83863545a845.tpCbmqDYbazovuaW"
  //   }
  // }
  const config = {
    env: "H5",
    zhipuAi: {
      api_key: "786b9e4cf8acffe30b7e83863545a845.tpCbmqDYbazovuaW"
    }
  }
  const mdapi = zionMdapi.init(config);
  return <button onClick={
    async () => {
      props.globalData.content = "";
      await mdapi.zhipuAi.chat({
        prompt: [{
          role: "user",
          content: "你好"
        }]
      }, "sse-invoke", (res: any) => {
        if (res.event != "add" && res.event != "finish") {
          props.globalData.content = res.data

        } else if (res.event == 'add') {
          props.globalData.content += res.data;
        }
      })
      console.log("globalData.content:", props.globalData.content);
    }


  }>发送</button>;
}

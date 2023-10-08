/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import zionMdapi from "zion-mdapi"

interface ZhipuAiProps {
  globalData: Record<string, any>;
  setGlobalData: (data: Record<string, any>) => void;
  input?: string;
  token?: string;
  api_key?: string;
  isSend?: boolean;
}

export function ZhipuAi(props: ZhipuAiProps) {
  const config = {
    env: "H5",
    zhipuAi: {
      api_key: props?.api_key || "786b9e4cf8acffe30b7e83863545a845.tpCbmqDYbazovuaW",
      token: props?.token || "",
    }
  }
  const mdapi = zionMdapi.init(config);
  let send_status = "空闲中";
  useEffect(() => {
    if (props.isSend && send_status == "空闲中") {
      chat();
    }
    console.log('isSend changed to', props.isSend);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isSend]);

  // 发送聊天
  async function chat() {
    send_status = "发送中";
    let output = "";
    interface ZhipuAiResult {
      event: string;
      id: string;
      data: string;
      meta?: any;
    }
    await mdapi.zhipuAi.chat({
      prompt: [{
        role: "user",
        content: props?.input || "你好"
      }]
    }, "sse-invoke", (res: ZhipuAiResult) => {
      if (res.event != "add" && res.event != "finish") {
        console.log("出错的数据：", res);
      } else if (res.event == 'add') {
        send_status = "进行";
        output += res.data;
        props.setGlobalData({ ...props.globalData, content: output })
      } else {
        send_status = "结束";
        console.log(res)
      }
    })
    console.log("output:", output);
    send_status = "空闲中";
  }
  return (<></>)
}
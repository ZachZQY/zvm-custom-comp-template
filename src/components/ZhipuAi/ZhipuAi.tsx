/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import zionMdapi from "zion-mdapi"

interface ZhipuAiProps {
  globalData: Record<string, any>;
  input?: string;
  output?: string;
  token?: string;
  api_key?: string;
  isSend?: boolean;
}

export function ZhipuAi(props: ZhipuAiProps) {
  console.log("组件接收的props:", props);
  const { isSend } = props;
  const [content, setContent] = useState("点击发送按钮，返回对话内容");
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
    if (isSend && send_status == "空闲中") {
      chat();
    }
    console.log('isSend changed to', isSend);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSend]);

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
    setContent("");
    await mdapi.zhipuAi.chat({
      prompt: [{
        role: "user",
        content: props?.input || "你好"
      }]
    }, "sse-invoke", (res: ZhipuAiResult) => {
      if (res.event != "add" && res.event != "finish") {
        send_status = "出错";
        setContent("出错啦~");

      } else if (res.event == 'add') {
        send_status = "进行";
        output += res.data;
        setContent(output);
      } else {
        send_status = "结束";
        console.log(res)
      }
    })
    console.log("output:", output);
    send_status = "空闲中";
  }
  return (
    <div style={
      {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }
    }>
      <div>{content}</div>
      <button onClick={
        chat
      }>发送</button>
    </div>
  );
}

import { ChatContent, type ChatItem } from "./ChatContent";
import { useCallback, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import axios from "axios";

export default function ChatbotTab() {
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);
  const [waiting, setWaiting] = useState<boolean>(false);
  const scrollToRef = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   setTimeout(
  //     () => scrollToRef.current?.scrollIntoView({ behavior: "smooth" }),
  //     100
  //   );
  // };

  // const generatedTextMutation = api.ai.generateText.useMutation({
  //   onSuccess: (data:any) => {
  //     setChatItems([
  //       ...chatItems,
  //       {
  //         content: data.generatedText,
  //         author: "AI",
  //       },
  //     ]);
  //   },

  //   onError: (error:any) => {
  //     setChatItems([
  //       ...chatItems,
  //       {
  //         content: error.message ?? "An error occurred",
  //         author: "AI",
  //         isError: true,
  //       },
  //     ]);
  //   },

  //   onSettled: () => {
  //     setWaiting(false);
  //     scrollToBottom();
  //   },
  // });

  // const callback = useCallback((item: ChatItem) => {
  //   setChatItems([...chatItems, item])
  // }, [chatItems])


  const sendChat = async (prompt: string | Blob) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('JWT token not found in local storage.');
      return;
    }
    const config = {
      method: 'post',
      url: `${process.env.API_URL}/models/llm/chat`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({text: prompt}),
      maxBodyLength: Infinity,
    };

    try {
      console.log(chatItems);
      const response = await axios(config);
      // callback({
      //   content: response.data.content,
      //   author: "AI",
      // })
    //   {response.data.content.map((record, index) => (
    //     setChatItems([
    //       ...chatItems,
    //       {
    //         content: response.data.content,
    //         author: "AI",
    //       },
    //     ]);
    // ))}
    setChatItems(response.data.content);
      // setChatItems([
      //   ...chatItems,
      //   {
      //     content: response.data.content,
      //     author: "AI",
      //   },
      // ]);
      setWaiting(false);
    } catch (error) {
      console.error('Error querying chatbot:', error);
    }
  };

  const handleUpdate = (prompt: string) => {
    setWaiting(true);
    console.log(chatItems)
    setChatItems([
      ...chatItems,
      {
        content: prompt.replace(/\n/g, "\n\n"),
        author: "User",
      },
    ]);
    // callback(
    //       {
    //         content: prompt.replace(/\n/g, "\n\n"),
    //         author: "User",
    //       },
    // )
    // scrollToBottom();
    sendChat(prompt)
  };

  const handleReset = () => {
    // callback([]);
  };

    return (
      <div  className="flex flex-col items-center bg-gray-800">
        <section className="w-full">
        </section>

        <section style={{ height: `${465}px` }} className="w-full flex-grow overflow-y-scroll">
          <ChatContent chatItems={chatItems} />
          <div ref={scrollToRef} />
        </section>

        <section className="w-full">
          <ChatInput
            onUpdate={handleUpdate}
            onReset={handleReset}
            waiting={waiting}
          />
        </section>
      </div>
    )
  }
import { Avatar } from "./Avatar";
import clsx from "clsx";
import ReactMarkdown from 'react-markdown'
export type ChatItem = {
  role: "User" | "assistant";
  content: string;
  isError?: boolean;
};

type Props = {
  chatItems: ChatItem[];
};

export const ChatContent = ({ chatItems }: Props) => (
  <>
    {chatItems.map((chatItem, index) => (
      <div
        key={index}
        className={clsx("py-4", {
          "bg-gray-900": chatItem.role === "User",
          "bg-gray-800": chatItem.role === "assistant",
          "pb-16": index === chatItems.length - 1,
        })}
      >
        <div className="container mx-auto flex max-w-3xl">
          <div>
            <Avatar author={chatItem.role} />
          </div>

          <div
            className={clsx("ml-5 mt-1 box-border", {
              "text-white": !chatItem.isError,
              "text-red-500": chatItem.isError,
            })}
          >
            <ReactMarkdown>{chatItem.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    ))}
  </>
);

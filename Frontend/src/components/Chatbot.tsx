import { useState } from "react"
import { useImmer } from "use-immer"
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

interface Message {
id :string
sessionId : string;
sender : string;
message : string;
loading : boolean; //Added for your UI tracking
error : boolean;

}


function ChatBot() {
  const [chatId , setChatId] = useState <string | null>(null);
  const [messages , setMessages] = useImmer<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const isLoading = messages.length && messages[messages.length -1].loading;

  async function submitNewMessage(){
    console.log('hi');
  const trimmedMessage = newMessage.trim();
  if(!trimmedMessage || isLoading) return; //chceks if its empty string sice "" is falsy

  setMessages(draft => [...draft,
    {sender:'user',content:trimmedMessage},
    {sender : 'assistant',content: '',sources:[], loading:true}
  ]);
// console.log(messages)
  setNewMessage('');

  let chatIdOrNew = chatId;
  try{
    if(!chatId)
{
  const {id} = await api.createChat();
  setChatId(id);
  chatIdOrNew =  id;

}  

const stream = await api.sendChatMessage(chatIdOrNew,trimmedMessage);
for await (const textChunk of parseSSEStream(stream)) {
  setMessages(draft => {
    draft[draft.length-1].message +=textChunk;
  });
  setMessages(draft => {
    draft[draft.length-1].loading = false;

  });
  

}

}catch(err){
  console.log(err);
  setMessages(draft=>{
    draft[draft.length-1].loading = false;
    draft[draft.length-1].error = true;
  })
}

}
submitNewMessage
  return (
    <div>
      {messages.length === 0 &&(
        <div>Welcom there</div>
      )}
      <ChatMessages 
      messages={messages} 
      isLoading = {isLoading}
      />
      <ChatInput 
      
      />
      
    </div>
  )
}


export default ChatBot


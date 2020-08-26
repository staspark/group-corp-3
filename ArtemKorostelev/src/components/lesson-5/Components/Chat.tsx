import React, {useState, useEffect} from "react";
import InputMessage from "./InputMessage";
import MessageList, {IMessage} from "./MessageList";

const Chat = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [botTriggered, setBotTriggered] = useState<boolean>(false);
    const timeout = 2000;
    const currentSender = 'sender_author';

    const addMessage = (msg: IMessage) => {
        setMessages(prevMessages => [...prevMessages, msg]);
        setBotTriggered(true);
    }

    useEffect(() => {
        if (botTriggered) {
            const debouncedEvent = setTimeout(() => addMessage({sender: 'sender_bot', text: 'azazaza'}), timeout);
            setBotTriggered(false);
            return () => clearTimeout(debouncedEvent);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages, timeout]);

    return (
        <div className='h-100'>
            <div className='h-75'>
                <MessageList currentSender={currentSender} messages={messages}/>
            </div>
            <div className='h-25 text-center'>
                <InputMessage onSend={text => (addMessage({sender: currentSender, text}))}/>
            </div>
        </div>
    );
}

export default Chat;

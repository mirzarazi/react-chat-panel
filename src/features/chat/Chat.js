/* eslint-disable react/no-array-index-key */
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MainContainer, ChatContainer, MessageList, Message, MessageInput, Sidebar, Search,
  ConversationList, Conversation, Avatar, ConversationHeader, EllipsisButton, TypingIndicator,
  SendButton,
} from '@chatscope/chat-ui-kit-react';
import {
  selectConversations, selectActiveChat, activateChat, sendMessage, searchContact, saveDraft,
} from './chatSlice';

const MainLayout = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [msgInputValue, setMsgInputValue] = useState('');

  const converstions = useSelector(selectConversations);
  const activeChat = useSelector(selectActiveChat);
  const handleSend = (message) => {
    dispatch(sendMessage({ id: activeChat.id, message }));
    inputRef.current.focus();
  };
  if (activeChat.draft !== msgInputValue) setMsgInputValue(activeChat.draft);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div style={{
      height: '100vh',
      position: 'relative',
    }}
    >
      <MainContainer data-testid="chat-element" responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." onChange={(search) => dispatch(searchContact(search))} />
          <ConversationList>
            {converstions.map((c) => (
              <Conversation
                key={c.id}
                name={c.name}
                lastSenderName={c.lastSender}
                info={c.lastMessage}
                onClick={() => dispatch(activateChat(c.id))}
                active={c.active}
                unreadDot={c.hasUnread}
              >
                <Avatar src={c.avatar} name={c.name} status={c.status} />
              </Conversation>
            ))}
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={activeChat.avatar} name={activeChat.name} />
            <ConversationHeader.Content userName={activeChat.id} />
            <ConversationHeader.Actions>
              <EllipsisButton orientation="vertical" />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList typingIndicator={activeChat.activity === 'typing' && <TypingIndicator content={`${activeChat.name} is typing`} />}>
            {activeChat.messages.map((m, i) => <Message key={i} model={m} />)}
          </MessageList>
          <MessageInput
            ref={inputRef}
            onChange={(msg) => { dispatch(saveDraft(msg)); return setMsgInputValue(msg); }}
            value={msgInputValue}
            sendButton
            attachButton={false}
            onSend={handleSend}
            style={{
              flexGrow: 1,
              borderTop: 0,
              flexShrink: 'initial',
            }}
          >
            <SendButton
              onClick={() => handleSend(msgInputValue)}
              disabled={msgInputValue.length === 0}
              style={{
                fontSize: '1.2em',
                marginLeft: 0,
                paddingLeft: '0.2em',
                paddingRight: '0.2em',
              }}
            />
          </MessageInput>
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default MainLayout;

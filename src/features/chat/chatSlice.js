import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postMessage from './chatAPI';

export const initialState = {
  activeChat: 'Lilly',
  search: '',
  draft: '',
  contacts: [
    {
      id: 'Lilly',
      name: 'Lilly',
      status: 'available',
      avatar: 'https://chatscope.io/storybook/react/static/media/lilly.62d4acff.svg',
      activity: 'idle',
      draft: '',
      history: [
        {
          direction: 'outgoing',
          message: 'hello',
          date: 1,
        },
        {
          direction: 'incoming',
          message: 'hello',
          date: 2,
        },
        {
          direction: 'outgoing',
          message: 'how are you?',
          date: 3,
        },

      ],
    },
    {
      id: 'Joe',
      name: 'Joe',
      status: 'dnd',
      avatar: 'https://chatscope.io/storybook/react/static/media/joe.641da105.svg',
      activity: 'idle',
      draft: '',
      history: [
        {
          direction: 'outgoing',
          message: 'hello',
          date: 1,
        },
        {
          direction: 'incoming',
          message: 'hello',
          date: 2,
          status: 'unread',
        },

      ],

    },
    {
      id: 'Kai',
      name: 'Kai',
      status: 'away',
      avatar: 'https://chatscope.io/storybook/react/static/media/kai.b62f69dc.svg',
      activity: 'idle',
      draft: '',
      history: [
        {
          direction: 'outgoing',
          message: 'hello',
          date: 1,
        },
        {
          direction: 'incoming',
          message: 'hello',
          date: 2,
        },
        {
          direction: 'incoming',
          message: 'how are you?',
          date: 3,
        },

      ],

    },
  ],
};

const getLast = (list = [], param) => [...list].sort((a, b) => b[param] - a[param])[0];

export const selectConversations = (state) => state.chat.contacts.map((contact) => {
  const lastMessage = getLast(contact.history, 'date');
  const hasUnread = contact.history.find((message) => message.status === 'unread') != null;
  return {
    id: contact.id,
    lastMessage: lastMessage?.message,
    lastSender: lastMessage?.direction === 'outgoing' ? 'me' : contact.name,
    lastDate: lastMessage?.date,
    hasUnread,
    status: contact.status,
    avatar: contact.avatar,
    name: contact.name,
    active: contact.id === state.chat.activeChat,
  };
})
  .sort((a, b) => b.lastDate - a.lastDate)
  .filter((conversation) => conversation.name.match(new RegExp(state.chat.search, 'i')));

export const selectActiveChat = (state) => {
  const activeConversation = state.chat.contacts
    .find((contact) => contact.id === state.chat.activeChat);
  return {
    avatar: activeConversation.avatar,
    name: activeConversation.name,
    id: activeConversation.id,
    activity: activeConversation.activity,
    draft: activeConversation.draft,
    messages: [...activeConversation.history].sort((a, b) => a.date - b.date),
  };
};

export const sendMessage = createAsyncThunk(
  'chat/send',
  async (payload) => {
    const response = await postMessage(payload);
    return response.data;
  },
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    activateChat: (state, action) => {
      const newState = state;
      newState.activeChat = action.payload;
      newState.contacts.find((contact) => contact.id === state.activeChat).history
        .forEach((message) => {
          const updatedMessage = message;
          updatedMessage.status = '';
        });
    },
    searchContact: (state, action) => {
      const newState = state;
      newState.search = action.payload;
    },
    saveDraft: (state, action) => {
      const newState = state;
      newState.contacts.find((contact) => contact.id === state.activeChat).draft = action.payload;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        const converstions = state.contacts.find((contact) => contact.id === state.activeChat);
        converstions.history.push({
          message: converstions.draft,
          direction: 'outgoing',
          date: new Date().getTime(),
        });
        converstions.activity = 'typing';
        converstions.draft = '';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const converstions = state.contacts.find((contact) => contact.id === action.payload.id);
        converstions.history.push({
          message: action.payload.message,
          direction: 'incoming',
          date: new Date().getTime(),
          status: state.activeChat !== action.payload.id ? 'unread' : '',
        });
        converstions.activity = 'idle';
      });
  },
});
export const { activateChat, searchContact, saveDraft } = chatSlice.actions;
// export const
export default chatSlice.reducer;

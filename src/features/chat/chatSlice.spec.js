import chatReducer, {
  activateChat,
  initialState
} from './chatSlice';

describe('chat reducer', () => {
  
  it('should handle initial state', () => {
    expect(chatReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should set active chat', () => {
    const actual = chatReducer(initialState, activateChat('Joe'));
    expect(actual.activeChat).toEqual('Joe');
  });
});

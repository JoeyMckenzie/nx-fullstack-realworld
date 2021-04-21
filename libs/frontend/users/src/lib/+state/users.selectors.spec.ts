import { User } from '@nx-fullstack-realworld/shared';
import { initialState, State, UsersPartialState } from './users.reducer';
import * as fromSelectors from './users.selectors';

const MOCK_USER: User = {
  bio: 'mock bio',
  email: 'mock email',
  username: 'mock username',
  token: 'mock token',
};

describe('Users Selectors', () => {
  let state: UsersPartialState;

  beforeEach(() => {
    state = {
      users: initialState,
    };
  });

  describe('Users Selectors', () => {
    it('getCurrentUser() should not return a user when no user has attempted to login or register', () => {
      // Arrange/Act
      const currentUser = fromSelectors.getCurrentUser(state);

      // Assert
      expect(currentUser).toBeUndefined();
    });

    it('getCurrentUser() should a user when a user has successfully logged in or registered', () => {
      // Arrange
      state = {
        users: {
          ...initialState,
          currentUser: MOCK_USER,
        },
      };

      // Act
      const result = fromSelectors.getCurrentUser(state);

      // Assert
      expect(result).toBe(MOCK_USER);
    });
  });
});

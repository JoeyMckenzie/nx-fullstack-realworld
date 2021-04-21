import { User } from '@nx-fullstack-realworld/shared';
import { initialState, State, UsersPartialState } from './users.reducer';
import * as fromSelectors from './users.selectors';
import { mockUser } from './users.mock';

describe('Users Selectors', () => {
  let state: UsersPartialState;

  beforeEach(() => {
    state = {
      users: initialState,
    };
  });

  describe('getLoading()', () => {
    it('should return false on initial state', () => {
      // Arrange/Act
      const result = fromSelectors.getLoading(state);

      // Assert
      expect(result).toBe(false);
    });

    it('should return true when loading flag has been set', () => {
      // Arrange
      state = {
        users: {
          loading: true,
        },
      };

      // Act
      const result = fromSelectors.getLoading(state);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe('getCurrentUser()', () => {
    it('should return undefined on initial state', () => {
      // Arrange/Act
      const currentUser = fromSelectors.getCurrentUser(state);

      // Assert
      expect(currentUser).toBeUndefined();
    });

    it('should return a user when a user has successfully logged in or registered', () => {
      // Arrange
      state = {
        users: {
          ...initialState,
          currentUser: mockUser,
        },
      };

      // Act
      const result = fromSelectors.getCurrentUser(state);

      // Assert
      expect(result).toBe(mockUser);
    });
  });
});

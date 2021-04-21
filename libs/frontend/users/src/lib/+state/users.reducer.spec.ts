import * as fromActions from './users.actions';
import { mockError, mockUser, mockUserRegistrationDto } from './users.mock';
import { initialState, reducer, State } from './users.reducer';

describe('Users Reducer', () => {
  describe('register actions', () => {
    it('should return loading as true upon initial registration action', () => {
      // Arrange
      const action = fromActions.registerUser(mockUserRegistrationDto);

      // Act
      const result: State = reducer(initialState, action);

      // Assert
      expect(result.loading).toBe(true);
      expect(result.currentUser).toBeUndefined();
      expect(result.currentErrors).toBeUndefined();
    });

    it('should return the user upon successful registration', () => {
      // Arrange
      const action = fromActions.registerUserSuccess(mockUser);

      // Act
      const result: State = reducer(initialState, action);

      // Assert
      expect(result.loading).toBe(false);
      expect(result.currentUser).toStrictEqual(mockUser);
      expect(result.currentErrors).toBeUndefined();
    });

    it('should return an error upon unsuccessful registration', () => {
      // Arrange
      const action = fromActions.registerUserFailure({
        errors: mockError.message,
      });

      // Act
      const result: State = reducer(initialState, action);

      // Assert
      expect(result.loading).toBe(false);
      expect(result.currentUser).toBeUndefined();
      expect(result.currentErrors).toStrictEqual(mockError.message);
    });
  });
});

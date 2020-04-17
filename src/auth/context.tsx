import React, { createContext, useContext } from 'react';
import { AsyncStorage } from 'react-native';

interface AuthContextValue {
  signIn: (token: string) => void;
  signOut: () => void;
  token?: string;
}
interface AuthState {
  isLoading: boolean;
  isSignOut: boolean;
  userToken?: string;
}
interface AuthAction {
  type: AuthActionType;
  token?: string;
}
enum AuthActionType {
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

const withAuth = (Component: React.ComponentType) => {
  return () => {
    const [state, dispatch] = React.useReducer<React.Reducer<AuthState, AuthAction>>((prevState, action) => {
      switch (action.type) {
        case AuthActionType.RESTORE_TOKEN:
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          };
        case AuthActionType.SIGN_IN:
          return {
            ...prevState,
            isSignOut: false,
            userToken: action.token
          };
        case AuthActionType.SIGN_OUT:
          return {
            ...prevState,
            isSignOut: true,
            userToken: undefined
          };
        default: return prevState;
      }
    }, {
      isLoading: true,
      isSignOut: false,
      userToken: undefined
    });

    React.useEffect(() => {
      const bootstrapAsync = async () => {
        let userToken: string | undefined;
        try {
          userToken = await AsyncStorage.getItem('funimation-token') ?? undefined;
        } catch (e) {
          console.error('could not retrieve token', e);
        }
        dispatch({ type: AuthActionType.RESTORE_TOKEN, token: userToken });
      };

      bootstrapAsync();
    }, []);

    const authContext = React.useMemo<AuthContextValue>(() => ({
      signIn: (token: string) => {
        dispatch({ type: AuthActionType.SIGN_IN, token });
      },
      signOut: () => dispatch({ type: AuthActionType.SIGN_OUT }),
      token: state.userToken
    }), [state]);

    return (
      <AuthContext.Provider value={authContext}>
        <Component />
      </AuthContext.Provider>
    );
  };
};

export const useAuth = () => useContext(AuthContext);
export default withAuth;
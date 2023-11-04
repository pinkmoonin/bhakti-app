import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { UserProvider } from './util/Auth';
import theme from "./theme/theme";
import router from "./navigation/Router";
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { getFirestore } from "firebase/firestore";


function App() {
  const app = useFirebaseApp();
  const firestoreInstance = getFirestore(app);

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <FirestoreProvider sdk={firestoreInstance}>
          <RouterProvider router={router} />
        </FirestoreProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;

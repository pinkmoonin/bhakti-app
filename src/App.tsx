import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { UserProvider } from './util/Auth';
import theme from "./theme/theme";
import router from "./navigation/Router";
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { getFirestore } from "firebase/firestore";
import { SnackbarProvider } from "notistack";

function App() {
  const app = useFirebaseApp();
  const firestoreInstance = getFirestore(app);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <UserProvider>
          <FirestoreProvider sdk={firestoreInstance}>
            <RouterProvider router={router} />
          </FirestoreProvider>
        </UserProvider>
      </SnackbarProvider>

    </ThemeProvider>
  );
}

export default App;

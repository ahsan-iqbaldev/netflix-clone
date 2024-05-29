import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../../config/firebase";

interface RegisterPayload {
  payload: any;
  onSuccess: any;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ payload, onSuccess }: RegisterPayload, { rejectWithValue }) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload?.email, payload?.password);
      const { user } = userCredential;
      const createdAt = firebase.firestore.FieldValue.serverTimestamp();
      const userData = {
        userName: payload?.name,
        email: payload?.email,
        createdAt,
      };
      await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .set(userData);
      onSuccess();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ payload, onSuccess }: RegisterPayload, { rejectWithValue }) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(payload?.email, payload?.password);
      const { user } = userCredential;

      const userDoc = await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .get();

      const userData = userDoc.data();
      onSuccess();
      return userData;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async ({ onSuccess }: { onSuccess: any }, { rejectWithValue }) => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      const user = userCredential.user;
      const createdAt = firebase.firestore.FieldValue.serverTimestamp();
      const userData = {
        userName: user?.displayName,
        email: user?.email,
        createdAt,
      };
      await firebase
        .firestore()
        .collection("users")
        .doc(user?.uid)
        .set(userData);
      onSuccess();
      return userData;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

interface AuthState {
  user: any;
  loading: boolean;
  error: any;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error;
      })
      .addCase(googleLogin.pending, (state) => {
        console.log("Google Login Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        console.log("Google Login Error");
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default authSlice.reducer;

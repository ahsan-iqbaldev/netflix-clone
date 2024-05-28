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
        console.log(err)
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
        state.error = action.error
      });
  },
});

export default authSlice.reducer;

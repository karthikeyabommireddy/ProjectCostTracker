// src/features/otherCostsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

// 🔥 Thunks (Async Actions)

// Fetch other costs for a user
export const fetchOtherCosts = createAsyncThunk("otherCosts/fetchOtherCosts", async (userId) => {
  const querySnapshot = await getDocs(collection(db, "users", userId, "otherCosts"));
  let costs = [];
  querySnapshot.forEach((docSnap) => {
    costs.push({ id: docSnap.id, ...docSnap.data() });
  });
  return costs;
});

// Add a new cost
export const addOtherCost = createAsyncThunk("otherCosts/addOtherCost", async ({ userId, cost }) => {
  const docRef = await addDoc(collection(db, "users", userId, "otherCosts"), cost);
  return { id: docRef.id, ...cost };
});

// Update a cost
export const updateOtherCost = createAsyncThunk("otherCosts/updateOtherCost", async ({ userId, costId, updatedCost }) => {
  const docRef = doc(db, "users", userId, "otherCosts", costId);
  await updateDoc(docRef, updatedCost);
  return { id: costId, ...updatedCost };
});

// Delete a cost
export const deleteOtherCost = createAsyncThunk("otherCosts/deleteOtherCost", async ({ userId, costId }) => {
  const docRef = doc(db, "users", userId, "otherCosts", costId);
  await deleteDoc(docRef);
  return costId;
});


// 🔥 Slice

const otherCostsSlice = createSlice({
  name: "otherCosts",
  initialState: {
    otherCosts: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherCosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOtherCosts.fulfilled, (state, action) => {
        state.loading = false;
        state.otherCosts = action.payload;
      })
      .addCase(addOtherCost.fulfilled, (state, action) => {
        state.otherCosts.push(action.payload);
      })
      .addCase(updateOtherCost.fulfilled, (state, action) => {
        const index = state.otherCosts.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.otherCosts[index] = action.payload;
        }
      })
      .addCase(deleteOtherCost.fulfilled, (state, action) => {
        state.otherCosts = state.otherCosts.filter((c) => c.id !== action.payload);
      });
  },
});

// Export state selector
export const selectOtherCosts = (state) => state.otherCosts.otherCosts;

export default otherCostsSlice.reducer;

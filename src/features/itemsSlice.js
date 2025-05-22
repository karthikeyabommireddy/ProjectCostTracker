// src/features/itemsSlice.js
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

// Fetch items for a user
export const fetchItems = createAsyncThunk("items/fetchItems", async (userId) => {
  const querySnapshot = await getDocs(collection(db, "users", userId, "items"));
  let items = [];
  querySnapshot.forEach((docSnap) => {
    items.push({ id: docSnap.id, ...docSnap.data() });
  });
  return items;
});

// Add a new item
export const addItem = createAsyncThunk("items/addItem", async ({ userId, item }) => {
  const docRef = await addDoc(collection(db, "users", userId, "items"), item);
  return { id: docRef.id, ...item };
});

// Update an item
export const updateItem = createAsyncThunk("items/updateItem", async ({ userId, itemId, updatedItem }) => {
  const docRef = doc(db, "users", userId, "items", itemId);
  await updateDoc(docRef, updatedItem);
  return { id: itemId, ...updatedItem };
});

// Delete an item
export const deleteItem = createAsyncThunk("items/deleteItem", async ({ userId, itemId }) => {
  const docRef = doc(db, "users", userId, "items", itemId);
  await deleteDoc(docRef);
  return itemId;
});


// 🔥 Slice

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

// Export state selector
export const selectItems = (state) => state.items.items;

export default itemsSlice.reducer;

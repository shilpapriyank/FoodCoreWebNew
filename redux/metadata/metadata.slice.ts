import { Metadata } from "@/types/metadata-types/metadata.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MetadataState {
  metadata: Metadata;
}

const INITIAL_STATE: MetadataState = {
  metadata: {},
};

const metadataSlice = createSlice({
  name: "metadata",
  initialState: INITIAL_STATE,
  reducers: {
    addmetaData: (state, action: PayloadAction<Metadata>) => {
      state.metadata = action.payload;
    },
  },
});

export const { addmetaData } = metadataSlice.actions;

export default metadataSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ContentItem {
  id: number | string;
  [key: string]: any;
}

interface ContentState {
  contents: ContentItem[];
  filters: { [key: string]: boolean };
  searchTerm: string;
  page: number;
  hasMore: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ContentState = {
  contents: [],
  filters: { paid: false, free: false, 'view only': false },
  searchTerm: '',
  page: 1,
  hasMore: true,
  status: 'idle',
  error: null,
};


// Async thunk for fetching contents
export const fetchContents = createAsyncThunk(
  'content/fetchContents',
  async ({
    page,
    filters,
    searchTerm,
  }: {
    page: number;
    filters: { [key: string]: boolean };
    searchTerm: string;
  }) => {
    const response = await axios.get('https://closet-recruiting-api.azurewebsites.net/api/data', {
      params: { page, search: searchTerm, ...filters },
    });

    return Array.isArray(response.data) ? response.data : response.data.items || [];
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<{ [key: string]: boolean }>) => {
      state.filters = action.payload;
      state.page = 1;
      state.contents = [];
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.page = 1;
      state.contents = [];
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = 1;
      state.contents = [];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContents.fulfilled, (state, action: PayloadAction<ContentItem[]>) => {
        state.status = 'succeeded';

        // Deduplicate using a Set
        const existingIds = new Set(state.contents.map((item) => item.id));
        const newItems = action.payload.filter((item) => !existingIds.has(item.id));

        state.contents = [...state.contents, ...newItems];
        state.hasMore = newItems.length > 0;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch contents';
      });
  },
});

export const { setFilters, resetFilters, setSearchTerm, setPage } = contentSlice.actions;
export default contentSlice.reducer;

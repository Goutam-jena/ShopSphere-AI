import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

interface AiChatBotState {
  messages: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AiChatBotState = {
  messages: [],
  loading: false,
  error: null,
};

export const chatBot = createAsyncThunk<string, { prompt: { message: string } }>(
  "aiChatBot/generateResponse",
  async ({ prompt }, { rejectWithValue }) => {
    try {
      const response = await api.post("/chat", prompt);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to generate chatbot response");
    }
  }
);

export const askProductQuestion = createAsyncThunk<string, { productId: string; question: string }>(
  "aiChatBot/askProductQuestion",
  async ({ productId, question }, { rejectWithValue }) => {
    try {
      const response = await api.post<{ answer: string }>(`/chat/product/${productId}`, { question });
      return response.data.answer;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to get answer");
    }
  }
);

const aiChatBotSlice = createSlice({
    name: "aiChatBot",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(chatBot.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.messages.push({ role: "user", message: action.meta.arg.prompt.message });
            })
            .addCase(chatBot.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.messages.push({ role: 'res', message: action.payload });
            })
            .addCase(chatBot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(askProductQuestion.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.messages.push({ role: "user", message: action.meta.arg.question });
            })
            .addCase(askProductQuestion.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.messages.push({ role: 'res', message: action.payload });
            })
            .addCase(askProductQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default aiChatBotSlice.reducer;









import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

// Define the initial state interface
interface AiChatBotState {
  response: string | null;
  loading: boolean;
  error: string | null;
  messages: any[];
}

const initialState: AiChatBotState = {
  response: null,
  loading: false,
  error: null,
  messages: [],
};

// Async thunk for GENERAL text-only chat
export const chatBot = createAsyncThunk<
  string,
  { prompt: { message: string }; productId: null; userId: number | null }
>("aiChatBot/generateResponse", async ({ prompt }, { rejectWithValue }) => {
  try {
    const response = await api.post("/chat", prompt);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to generate chatbot response"
    );
  }
});

// Async thunk for PRODUCT-SPECIFIC text-only questions
export const askProductQuestion = createAsyncThunk<
  string,
  { productId: string; question: string }
>("aiChatBot/askProductQuestion", async ({ productId, question }, { rejectWithValue }) => {
  try {
    const response = await api.post<{ answer: string }>(
      `/chat/product/${productId}`,
      { question }
    );
    return response.data.answer;
  } catch (error: any)
   {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to get answer";
    return rejectWithValue(message);
  }
});

// --- NEW ASYNC THUNK FOR IMAGE UPLOADS ---
export const sendMultimodalPrompt = createAsyncThunk<
  string,
  { formData: FormData }
>("aiChatBot/sendMultimodalPrompt", async ({ formData }, { rejectWithValue }) => {
  try {
    const response = await api.post("/chat/multimodal", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to process prompt"
    );
  }
});

// Create the slice
const aiChatBotSlice = createSlice({
  name: "aiChatBot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cases for GENERAL Chat (Home Page)
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
        state.messages.push({ role: 'res', message: `Sorry, an error occurred: ${action.payload}` });
      })

      // Cases for PRODUCT-SPECIFIC Chat
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
        state.messages.push({ role: 'res', message: `Sorry, an error occurred: ${action.payload}` });
      })

      // --- NEW CASES FOR THE MULTIMODAL (IMAGE) THUNK ---
      .addCase(sendMultimodalPrompt.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        const message = action.meta.arg.formData.get("message") as string;
        state.messages.push({ role: "user", message: message || "Image sent" });
      })
      .addCase(sendMultimodalPrompt.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.messages.push({ role: 'res', message: action.payload });
      })
      .addCase(sendMultimodalPrompt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default aiChatBotSlice.reducer;



























import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface GenerationItem {
  id: string;
  type: 'image' | 'video';
  prompt: string;
  ratio: '1:1' | '16:9' | '9:16' | '4:3';
  model: string;
  url: string;
  timestamp: number;
  isFavorite: boolean;
  style: string;
}

export interface ApiKeys {
  replicate: string;
  openai: string;
  stability: string;
}

interface GenerationState {
  history: GenerationItem[];
  apiKeys: ApiKeys;
  useMockMode: boolean;
  isGenerating: boolean;
  currentProgress: number;
  currentStatus: string;
  error: string | null;
  latestGeneration: GenerationItem | null;
}

const initialState: GenerationState = {
  history: [
    {
      id: 'mock-1',
      type: 'image',
      prompt: 'A futuristic cyberpunk street lined with glowing neon billboards, high tech hovercars, raining night, photorealistic',
      ratio: '16:9',
      model: 'Flux.1 (Snel)',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
      timestamp: Date.now() - 3600000 * 2,
      isFavorite: true,
      style: 'Cyberpunk'
    },
    {
      id: 'mock-2',
      type: 'video',
      prompt: 'Cinematic tracking shot of rotating planet Earth in deep space with colorful nebulae in the background',
      ratio: '16:9',
      model: 'Luma Dream Machine',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-rotating-planet-earth-in-space-41604-large.mp4',
      timestamp: Date.now() - 3600000 * 5,
      isFavorite: false,
      style: 'Cinematic'
    },
    {
      id: 'mock-3',
      type: 'image',
      prompt: 'Stunning 3D abstract digital render, floating metallic spheres, chrome and glass texture, pastel gradient background',
      ratio: '1:1',
      model: 'Stable Diffusion 3',
      url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop',
      timestamp: Date.now() - 3600000 * 24,
      isFavorite: false,
      style: '3D Render'
    }
  ],
  apiKeys: {
    replicate: '',
    openai: '',
    stability: ''
  },
  useMockMode: true,
  isGenerating: false,
  currentProgress: 0,
  currentStatus: '',
  error: null,
  latestGeneration: null
};

// Mock presets mapping styles to high quality media
const MOCK_IMAGES: Record<string, string[]> = {
  'Cyberpunk': [
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop'
  ],
  'Anime': [
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop'
  ],
  '3D Render': [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop'
  ],
  'Cinematic': [
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop'
  ],
  'Default': [
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop'
  ]
};

const MOCK_VIDEOS = [
  'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-43187-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-rotating-planet-earth-in-space-41604-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-futuristic-digital-tunnel-41712-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41620-large.mp4'
];

interface GenerateParams {
  type: 'image' | 'video';
  prompt: string;
  ratio: '1:1' | '16:9' | '9:16' | '4:3';
  model: string;
  style: string;
  onProgressUpdate?: (progress: number, status: string) => void;
}

export const generateMedia = createAsyncThunk<
  GenerationItem,
  GenerateParams,
  { state: { generation: GenerationState } }
>(
  'generation/generateMedia',
  async (params, { getState, dispatch, rejectWithValue }) => {
    const { type, prompt, ratio, model, style } = params;
    const state = getState().generation;

    // Helper function to sleep
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    if (state.useMockMode) {
      // Simulate progress stages
      const stages = [
        { progress: 10, status: 'Queueing request on GPU cluster...' },
        { progress: 30, status: 'Analyzing prompt aesthetics and composition...' },
        { progress: 55, status: 'Executing latent diffusion passes...' },
        { progress: 80, status: 'Upscaling details and applying color correction...' },
        { progress: 95, status: 'Wrapping file container and optimizing codec...' },
        { progress: 100, status: 'Completed generation!' }
      ];

      for (const stage of stages) {
        dispatch(updateProgress({ progress: stage.progress, status: stage.status }));
        await sleep(type === 'video' ? 1500 : 1000); // Video takes a bit longer to simulate
      }

      // Pick custom assets
      let finalUrl = '';
      if (type === 'image') {
        const pool = MOCK_IMAGES[style] || MOCK_IMAGES['Default'];
        finalUrl = pool[Math.floor(Math.random() * pool.length)];
      } else {
        finalUrl = MOCK_VIDEOS[Math.floor(Math.random() * MOCK_VIDEOS.length)];
      }

      return {
        id: `gen-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type,
        prompt,
        ratio,
        model,
        url: finalUrl,
        timestamp: Date.now(),
        isFavorite: false,
        style
      };
    } else {
      // Real API Mode
      try {
        if (type === 'image') {
          // Check for OpenAI API key
          if (!state.apiKeys.openai) {
            throw new Error('OpenAI API Key is missing. Configure it in Settings tab.');
          }

          dispatch(updateProgress({ progress: 20, status: 'Connecting to OpenAI API...' }));
          const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${state.apiKeys.openai}`
            },
            body: JSON.stringify({
              model: 'dall-e-3',
              prompt: `${prompt}, aspect ratio ${ratio}, style ${style}`,
              n: 1,
              size: ratio === '1:1' ? '1024x1024' : ratio === '16:9' ? '1792x1024' : '1024x1792'
            })
          });

          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData?.error?.message || 'OpenAI generation failed');
          }

          dispatch(updateProgress({ progress: 80, status: 'Retrieving generated image...' }));
          const data = await response.json();
          const imageUrl = data.data[0].url;

          dispatch(updateProgress({ progress: 100, status: 'Success!' }));

          return {
            id: `gen-${Date.now()}`,
            type: 'image',
            prompt,
            ratio,
            model: 'DALL-E 3',
            url: imageUrl,
            timestamp: Date.now(),
            isFavorite: false,
            style
          };
        } else {
          // Video generation via Replicate (e.g. Stable Video Diffusion or Luma)
          if (!state.apiKeys.replicate) {
            throw new Error('Replicate API Key is missing. Configure it in Settings tab.');
          }

          dispatch(updateProgress({ progress: 10, status: 'Triggering Replicate model...' }));
          
          // Using a standard public video generation model: stability-ai/stable-video-diffusion
          const startResponse = await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
              'Authorization': `Token ${state.apiKeys.replicate}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              version: '3f0fb17b2b73eb0ed2d1487f54c1f964a3875a6c382f7c2f0f4a86ad493cc139',
              input: {
                prompt: prompt,
                video_length: '14_frames_with_svd_xt'
              }
            })
          });

          if (!startResponse.ok) {
            const errText = await startResponse.text();
            throw new Error(`Replicate failed: ${errText}`);
          }

          let prediction = await startResponse.json();
          const pollUrl = prediction.urls.get;

          dispatch(updateProgress({ progress: 30, status: 'Waiting for Replicate GPU initialization...' }));

          let completed = false;
          let retries = 0;

          while (!completed && retries < 40) {
            await sleep(3000);
            retries++;

            const pollResponse = await fetch(pollUrl, {
              headers: { 'Authorization': `Token ${state.apiKeys.replicate}` }
            });
            prediction = await pollResponse.json();

            if (prediction.status === 'succeeded') {
              completed = true;
              break;
            } else if (prediction.status === 'failed') {
              throw new Error(`Replicate prediction failed: ${prediction.error}`);
            } else if (prediction.status === 'processing') {
              dispatch(updateProgress({ 
                progress: Math.min(40 + retries * 5, 95), 
                status: 'Replicate is rendering video frames...' 
              }));
            }
          }

          if (!completed) {
            throw new Error('Replicate video generation timed out.');
          }

          const videoUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
          dispatch(updateProgress({ progress: 100, status: 'Completed!' }));

          return {
            id: `gen-${Date.now()}`,
            type: 'video',
            prompt,
            ratio,
            model,
            url: videoUrl,
            timestamp: Date.now(),
            isFavorite: false,
            style
          };
        }
      } catch (err: any) {
        return rejectWithValue(err.message || 'API request failed');
      }
    }
  }
);

const generationSlice = createSlice({
  name: 'generation',
  initialState,
  reducers: {
    setApiKeys: (state, action: PayloadAction<Partial<ApiKeys>>) => {
      state.apiKeys = { ...state.apiKeys, ...action.payload };
    },
    toggleMockMode: (state) => {
      state.useMockMode = !state.useMockMode;
    },
    updateProgress: (state, action: PayloadAction<{ progress: number; status: string }>) => {
      state.currentProgress = action.payload.progress;
      state.currentStatus = action.payload.status;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const item = state.history.find(x => x.id === action.payload);
      if (item) {
        item.isFavorite = !item.isFavorite;
      }
      if (state.latestGeneration?.id === action.payload) {
        state.latestGeneration.isFavorite = !state.latestGeneration.isFavorite;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(x => x.id !== action.payload);
      if (state.latestGeneration?.id === action.payload) {
        state.latestGeneration = null;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    resetProgress: (state) => {
      state.currentProgress = 0;
      state.currentStatus = '';
      state.isGenerating = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateMedia.pending, (state) => {
        state.isGenerating = true;
        state.currentProgress = 0;
        state.currentStatus = 'Connecting to server...';
        state.error = null;
        state.latestGeneration = null;
      })
      .addCase(generateMedia.fulfilled, (state, action: PayloadAction<GenerationItem>) => {
        state.isGenerating = false;
        state.history.unshift(action.payload);
        state.latestGeneration = action.payload;
      })
      .addCase(generateMedia.rejected, (state, action) => {
        state.isGenerating = false;
        state.error = action.payload as string || 'An unexpected error occurred';
      });
  }
});

export const { 
  setApiKeys, 
  toggleMockMode, 
  updateProgress, 
  toggleFavorite, 
  deleteItem, 
  clearError,
  resetProgress
} = generationSlice.actions;

export default generationSlice.reducer;

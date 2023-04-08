import { HeroSectionData } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AboutUsState {
  heroData: HeroSectionData;
}

const initialState = {
  heroData: {} as HeroSectionData,
};

const AboutUsSlice = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {
    setHeroData(state, action: PayloadAction<AboutUsState>) {
      state.heroData = action?.payload?.heroData;
    },
  },
});

const { actions, reducer } = AboutUsSlice;
export const { setHeroData } = actions;
export default reducer;

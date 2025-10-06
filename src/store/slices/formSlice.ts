import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  step: number;
  data: {
    [key: string]: any;
  };
}
const savedFormData = localStorage.getItem('formData');
const initialState: FormState = {
  step: 1,
  data: savedFormData
    ? JSON.parse(savedFormData)
    : {
        basic: {
          fullName: '',
          username: '',
          email: '',
          mobile: '',
          gender: '',
          country: '',
        },
        address: {
          line1: '',
          line2: '',
          landmark: '',
          zip: '',
          state: '',
          city: '',
        },
        profile: {
          bio: '',
          dob: '',
          picture: null,
          pictureUrl: '',
          previewUrl: '',
        },
      },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    updateForm: (state, action: PayloadAction<Record<string, any>>) => {
      state.data = { ...state.data, ...action.payload };
      localStorage.setItem('formData', JSON.stringify(state.data));
    },
    resetForm: (state) => {
      state.step = 1;
      state.data = {};
      localStorage.removeItem('formData');
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
  },
});

export const { nextStep, prevStep, updateForm, resetForm, setStep } = formSlice.actions;
export default formSlice.reducer;

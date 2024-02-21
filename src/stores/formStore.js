import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
  state: () => ({
    formData: {
      gender: '',
      name: '',
      firstname: '',
      reason: '',
      startDate: '',
      endDate: '',
    },
  }),
});

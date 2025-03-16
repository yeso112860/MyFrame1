export const apiBaseURL: string = import.meta.env.DEV ? 'api' : import.meta.env.VITE_BACKEND_BASE_URL;
export const rowsPerPageOptions = [10, 20, 50, 100];
export const defaultRows = 10;
export const defaultStaleTime = 3000;
export const envConfig = {
  apiKey:
    (import.meta.env.REACT_APP_API_TOKEN as string) ||
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGYxN2MwMDdjOTI3YjAyZDA0ZWIzYWYxMDk2OTliNSIsInN1YiI6IjY0ZGNhZmViYTNiNWU2MDEzOTAwMGI0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5sKZrDPqMWmURhfPXDUolWrFglhq87ZgNaLCAifL-ig",
  baseUrl: "https://api.themoviedb.org/3",
};

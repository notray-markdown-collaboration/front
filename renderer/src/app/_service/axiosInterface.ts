import axios from "axios";
import useAuthStore from "app/_store/useAuthStore";
const { refreshToken, setAccessToken } = useAuthStore();

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const originalRequest = err.config;

      // refreshToken으로 재발급 요청
      const accessToken = await refreshAccessToken();
      setAccessToken(accessToken);
      // Authorization 헤더 교체 후 재요청
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axios(originalRequest); // 재요청
    }
    return Promise.reject(err);
  }
);

const refreshAccessToken = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_KEY}/api/auth/refresh`,
    {
      refreshToken: refreshToken,
    }
  );

  return res.data.refreshToken;
};

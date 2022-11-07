import axios, { AxiosRequestConfig } from "axios";

export type SignUpInRequest = {
  email: string;
  password: string;
};

export type SignUpInResponse = {
  data?: SignUpInResponseData;
  message: string;
};

type SignUpInResponseData = {
  id: number;
  email: string;
  password: string;
  groupID: number;
};

export type GetRoomListResponse = {
  data?: GetRoomListResponseData[];
  message: string;
};

export type GetRoomListResponseData = {
  id: number;
  groupID: number;
  name: string;
};

const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export async function signUp(
  request: SignUpInRequest
): Promise<SignUpInResponse> {
  try {
    const { data } = await axios.post<SignUpInResponse>(
      `${API_ORIGIN}/signup`,
      { email: request.email, password: request.password },
      config
    );
    return data;
  } catch (error: unknown) {
    let errorMessage;
    if (axios.isAxiosError(error)) {
      errorMessage = "[Error]: " + error.message;
    } else {
      errorMessage = "[Error]: Failed to call signup API, " + error;
    }
    return { message: errorMessage };
  }
}

export async function signIn(
  request: SignUpInRequest
): Promise<SignUpInResponse> {
  try {
    const { data } = await axios.post<SignUpInResponse>(
      `${API_ORIGIN}/login`,
      { email: request.email, password: request.password },
      config
    );
    return data;
  } catch (error: unknown) {
    let errorMessage;
    if (axios.isAxiosError(error)) {
      errorMessage = "[Error]: " + error.message;
    } else {
      errorMessage = "[Error]: Failed to call login API, " + error;
    }
    return { message: errorMessage };
  }
}

export async function getRoomList(): Promise<GetRoomListResponse> {
  try {
    const { data } = await axios.get<GetRoomListResponse>(
      `${API_ORIGIN}/groups`
    );
    return data;
  } catch (error: unknown) {
    let errorMessage;
    if (axios.isAxiosError(error)) {
      errorMessage = "[Error]: " + error.message;
    } else {
      errorMessage = "[Error]: Failed to call get room list API, " + error;
    }
    return { message: errorMessage };
  }
}

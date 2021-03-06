import { createAsyncThunk } from "@reduxjs/toolkit";

import { IHook } from "./hook.types";
import { api } from "services/api.service";

interface ICreateHookPayload {
  name: string;
  content: string;
  conceptId: string;
  position: number;
}
interface ICreateHookResponse {
  status: string;
  data: {
    hook: IHook;
  };
}
export const createHook = createAsyncThunk(
  "hook/createHook",
  async function (payload: ICreateHookPayload, thunkAPI) {
    const { conceptId, content, position, name } = payload;

    try {
      const res = await api.post<ICreateHookResponse>(`/concepts/${conceptId}/hooks`, {
        content,
        position,
        name,
      });
      const createdHook = res.data.data.hook;

      return { hook: createdHook, conceptId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IGetHooksResponse {
  status: string;
  data: {
    hooks: IHook[];
  };
}
export const getHooks = createAsyncThunk(
  "hook/getHooks",
  async function (conceptId: string, thunkAPI) {
    try {
      const response = await api.get<IGetHooksResponse>(`/concepts/${conceptId}/hooks`);
      const { hooks } = response.data.data;

      return { hooks, conceptId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateHookPayload {
  conceptId: string;
  hookId: string;
  updates: {
    name?: string;
    content?: string;
  }
}
export const updateHook = createAsyncThunk(
  "hook/updateHook",
  async function (payload: IUpdateHookPayload, thunkAPI) {
    const { conceptId, hookId, updates } = payload;

    try {
      await api.patch(`/concepts/${conceptId}/hooks/${hookId}`, { ...updates });
      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateHookPosition {
  conceptId: string;
  hookId: string;
  newPosition: number;
}
export const updateHookPosition = createAsyncThunk(
  "hook/updateHookPosition",
  async function (payload: IUpdateHookPosition, thunkAPI) {
    const { conceptId, hookId, newPosition } = payload;

    try {
      await api.patch(`/concepts/${conceptId}/hooks/${hookId}`, { position: newPosition });
    } catch(err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)

interface IDeleteHookPayload {
  conceptId: string;
  hookId: string;
}
export const deleteHook = createAsyncThunk(
  "hook/deleteHook",
  async function (payload: IDeleteHookPayload, thunkAPI) {
    const { conceptId, hookId } = payload;

    try {
      await api.delete(`/concepts/${conceptId}/hooks/${hookId}`);
      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

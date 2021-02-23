import { createAsyncThunk } from "@reduxjs/toolkit";

import { IConcept, IConceptLink } from "./concept.types";
import { api } from "services/api.service";
import { showAndHideAlert } from "alert/redux/alert.thunks";

interface IGetConceptResponse {
  status: string;
  data: {
    concept: IConcept;
  };
}
export const getConcept = createAsyncThunk(
  "concept/getConcept",
  async function (conceptId: string, thunkAPI) {
    try {
      const res = await api.get<IGetConceptResponse>(
        `/concepts/${conceptId}?tags`
      );
      return res.data.data.concept;
    } catch (err) {
      thunkAPI.dispatch(
        showAndHideAlert({
          type: "error",
          message: "Failed to find concept with that ID",
        })
      );
      return thunkAPI.rejectWithValue(err);
     }
  }
);
interface IGetConceptsResponse {
  status: string;
  data: {
    concepts: IConcept[];
  };
}
export const getConcepts = createAsyncThunk(
  "concept/getConcepts",
  async function (_, thunkAPI) {
    try {
      const res = await api.get<IGetConceptsResponse>("/concepts?tags");
      const { concepts } = res.data.data;

      return concepts;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface ICreateConceptPayload {
  name: string;
  tags: string[];
}
interface ICreateConceptResponse {
  status: string;
  data: {
    concept: IConcept;
  };
}
export const createConcept = createAsyncThunk(
  "concept/createConcept",
  async function (payload: ICreateConceptPayload, thunkAPI) {
    try {
      const res = await api.post<ICreateConceptResponse>("/concepts/", payload);
      let createdConcept = res.data.data.concept;
      
      if (!createdConcept.tags) createdConcept.tags = [];

      createdConcept.hooks = [];
      createdConcept.links = [];

      return createdConcept;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IUpdateConceptPayload {
  id: string;
  name: string;
  tags: string[];
}
export const updateConcept = createAsyncThunk(
  "concept/updateConcept",
  async function (data: IUpdateConceptPayload, thunkAPI) {
    try {
      await api.patch(`/concepts/${data.id}`, {
        name: data.name,
        tags: data.tags,
      });
      return {
        id: data.id,
        updates: {
          name: data.name,
          tags: data.tags,
        }
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteConcept = createAsyncThunk(
  "concept/deleteConcept",
  async function (id: string, thunkAPI) {
    try {
      await api.delete(`/concepts/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IDeleteTagFromConceptPayload {
  conceptId: string;
  tagName: string;
}
export const deleteTagFromConcept = createAsyncThunk(
  "concept/deleteTagFromConcept",
  async function (payload: IDeleteTagFromConceptPayload, thunkAPI) {
    const { conceptId, tagName } = payload;
    try {
      await api.delete(`/concepts/${conceptId}/tags/${tagName}`);
      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

interface IGetConceptLinksResponse {
  status: string;
  data: {
    conceptLinks: IConceptLink[];
  };
}
export const getConceptLinks = createAsyncThunk(
  "concept/getConceptLinks",
  async function (conceptId: string, thunkAPI) {
    try {
      const response = await api.get<IGetConceptLinksResponse>(`/concepts/${conceptId}/links`);
      return response.data.data.conceptLinks;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)

export interface IDeleteConceptLinkPayload {
  conceptId: string;
  linkId: string;
}
export const deleteConceptLink = createAsyncThunk(
  "concept/deleteConceptLink",
  async function (payload: IDeleteConceptLinkPayload, thunkAPI) {
    const { linkId } = payload;

    try {
      await api.delete(`/concepts/links/${linkId}`);
      return payload;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
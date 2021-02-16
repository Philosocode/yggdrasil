import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";

import { LoginPage } from "../../auth/pages/login.page";
import { LibraryPage } from "library/pages/library.page";
import { LibraryDetailPage } from "../../library/pages/library-detail.page";
import { ConceptDetailPage } from "concept/pages/concept-detail.page";
import { ConceptsPage } from "concept/pages/concepts.page";
import { MaterialsPage } from "../../pages/materials.page";
import { MaterialDetailPage } from "../../pages/material-detail.page";
import { PartDetailPage } from "../../pages/part-detail.page";
import { PracticePage } from "../../pages/practice.page";
import { SettingsPage } from "../../pages/settings.page";
import { CreateHookPage } from "hook/pages/create-hook.page";

interface IAppRoute<T = {}> {
  component: FC<T>;
  path: string;
  isPrivate?: boolean;
}

const login: IAppRoute = {
  component: LoginPage,
  path: "/login",
};

const library: IAppRoute = {
  component: LibraryPage,
  path: "/library",
};

const libraryDetail: IAppRoute = {
  component: LibraryDetailPage,
  path: "/library/:page",
};

const concepts: IAppRoute = {
  component: ConceptsPage,
  path: "/concepts",
  isPrivate: true,
};

const conceptDetail: IAppRoute<RouteComponentProps> = {
  component: ConceptDetailPage,
  path: "/concepts/:conceptId",
  isPrivate: true,
};

const hookCreate: IAppRoute = {
  component: CreateHookPage,
  path: "/concepts/:conceptId/hooks/create",
  isPrivate: true,
};

const materials: IAppRoute = {
  component: MaterialsPage,
  path: "/materials",
  isPrivate: true,
};

const materialDetail: IAppRoute = {
  component: MaterialDetailPage,
  path: "/materials/:materialId",
  isPrivate: true,
};

const partDetail: IAppRoute = {
  component: PartDetailPage,
  path: "/part/:partId",
  isPrivate: true,
};

const practice: IAppRoute = {
  component: PracticePage,
  path: "/practice",
  isPrivate: true,
};

const settings: IAppRoute = {
  component: SettingsPage,
  path: "/settings",
  isPrivate: true,
};

export const appRoutes = [
  login,
  library,
  libraryDetail,
  hookCreate,
  concepts,
  conceptDetail,
  materials,
  materialDetail,
  partDetail,
  practice,
  settings,
];

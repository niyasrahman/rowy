import { lazy } from "react";
import { IFieldConfig, FieldType } from "components/fields/types";
import withHeavyCell from "../_withTableCell/withHeavyCell";

import UserIcon from "@mui/icons-material/PersonOutlined";
import BasicCell from "../_BasicCell/BasicCellNull";
import withSideDrawerEditor from "components/Table/editors/withSideDrawerEditor";

const TableCell = lazy(
  () => import("./TableCell" /* webpackChunkName: "TableCell-User" */)
);
const SideDrawerField = lazy(
  () =>
    import("./SideDrawerField" /* webpackChunkName: "SideDrawerField-User" */)
);

export const config: IFieldConfig = {
  type: FieldType.user,
  name: "User",
  group: "Metadata",
  dataType:
    "{ displayName: string; email: string; emailVerified: boolean; isAnonymous: boolean; photoURL: string; timestamp: firebase.firestore.Timestamp; uid: string; }",
  initialValue: null,
  icon: <UserIcon />,
  description:
    "Displays user & timestamp. Supports the _createdBy and _updatedBy fields, which are automatically set when a row is created or updated. Read-only.",
  TableCell: withHeavyCell(BasicCell, TableCell),
  TableEditor: withSideDrawerEditor(TableCell),
  SideDrawerField,
};
export default config;

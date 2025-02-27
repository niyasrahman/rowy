import { lazy } from "react";
import { IFieldConfig, FieldType } from "components/fields/types";
import withBasicCell from "../_withTableCell/withBasicCell";

import ShortTextIcon from "@mui/icons-material/ShortText";
import BasicCell from "../_BasicCell/BasicCellValue";
import TextEditor from "components/Table/editors/TextEditor";

const SideDrawerField = lazy(
  () =>
    import(
      "./SideDrawerField" /* webpackChunkName: "SideDrawerField-ShortText" */
    )
);
const Settings = lazy(
  () => import("./Settings" /* webpackChunkName: "Settings-ShortText" */)
);

export const config: IFieldConfig = {
  type: FieldType.shortText,
  name: "Short Text",
  group: "Text",
  dataType: "string",
  initialValue: "",
  initializable: true,
  icon: <ShortTextIcon />,
  description: "Text displayed on a single line.",
  TableCell: withBasicCell(BasicCell),
  TableEditor: TextEditor,
  SideDrawerField,
  settings: Settings,
};
export default config;

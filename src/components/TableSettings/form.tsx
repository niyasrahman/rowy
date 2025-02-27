import { Field, FieldType } from "@rowy/form-builder";
import { TableSettingsDialogModes } from "./index";

import { Link, Typography } from "@mui/material";
import OpenInNewIcon from "components/InlineOpenInNewIcon";
import WarningIcon from "@mui/icons-material/WarningAmber";

import { WIKI_LINKS } from "constants/externalLinks";
import { name } from "@root/package.json";

export const tableSettings = (
  mode: TableSettingsDialogModes | null,
  roles: string[] | undefined,
  sections: string[] | undefined,
  tables: { label: string; value: any }[] | undefined,
  collections: string[]
): Field[] =>
  [
    {
      type: FieldType.shortText,
      name: "name",
      label: "Table name",
      required: true,
      assistiveText: "User-facing name for this table",
      autoFocus: true,
      gridCols: { xs: 12, sm: 6 },
    },
    {
      type: "camelCaseId",
      name: "id",
      label: "Table ID",
      required: true,
      watchedField: "name",
      assistiveText: `Unique ID for this table used to store configuration. Cannot be edited ${
        mode === TableSettingsDialogModes.create ? " later" : ""
      }.`,
      disabled: mode === TableSettingsDialogModes.update,
      gridCols: { xs: 12, sm: 6 },
    },
    {
      type: FieldType.singleSelect,
      name: "collection",
      label: "Collection",
      labelPlural: "collections",
      options: collections,
      itemRenderer: (option) => <code key={option.value}>{option.label}</code>,
      freeText: true,
      required: true,
      assistiveText: (
        <>
          {mode === TableSettingsDialogModes.update ? (
            <>
              <WarningIcon
                color="warning"
                sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
              />
              You change which Firestore collection to display. Data in the new
              collection must be compatible with the existing columns.
            </>
          ) : (
            "Choose which Firestore collection to display."
          )}{" "}
          <Link
            href={`https://console.firebase.google.com/project/_/firestore/data`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Your collections
            <OpenInNewIcon />
          </Link>
        </>
      ),
      AddButtonProps: {
        children: "Add collection",
      },
      AddDialogProps: {
        title: "Add collection",
        textFieldLabel: (
          <>
            Collection name
            <Typography variant="caption" display="block">
              (Collection won’t be created until you add a row)
            </Typography>
          </>
        ),
      },
      TextFieldProps: {
        sx: { "& .MuiInputBase-input": { fontFamily: "mono" } },
      },
      gridCols: { xs: 12, sm: 6 },
    },
    {
      type: FieldType.singleSelect,
      name: "tableType",
      label: "Table type",
      defaultValue: "primaryCollection",
      options: [
        {
          label: (
            <div>
              Primary collection
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{
                  width: 240,
                  whiteSpace: "normal",
                  ".MuiSelect-select &": { display: "none" },
                }}
              >
                Connect this table to the <b>single collection</b> matching the
                collection name entered above
              </Typography>
            </div>
          ),
          value: "primaryCollection",
        },
        {
          label: (
            <div>
              Collection group
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{
                  width: 240,
                  whiteSpace: "normal",
                  ".MuiSelect-select &": { display: "none" },
                }}
              >
                Connect this table to <b>all collections and subcollections</b>{" "}
                matching the collection name entered above
              </Typography>
            </div>
          ),
          value: "collectionGroup",
        },
      ],
      required: true,
      disabled: mode === TableSettingsDialogModes.update,
      assistiveText: (
        <>
          Cannot be edited
          {mode === TableSettingsDialogModes.create && " later"}.{" "}
          <Link
            href="https://firebase.googleblog.com/2019/06/understanding-collection-group-queries.html"
            target="_blank"
            rel="noopener noreferrer"
            display="block"
          >
            Learn more about collection groups
            <OpenInNewIcon />
          </Link>
        </>
      ),
      gridCols: { xs: 12, sm: 6 },
    },

    {
      type: FieldType.contentSubHeader,
      name: "_contentSubHeader_userFacing",
      label: "Display",
    },
    {
      type: FieldType.singleSelect,
      name: "section",
      label: "Section (optional)",
      labelPlural: "sections",
      freeText: true,
      options: sections,
      required: false,
      gridCols: { xs: 12, sm: 6 },
    },
    {
      type: FieldType.paragraph,
      name: "description",
      label: "Description (optional)",
      gridCols: { xs: 12, sm: 6 },
      minRows: 1,
    },

    {
      type: FieldType.contentSubHeader,
      name: "_contentSubHeader_admin",
      label: "Admin",
    },
    {
      type: FieldType.multiSelect,
      name: "roles",
      label: "Accessed by",
      labelPlural: "roles",
      options: roles ?? [],
      defaultValue: ["ADMIN"],
      required: true,
      freeText: true,
    },
    {
      type: FieldType.contentParagraph,
      name: "_contentParagraph_rules",
      label: (
        <>
          To enable access controls for this table, you must set the
          corresponding Firestore Security Rules.{" "}
          <Link
            href={WIKI_LINKS.setupRoles + "#table-rules"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ position: "relative", zIndex: 1 }}
          >
            Learn how to write rules
            <OpenInNewIcon />
          </Link>
        </>
      ),
    },
    {
      type: "suggestedRules",
      name: "_suggestedRules",
      label: "Suggested Firestore Rules",
      watchedField: "collection",
    },
    {
      type: FieldType.slider,
      name: "triggerDepth",
      defaultValue: 1,
      min: 1,
      max: 5,
      label: "Collection depth",
      displayCondition: "return values.tableType === 'collectionGroup'",
      assistiveText: (
        <>
          {name} Cloud Functions that rely on{" "}
          <Link
            href="https://firebase.google.com/docs/functions/firestore-events#function_triggers"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firestore triggers
          </Link>{" "}
          on this table require you to manually set the depth of this collection
          group.
          <br />
          <Link
            href="https://stackoverflow.com/questions/58186741/watch-a-collectiongroup-with-firestore-using-cloud-functions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about this requirement
            <OpenInNewIcon />
          </Link>
        </>
      ),
    },
    mode === TableSettingsDialogModes.create && tables && tables?.length !== 0
      ? {
          type: FieldType.singleSelect,
          name: "schemaSource",
          label: "Copy column config from existing table (optional)",
          labelPlural: "tables",
          options: tables,
          clearable: true,
          freeText: false,
          itemRenderer: (option: { value: string; label: string }) => (
            <>
              {option.label}{" "}
              <code style={{ marginLeft: "auto" }}>{option.value}</code>
            </>
          ),
        }
      : null,
  ].filter((field) => field !== null) as Field[];

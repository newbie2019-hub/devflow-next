'use client';
// InitializedMDXEditor.tsx
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  imagePlugin,
  diffSourcePlugin,
} from '@mdxeditor/editor';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { basicDark } from 'cm6-theme-basic-dark';
import { useTheme } from 'next-themes';
import type { ForwardedRef } from 'react';

import './dark-editor.css';
import '@mdxeditor/editor/style.css'; //import default styles

interface Props {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const Editor = ({ value, fieldChange, editorRef, ...props }: Props) => {
  const { resolvedTheme } = useTheme();

  const theme = resolvedTheme === 'dark' ? [basicDark] : [];

  return (
    <MDXEditor
      markdown={value}
      ref={editorRef}
      key={resolvedTheme}
      onChange={fieldChange}
      className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            css: 'css',
            sql: 'sql',
            txt: 'txt',
            html: 'html',
            saas: 'saas',
            scss: 'scss',
            bash: 'bash',
            json: 'json',
            js: 'javascript',
            ts: 'typescript',
            '': 'unspecified',
            tsx: 'TypeScript (React)',
            jsx: 'JavaScript (React)',
          },
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: theme,
        }),
        diffSourcePlugin({
          viewMode: 'rich-text',
          diffMarkdown: '',
        }),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === 'codeblock',
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />

                      <BoldItalicUnderlineToggles />
                      <Separator />

                      <ListsToggle />
                      <Separator />

                      <CreateLink />
                      <InsertImage />
                      <Separator />

                      <InsertTable />
                      <InsertThematicBreak />

                      <InsertCodeBlock />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
      {...props}
    />
  );
};

export default Editor;

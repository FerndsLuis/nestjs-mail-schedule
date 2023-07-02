import JoditEditor from 'jodit-react';

export function RichInput() {
  return (
    <JoditEditor
      value={'content'}
      config={{ readonly: false }}
      onChange={(newContent) => {}}
    />
  );
}

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface TextEditorProps {
  descriptionBody: any
  onChange: any
}

export const TextEditor = ({ descriptionBody, onChange }: TextEditorProps) => {
  const handleChange = (value: any) => {
    onChange(value)
  }

  return (
    <ReactQuill
      modules={EditorModules}
      formats={EditorFormats}
      onChange={handleChange}
      theme="snow"
      value={descriptionBody}
    />
  )
}

const EditorModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    // ["link"],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const EditorFormats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  // "link",
]

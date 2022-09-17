import { useState } from 'react'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { GoFileMedia } from 'react-icons/go'
import Stack from '@mui/material/Stack'

import { Card, Hrline, Title } from '../../../../common'
import toast from 'react-hot-toast'

export const AddTeam = ({ onSubmit }: any) => {
  const [teamName, setTeamName] = useState<string>()
  const [fileName, setFileName] = useState<any>()
  const [fileUri, setFileUri] = useState<any>(null)

  const onChange = (e: any) => {
    e.preventDefault()
    setTeamName(e.target.value)
  }

  const handleFile = (e: any) => {
    e.preventDefault()
    setFileName(e.target.files[0])
    setFileUri(URL.createObjectURL(e.target.files[0]))
  }

  const submitHandler = () => {
    if (teamName.length < 2)
      return toast.error('Please enter a valid team name')
    if (!fileName) return toast.error('File is required')
    else {
      const formData = new FormData()
      formData.append('team_name', teamName)
      formData.append('team_logo', fileName)
      onSubmit(formData)
    }
    setTeamName('')
    setFileName(null)
    setFileUri(null)
    return 1
  }
  return (
    <div style={{ width: '30%', marginBottom: 20 }}>
      <Card>
        <div>
          <Title>Add Team</Title>
          <Hrline gap={15} />
        </div>
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            id="outlined-basic"
            label="Team Name"
            variant="outlined"
            onChange={onChange}
            required
            value={teamName}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" onChange={handleFile} />
            <GoFileMedia />
          </IconButton>
          <Button variant="contained" onClick={submitHandler}>
            Submit
          </Button>
          {fileUri && <img src={fileUri} height={100} width={100} />}
        </Stack>
      </Card>
    </div>
  )
}

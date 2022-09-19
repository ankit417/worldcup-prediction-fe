import { useState } from 'react'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import { Card, Hrline, Title } from '../../../../../common'
import { toast } from 'react-hot-toast'

interface teamProps {
  id: number
  team_name: string
  team_logo: string
  created_at: Date
  updated_at: Date
}

export const AddMatch = ({ onSubmit, teams }: any) => {
  const [teamA, setTeamA] = useState<teamProps>()
  const [teamB, setTeamB] = useState<teamProps>()
  const submitHandler = () => {
    if (teamA && teamB) {
      if (teamA.id !== teamB.id) {
        const match = {
          teamA: teamA.id,
          teamB: teamB.id,
        }
        onSubmit(match)
        return 1
      } else {
        toast.error('Please Select different team')
      }
      return 0
    } else {
      toast.error('Please Select team')
      return 0
    }
  }
  const handleChange = (_event: any, value: any, team: string) => {
    if (team == 'teamA') {
      setTeamA(value)
    } else {
      setTeamB(value)
    }
  }
  return (
    <Card>
      <div>
        <Title>Add Match</Title>
        <Hrline gap={15} />
      </div>
      <div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={teams}
          sx={{ width: 300 }}
          getOptionLabel={(option: teamProps) => option.team_name}
          onChange={(_, value) => handleChange(_, value, 'teamA')}
          renderInput={(params) => <TextField {...params} label="Team A" />}
        />
        VS
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={teams}
          sx={{ width: 300 }}
          getOptionLabel={(option: teamProps) => option.team_name}
          onChange={(_event, value) => handleChange(_event, value, 'teamB')}
          renderInput={(params) => <TextField {...params} label="Team B" />}
        />
        <Button variant="contained" onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </Card>
  )
}

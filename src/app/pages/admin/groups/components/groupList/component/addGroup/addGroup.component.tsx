import { useState } from 'react'
import { Modal } from 'react-uicomp'
import { useFormInput } from 'use-form-input'
import { AiFillCloseCircle } from 'react-icons/ai'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import {
  Box,
  Button,
  FormInput,
  Hrline,
  InputField,
  Title,
} from '../../../../../../../common'

const AddGroup = ({ visible, onClose, onSubmit }: any) => {
  const [showTeamInput, setTeamInput] = useState<boolean>(false)
  const [data, { onChange, clear }] = useFormInput({
    name: '',
    point: '',
    isFinal: false,
    user_select: false,
    number_of_team: 0,
  })
  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    const { name, point, isFinal, user_select, number_of_team } = data
    const requestBody = {
      name,
      point,
      isFinal,
      user_select,
      number_of_team,
    }

    onSubmit(requestBody)
    clear()
  }

  // useEffect(() => {
  //   if (data?.user_select) {
  //     setTeamInput(true)
  //   } else {
  //     setTeamInput(false)
  //   }
  // }, [data?.user_select])

  console.log('user select', data?.user_select, showTeamInput)

  return (
    <Modal visible={visible}>
      <div>
        <div className="addTournament-title-wrapper">
          <Title>Add Group</Title>
          <AiFillCloseCircle
            size={24}
            className="addTournament-close-button"
            onClick={onClose}
          />
        </div>
        <Hrline />
        <div>
          <form onSubmit={onSubmitHandler}>
            <Box flexBox vertical columnGap={20}>
              <FormInput label="Tournament Name" required>
                <InputField
                  placeholder="Group Name"
                  name="name"
                  value={data.name}
                  onChange={onChange}
                  type="text"
                  required
                />
              </FormInput>
              <FormInput label="Point Per Match" required>
                <InputField
                  placeholder="Point Per Match"
                  name="point"
                  value={data.point}
                  onChange={onChange}
                  type="number"
                  required
                />
              </FormInput>

              <FormInput label="Is this final ?" required>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="isFinal"
                  onChange={onChange}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormInput>

              <FormInput label="Team Selected By User?" required>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="user_select"
                  onChange={onChange}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                    onChange={() => setTeamInput(true)}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                    onChange={() => setTeamInput(false)}
                  />
                </RadioGroup>
              </FormInput>

              {showTeamInput && (
                <FormInput label="Number of Team" required>
                  <InputField
                    placeholder="Number of Team"
                    name="number_of_team"
                    value={data.number_of_team}
                    onChange={onChange}
                    type="number"
                    // step={1}
                    min={2}
                    required
                  />
                </FormInput>
              )}
              <Button title="Submit" type="submit" />
            </Box>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export { AddGroup }

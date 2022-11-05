import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-auth-navigation'
// import { BsPlusCircleFill } from 'react-icons/bs'
import { AiFillEdit, AiOutlineEye, AiFillDelete } from 'react-icons/ai'

import {
  getAllGroups,
  // addGroups,
  // deleteGroup,
  RootState,
  editTournament,
  getAllTournaments,
  deleteTournament,
} from '../../../../../../redux'
import { Box, Hrline, Table, Title } from '../../../../../common'
import { EditTournament } from '../tournament/component'
import { DeleteTournament } from '../deleteTournament.component'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'

const GroupList = ({ selectedTournament }: any) => {
  const [editTournamentVisible, setEditTournamentVisible] =
    useState<boolean>(false)

  const [deleteTournamentVisible, setDeleteTournamentVisible] =
    useState<boolean>(false)
  const {
    // params,
    navigation: { navigate },
  }: any = useNavigation()
  // const { tournamentId } = params
  const dispatch = useDispatch()
  const { groupLoading, groupList } = useSelector(
    (state: RootState) => state.group
  )
  useEffect(() => {
    dispatch(getAllGroups(selectedTournament?.id))
  }, [dispatch, selectedTournament])

  const handleEditTournamentModal = () => {
    setEditTournamentVisible((prev) => !prev)
  }

  const onEditTournament = (requestBody: any) => {
    dispatch(
      editTournament(selectedTournament.id, requestBody, () => {
        dispatch(getAllTournaments())
        setEditTournamentVisible(false)
      })
    )
  }

  const onDeleteTournament = () => {
    dispatch(
      deleteTournament(selectedTournament?.id, () => {
        // console.log('any call back here')
        dispatch(getAllTournaments())
        setDeleteTournamentVisible(false)
        window.location.reload()
      })
    )
  }

  return (
    <div className="tournament-group-wrapper">
      {/* {selectedTournament} */}
      {selectedTournament && (
        <div>
          <div className="group-tournament-header">
            <div className="title-wrapper">
              <Title>{selectedTournament?.tournament_name}</Title>
              <AiFillEdit
                size={24}
                color={'#465775'}
                className="edit-tournament"
                onClick={handleEditTournamentModal}
              />
            </div>
            <Box flexBox>
              <FormGroup>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Show to Users"
                />
              </FormGroup>
              <AiFillDelete
                size={24}
                color={'#EF6F6C'}
                className="add-tournament"
                onClick={
                  () => setDeleteTournamentVisible(true)
                  // navigate(`tournament/view/${selectedTournament?.id}`)
                }
              />
            </Box>
          </div>
          <Hrline />
          <div className="group-header-tournament-info">
            <div>
              Starting From : {selectedTournament?.starting_from.split('T')[0]}
            </div>
            <div>Ending At : {selectedTournament?.ending_at.split('T')[0]}</div>
            <div>
              Prediction Deadline :{' '}
              {selectedTournament?.prediction_deadline.split('T')[0]}
            </div>
          </div>
          <Hrline />
        </div>
      )}
      <EditTournament
        visible={editTournamentVisible}
        onClose={handleEditTournamentModal}
        onSubmit={onEditTournament}
        tournamentData={selectedTournament}
      />
      <DeleteTournament
        visible={deleteTournamentVisible}
        onClose={() => setDeleteTournamentVisible(false)}
        onSubmit={() => {
          onDeleteTournament()
        }}
      />
      <div>
        <div
          style={{
            marginTop: 10,
            marginBottom: 10,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Title>Groups</Title>
          <AiOutlineEye
            size={24}
            color={'#EF6F6C'}
            className="add-tournament"
            onClick={() =>
              navigate(`tournament/view/${selectedTournament?.id}`)
            }
          />
        </div>
        <Table
          columns={[
            {
              field: 'group_name',
              name: 'Name',
              render: (rowData: any) => rowData,
            },
            {
              field: 'match_point',
              name: 'Point per Game',
              render: (rowData: any) => rowData,
            },
            {
              field: 'is_final',
              name: 'Final',
              render: (rowData: any) => rowData,
            },
          ]}
          data={groupList}
          dataLoader={groupLoading}
          totalCount={groupList.length}
          // actions
          // onDeleteHandler={(data: any) => {
          //   //   toast.error(data?.id)
          //   console.log('delete handler data', data)
          //   // deleteHandler(data?.id)
          // }}
        />
      </div>
    </div>
  )
}

export { GroupList }

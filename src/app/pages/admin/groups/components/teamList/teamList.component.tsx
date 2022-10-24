import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-auth-navigation'

import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { BsPlusCircleFill } from 'react-icons/bs'

import {
  updateGroup,
  getAllGroups,
  getAllTieSheet,
} from '../../../../../../redux'
import { EditGroup } from '../groupList/component'
import { AddGame, AddTiesheet, EditGame, TieSheetTable } from './component'
import { RootState, getAllGame } from '../../../../../../redux'
import { Hrline, Title, Table } from '../../../../../common'

const TeamList = ({ selectedGroup }: any) => {
  console.log('Selected group', selectedGroup)
  const [editGroupVisible, setEditGroupVisible] = useState<boolean>(false)
  const [addGameModalVisible, setAddGameModalVisible] = useState<boolean>(false)
  const [editGameModalVisible, setEditGameModalVisible] =
    useState<boolean>(false)
  const [addTieSheetVisible, setAddTieSheetVisible] = useState<boolean>(false)

  const [editGameData, setEditGameData] = useState<any>()
  const { params }: any = useNavigation()
  const { tournamentId } = params

  const dispatch = useDispatch()
  const { gameLoading, gameList } = useSelector(
    (state: RootState) => state.game
  )

  useEffect(() => {
    if (selectedGroup) {
      dispatch(getAllGame(selectedGroup?.id))
    }
  }, [dispatch, selectedGroup])

  const handleEditGroupModal = () => {
    setEditGroupVisible((prev) => !prev)
  }
  const onEditGroup = (requestBody: any) => {
    console.log('request body', requestBody)
    if (requestBody) {
      requestBody.tournament_id = tournamentId
      dispatch(
        updateGroup(selectedGroup?.id, requestBody, () => {
          dispatch(getAllGroups(tournamentId))
          handleEditGroupModal()
        })
      )
    }
  }

  const handleAddGameModal = () => {
    setAddGameModalVisible((prev) => !prev)
  }

  const handleEditGameModal = () => {
    setEditGameModalVisible((prev) => !prev)
  }

  const handleAddTieSheetModal = () => {
    setAddTieSheetVisible((prev) => !prev)
    dispatch(getAllTieSheet(selectedGroup?.id))
  }

  console.log('selected group', selectedGroup)

  if (!selectedGroup) {
    return (
      <div>
        <Title>Please Select / Create New Group</Title>
      </div>
    )
  }
  return (
    <div className="group-team-wrapper">
      <div>
        <div className="group-team-header">
          <div className="title-wrapper">
            <Title>{selectedGroup?.group_name}</Title>
            <AiFillEdit
              size={24}
              className="edit-group"
              onClick={handleEditGroupModal}
            />
          </div>
          <div>
            <AiFillDelete
              size={24}
              color={'#EF6F6C'}
              className="delete-group"
              // onClick={handleEditGroupModal}
            />
          </div>
        </div>
        <Hrline />
        <div className="group-header-team-info">
          <div>Match Point: {selectedGroup?.match_point}</div>
          {selectedGroup?.user_select === 1 && (
            <div>Number of Teams: {selectedGroup?.number_of_team}</div>
          )}
        </div>
        <Hrline />
      </div>
      <EditGroup
        visible={editGroupVisible}
        onClose={handleEditGroupModal}
        onSubmit={onEditGroup}
        groupData={selectedGroup}
      />
      <AddGame
        visible={addGameModalVisible}
        onClose={handleAddGameModal}
        groupId={selectedGroup?.id}
      />
      <EditGame
        visible={editGameModalVisible}
        onClose={handleEditGameModal}
        groupId={selectedGroup?.id}
        gameData={editGameData}
      />
      <AddTiesheet
        visible={addTieSheetVisible}
        onClose={handleAddTieSheetModal}
        groupId={selectedGroup?.id}
      />
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Title>Teams</Title>
          <BsPlusCircleFill
            size={24}
            className="add-tournament"
            style={{ cursor: 'pointer' }}
            onClick={
              selectedGroup?.user_select == 1
                ? handleAddTieSheetModal
                : handleAddGameModal
            }
          />
        </div>
        {selectedGroup?.user_select == 1 ? (
          <TieSheetTable groupId={selectedGroup?.id} />
        ) : (
          <Table
            columns={[
              {
                field: 'teama_name',
                name: 'Team A Name',
                render: (rowData: any) => rowData,
              },
              {
                field: 'teamb_name',
                name: 'Team B Name',
                render: (rowData: any) => rowData,
              },
              {
                field: 'match_date',
                name: 'Match Date',
                render: (rowData: any) => rowData,
              },
            ]}
            data={gameList}
            dataLoader={gameLoading}
            totalCount={gameList.length}
            actions
            onEditHandler={(data: any) => {
              console.log('game data start', data)
              setEditGameData(data)
              handleEditGameModal()
              //console.log('data edit handler', data)
              //   setVisible(true)
              // if (data?.orders?.is_paid) {
              // } else navigate(`/order/${data?.orders?.id}/edit`)
            }}
            onDeleteHandler={(data: any) => {
              //   toast.error(data?.id)
              console.log('delete handler data', data)
              // deleteHandler(data?.id)
            }}
          />
        )}
      </div>
    </div>
  )
}
export { TeamList }

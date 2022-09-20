import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AiFillEdit } from 'react-icons/ai'
import { BsPlusCircleFill } from 'react-icons/bs'

import { RootState, getAllGame } from '../../../../../../redux'
import { Hrline, Title, Table } from '../../../../../common'

const TeamList = ({ selectedGroup, activeGroupIndex }: any) => {
  console.log(selectedGroup, activeGroupIndex)

  const dispatch = useDispatch()
  const { gameLoading, gameList } = useSelector(
    (state: RootState) => state.game
  )

  console.log('game loading', gameList)
  useEffect(() => {
    if (selectedGroup) {
      dispatch(getAllGame(selectedGroup?.id))
    }
  }, [dispatch, selectedGroup])

  return (
    <div className="group-team-wrapper">
      {/* <div>{activeGroupIndex}</div> */}
      <div>
        <div className="group-team-header">
          <div className="title-wrapper">
            <Title>Group Name</Title>
            <AiFillEdit
              size={24}
              className="edit-group"
              // onClick={handleEditTournamentModal}
            />
          </div>
          <BsPlusCircleFill
            size={24}
            className="add-tournament"
            //   onClick={() =>
            //     navigate(`tournament/view/${selectedTournament?.id}`)
            //   }
          />
        </div>
        <Hrline />
        <div className="group-header-team-info">
          <div>
            Starting From:
            {/* {selectedTournament?.starting_from.split('T')[0]} */}
          </div>
          <div>
            Ending At:
            {/* {selectedTournament?.ending_at.split('T')[0]} */}
          </div>
          <div>
            Prediction Deadline:
            {/* {selectedTournament?.prediction_deadline.split('T')[0]} */}
          </div>
        </div>
        <Hrline />
      </div>
      <div>
        <div>
          <Title>Teams</Title>
        </div>
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
            console.log('data', data)
            //   setVisible(true)
            // if (data?.orders?.is_paid) {
            // } else navigate(`/order/${data?.orders?.id}/edit`)
          }}
          onViewHandler={(data: any) => {
            console.log(data)
            // navigate(`view/${selectedTournament}/group/${data?.id}`)
          }}
          onDeleteHandler={(data: any) => {
            //   toast.error(data?.id)
            console.log('delete handler data', data)
            // deleteHandler(data?.id)
          }}
        />
      </div>
    </div>
  )
}
export { TeamList }

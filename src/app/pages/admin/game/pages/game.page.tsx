import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-auth-navigation'

import { getAllTeam, getAllGame, RootState } from '../../../../../redux'

import { CompWrapper, Table } from '../../../../common'
import { AddMatch } from './component'

export const GamePage = () => {
  const {
    params,
  }: // navigation: { navigate },
  any = useNavigation()
  const dispatch = useDispatch()
  const { teamList } = useSelector((state: RootState) => state.team)
  const { gameLoading, gameList } = useSelector(
    (state: RootState) => state.game
  )

  //console.log(teamLoading, gameLoading)
  //console.log(gameList)
  useEffect(() => {
    dispatch(getAllTeam())
    dispatch(getAllGame(params.groupId))
  }, [dispatch])

  const addMatchHandler = (match: any) => {
    console.log('form data', match)
    // dispatch(
    //   addTeam(formData, () => {
    //     dispatch(getAllTeam())
    //   })
    // )
  }

  return (
    <CompWrapper>
      <AddMatch onSubmit={addMatchHandler} teams={teamList} />
      <div>
        <Table
          columns={[
            {
              field: 'teamA_id',
              name: 'Team A Id',
              render: (rowData: any) => rowData,
            },
            {
              field: 'teamB_id',
              name: 'team B id',
              render: (rowData: any) => rowData,
            },
            {
              field: 'match_date',
              name: 'Match',
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
            // navigate(`view/${tournamentId}/group/${data?.id}`)
          }}
          onDeleteHandler={(data: any) => {
            // toast.error(data?.id)
            console.log('delete handler data', data)
            // deleteHandler(data?.id)
          }}
        />
      </div>
    </CompWrapper>
  )
}

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-auth-navigation'
import { toast } from 'react-hot-toast'

import { GroupList, TournamentList } from './components'
import { getAllTournaments, RootState } from '../../../../redux'
import { Card, CompWrapper, Table } from '../../../common'

const DATA = [
  {
    id: 1,
    name: 'Nepal',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1200px-Flag_of_Nepal.svg.png',
  },
  {
    id: 1,
    name: 'Nepal',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1200px-Flag_of_Nepal.svg.png',
  },
]

const Tournament = () => {
  const [initialTournamentId, setInitialTournamentId] = useState<number | null>(
    null
  )
  const {
    navigation: { navigate },
    // history,
  } = useNavigation()

  const dispatch = useDispatch()
  const { tournamentLoading, tournamentList } = useSelector(
    (state: RootState) => state.tournament
  )

  useEffect(() => {
    dispatch(getAllTournaments())
  }, [dispatch])

  const activeTournament = (tournamentId: number) => {
    setInitialTournamentId(tournamentId)
  }
  return (
    <CompWrapper>
      <div className="tournament-container">
        <Card containerStyle={{ width: '30%', marginRight: 20 }}>
          <div>
            <TournamentList onPress={activeTournament} />
          </div>
        </Card>
        <Card>
          <div>
            <GroupList selectedTournament={initialTournamentId} />
          </div>
        </Card>
      </div>

      {/* Remove this later */}
      <div>Tournament</div>
      <Table
        columns={[
          {
            field: 'tournament_name',
            name: 'Team Name',
            render: (rowData: any) => rowData,
          },
          {
            field: 'starting_from',
            name: 'Starts',
            render: (rowData: any) => rowData,
          },
          {
            field: 'ending_at',
            name: 'Ends',
            render: (rowData: any) => rowData,
          },
          {
            field: 'prediction_deadline',
            name: 'Prediction Deadline',
            render: (rowData: any) => rowData,
          },
        ]}
        data={tournamentList}
        dataLoader={tournamentLoading}
        totalCount={DATA.length}
        actions
        onEditHandler={(data: any) => {
          // if (data?.orders?.is_paid) {
          toast.error(data?.id)
          // } else navigate(`/order/${data?.orders?.id}/edit`)
        }}
        onViewHandler={(data: any) => {
          //   console.log(data)
          navigate(`/tournament/${data?.id}`)
        }}
      />
    </CompWrapper>
  )
}

export { Tournament }

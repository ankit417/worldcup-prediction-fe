import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'react-auth-navigation'
import { toast } from 'react-hot-toast'

import { getAllTournaments, RootState } from '../../../../redux'
import { CompWrapper, Table } from '../../../common'

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
  return (
    <CompWrapper>
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

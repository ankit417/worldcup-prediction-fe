import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllPrediction, RootState } from '../../../../redux'
import { Card, CompWrapper, Table } from '../../../common'
import { TournamentList } from '../tournament/components'

const Predictions = () => {
  const [initialTournament, setInitialTournament] = useState<
    number | null | any
  >(null)

  const [activeTournamentIndex, setActiveTournamentIndex] = useState<number>(0)

  const dispatch = useDispatch()
  const { predictionLoading, predictionList } = useSelector(
    (state: RootState) => state.prediction
  )

  useEffect(() => {
    if (initialTournament?.id) {
      dispatch(getAllPrediction(initialTournament?.id))
    }
  }, [initialTournament])

  const activeTournament = (tournament: any, index: number) => {
    setInitialTournament(tournament)
    setActiveTournamentIndex(index)
  }

  console.log('initial tournament prediction', initialTournament)
  return (
    <CompWrapper>
      <div>
        <div>Predictions</div>
        <div style={{ display: 'flex' }}>
          <Card containerStyle={{ width: '20%', marginRight: 30 }}>
            <div>
              <TournamentList
                disableAdd={true}
                onPress={activeTournament}
                activeTournamentIndex={activeTournamentIndex}
              />
            </div>
          </Card>
          <Card>
            <Table
              columns={[
                {
                  field: 'full_name',
                  name: 'Full Name',
                  render: (rowData: any) => rowData,
                },
                {
                  field: 'email',
                  name: 'Email',
                  render: (rowData: any) => rowData,
                },
                {
                  field: 'finalPoint',
                  name: 'Point',
                  render: (rowData: any) => rowData,
                },
              ]}
              data={predictionList}
              dataLoader={predictionLoading}
              totalCount={predictionList.length}
              actions
            />
          </Card>
        </div>
      </div>
    </CompWrapper>
  )
}

export { Predictions }

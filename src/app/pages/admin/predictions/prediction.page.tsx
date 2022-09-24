import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllPrediction, RootState } from '../../../../redux'
import { CompWrapper, Table } from '../../../common'

const Predictions = () => {
  const dispatch = useDispatch()
  const { predictionLoading, predictionList } = useSelector(
    (state: RootState) => state.prediction
  )

  useEffect(() => {
    dispatch(getAllPrediction())
  }, [])

  return (
    <CompWrapper>
      <div>
        <div>Predictions</div>
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
      </div>
    </CompWrapper>
  )
}

export { Predictions }

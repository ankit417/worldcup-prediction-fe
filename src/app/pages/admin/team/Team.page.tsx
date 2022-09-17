import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigation } from 'react-auth-navigation'

import { getAllTeam, deleteTeam, RootState } from '../../../../redux'
import { FILE_URL } from '../../../../config'

import { CompWrapper, Table } from '../../../common'

const Team = () => {
  // const {
  //     params,
  //     navigation: { navigate },
  //   }: any = useNavigation()
  const dispatch = useDispatch()
  const { teamLoading, teamList } = useSelector(
    (state: RootState) => state.team
  )

  useEffect(() => {
    dispatch(getAllTeam())
  }, [dispatch])

  const deleteHandler = (teamId: number) => {
    dispatch(
      deleteTeam(teamId, () => {
        dispatch(getAllTeam())
      })
    )
  }

  return (
    <CompWrapper>
      <div>Team</div>

      <Table
        columns={[
          {
            field: 'team_name',
            name: 'Team Name',
            render: (rowData: any) => rowData,
          },
          {
            field: 'team_logo',
            name: 'Logo',
            render: (rowData: any) => (
              <>
                {/* <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 30,
                  }}
                /> */}
                <img src={FILE_URL + rowData} height={50} width={50} />
              </>
            ),
          },
        ]}
        data={teamList}
        dataLoader={teamLoading}
        totalCount={teamList.length}
        actions
        onEditHandler={(data: any) => {
          console.log(data)
          // if (data?.orders?.is_paid) {
          //   toast.error('Order already paid out!')
          // } else navigate(`/order/${data?.orders?.id}/edit`)
        }}
        onDeleteHandler={(data: any) => {
          deleteHandler(data?.id)
        }}
      />
    </CompWrapper>
  )
}

export { Team }

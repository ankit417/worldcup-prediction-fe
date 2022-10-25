import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigation } from 'react-auth-navigation'

import { getAllTeam, addTeam, deleteTeam, RootState } from '../../../../redux'
import { FILE_URL } from '../../../../config'

import { CompWrapper, Table, Card } from '../../../common'
import { AddTeam } from './component'
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

  const addTeamHandler = (formData: any) => {
    //console.log('form data', formData)
    dispatch(
      addTeam(formData, () => {
        dispatch(getAllTeam())
      })
    )
  }
  return (
    <CompWrapper>
      <div className="create-team-wrapper">
        <Card containerStyle={{ width: '30%', marginRight: 20, height: 500 }}>
          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          > */}
          <AddTeam onSubmit={addTeamHandler} />
          {/* </div> */}
        </Card>
        <Card>
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
        </Card>
      </div>
    </CompWrapper>
  )
}

export { Team }

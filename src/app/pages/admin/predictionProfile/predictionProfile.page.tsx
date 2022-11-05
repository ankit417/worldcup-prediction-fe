// import { useEffect, useState } from 'react'
// import { useNavigation } from 'react-auth-navigation'
import { CompWrapper } from '../../../common'
import { UserProfile } from '../../../components'
export const PredictionProfile = () => {
  // const { params }: any = useNavigation()
  // const { tournamentId, userId } = params

  // console.log('tournament id user id', tournamentId, userId)
  return (
    <CompWrapper>
      <div>
        <UserProfile />
      </div>
    </CompWrapper>
  )
}

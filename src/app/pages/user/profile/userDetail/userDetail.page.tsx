import { Header } from '../../../../common'
import { UserProfile } from '../../../../components'
export const UserDetail = () => {
  return (
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      {/* <div>User Detail page</div> */}
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <UserProfile />
      </div>
    </div>
  )
}

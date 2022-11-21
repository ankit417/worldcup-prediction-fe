import { Header } from '../../../../common'
import { UserProfile } from '../../../../components'
export const UserDetail = () => {
  return (
    <div style={{ marginLeft: 20, marginRight: 20 }}>
      {/* <div>User Detail page</div> */}
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flex: 1,
          width: '100%',
        }}
      >
        <UserProfile />
      </div>
    </div>
  )
}

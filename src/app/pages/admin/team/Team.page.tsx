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
  {
    id: 1,
    name: 'Nepal',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/1200px-Flag_of_Nepal.svg.png',
  },
]

const Team = () => {
  return (
    <CompWrapper>
      <div>Team</div>

      <Table
        columns={[
          {
            field: 'name',
            name: 'Team Name',
            render: (rowData: any) => rowData,
          },
          {
            field: 'logo',
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
                <img src={rowData} height={50} width={50} />
              </>
            ),
          },
        ]}
        data={DATA}
        dataLoader={false}
        totalCount={DATA.length}
        actions
        onEditHandler={(data: any) => {
          console.log(data)
          // if (data?.orders?.is_paid) {
          //   toast.error('Order already paid out!')
          // } else navigate(`/order/${data?.orders?.id}/edit`)
        }}
        onViewHandler={(data: any) => {
          console.log(data)
          // navigate(`/order/${data?.orders?.id}/view`)
        }}
      />
    </CompWrapper>
  )
}

export { Team }

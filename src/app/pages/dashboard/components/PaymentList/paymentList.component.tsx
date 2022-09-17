import React, { useEffect } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import {
  a11yProps,
  mapPaymentMethod,
  mapStringToPayment,
} from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentList } from '../../../../../redux'
import { Box, Table, ToolTip } from '../../../../common'
import { formatPrice } from '../../../../../utils/formatPrice'
// import { FILE_URL } from '../../../../../config'
// import { colors } from '../../../../../modules'
import { ActiveLink, useNavigation, useQuery } from 'react-auth-navigation'
// import { mapService } from '../../util'
import { capitalizeFirstLetter } from '../../../../../utils'
// import { AiOutlineFundView } from 'react-icons/ai'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { GrView } from 'react-icons/gr'
import { colors } from '../../../../../modules'
import { getActionButtonUrl } from '../../util'
import { checkIfLessThanZero } from '../../../../../utils/checkIfLessThanZero'

interface PaymentListProp {
  startDate: string
  endDate: string
  type: string
  paymentMethod: string
  setPaymentMethod: any
}

export default function PaymentListComp(props: PaymentListProp) {
  // const [value, setValue] = useState(0)
  const { page }: any = useQuery()
  const {
    navigation: { navigate },
  } = useNavigation()
  const dispatch = useDispatch()
  const { paymentList, paymentListLoading, paymentListTotal } = useSelector(
    (state: any) => state.dashboard
  )

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate('/dashboard?page=1')
    props.setPaymentMethod(mapPaymentMethod[newValue])
  }

  useEffect(() => {
    dispatch(
      getPaymentList(
        props.startDate,
        props.endDate,
        props.type,
        props.paymentMethod,
        page
      )
    )
  }, [
    props.startDate,
    props.endDate,
    props.paymentMethod,
    props.type,
    dispatch,
    page,
  ])

  return (
    <Box>
      <Box>
        <Tabs
          value={mapStringToPayment[props.paymentMethod.toLowerCase()]}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Cash" {...a11yProps(1)} />
          <Tab label="Fonepay" {...a11yProps(2)} />
          <Tab label="Card" {...a11yProps(3)} />
        </Tabs>

        {/* PAYMENT LIST TABLE */}
        <Table
          columns={[
            {
              field: 'name',
              name: 'Name',
              render: (row: string) => capitalizeFirstLetter(row),
            },
            // {
            //   name: 'Service',
            //   render: () => <Chip>{mapService[props.type]}</Chip>,
            // },
            {
              field: 'payment_method',
              name: 'Payment method',
              render: (row: string) => row.toUpperCase(),
            },
            {
              field: 'total_price',
              name: 'Total Price',
              render: (row: any) => `Rs ${formatPrice(row)}`,
            },
            {
              name: 'Net Total',
              render: (_: any, item: any) =>
                `Rs ${formatPrice(
                  checkIfLessThanZero(
                    Number(item.total_price) -
                      Number(item.discount) -
                      Number(item.advance ?? 0)
                  )
                )}`,
            },

            {
              field: 'pdf',
              name: 'Actions',
              render: (row: any, item: any) => (
                <Box flexBox>
                  <ActiveLink
                    to={
                      getActionButtonUrl(props.type, {
                        id: item.id,
                        payload: '',
                      }).view
                    }
                  >
                    <ToolTip text="View details">
                      <GrView size={17} color={colors.light.black100} />
                    </ToolTip>
                  </ActiveLink>
                  <a
                    href={
                      getActionButtonUrl(props.type, {
                        id: item.id,
                        payload: row,
                      }).invoice
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ToolTip text="View invoice">
                      <FaFileInvoiceDollar
                        size={18}
                        color={colors.light.black200}
                      />
                    </ToolTip>
                  </a>
                </Box>
              ),
            },
          ]}
          data={paymentList}
          dataLoader={paymentListLoading}
          totalCount={paymentListTotal}
        />
      </Box>
    </Box>
  )
}

export const PaymentListComponent = React.memo(PaymentListComp)

// <a
//   href={`${FILE_URL}/${
//     props.type === 'orders' ? 'order' : 'room-booking'
//   }/${row}`}
//   target="_blank"
//   rel="noreferrer"
//   style={{
//     textDecoration: 'none',
//     color: colors.light.primary200,
//     fontWeight: 500,
//   }}
// >
//   View invoice
// </a>

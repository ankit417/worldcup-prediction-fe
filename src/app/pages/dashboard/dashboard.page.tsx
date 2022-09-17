import moment from 'moment'
import { ChangeEvent, useEffect, useState } from 'react'
import { useFormInput } from 'use-form-input'
import { colors } from '../../../modules'
import {
  CompWrapper,
  Title,
  Paragraph,
  Box,
  Card,
  FormInput,
  InputField,
  Image,
} from '../../common'
import salesIcon from '../../../assets/icons/sales.png'
import orderIcon from '../../../assets/icons/orders.png'
import { useDispatch, useSelector } from 'react-redux'
import { getLatestOrders, getTotalRevenue } from '../../../redux'
import { PieChartComponent } from './components/PieChart'
import { formatPrice } from '../../../utils/formatPrice'
import { LatestOrderComponent } from './components/latestOrderList'
import { LatestRoomBookingListComponent } from './components/latestRoomBookingList'
import { TYPE } from './util'

export function DashboardPage() {
  const [type, setType] = useState(TYPE.roomBooking)

  const [date, { setValue }] = useFormInput({
    from: moment().add(-30, 'days').format('YYYY-MM-DD'),
    to: moment().format('YYYY-MM-DD'),
  })
  const dispatch = useDispatch()
  const dashboard = useSelector((state: any) => state.dashboard)

  useEffect(() => {
    dispatch(getTotalRevenue(date.from, date.to))
    dispatch(getLatestOrders())
  }, [date, dispatch])

  const changeTypeHandler = (type: string) => {
    setType(type)
  }

  return (
    <CompWrapper>
      {/* <Title
        size="medium"
        style={{
          display: 'block',
          margin: '35px 0 10px 0',
          color: colors.light.black200,
        }}
      >
        Hello, User
      </Title>
      <Paragraph mb={10}>Take a look at your stats</Paragraph> */}

      <Box flexBox style={{ marginTop: 10 }}>
        <Box flex={2} alStart>
          {/* DATE AND TOTAL REVENUE SECTION */}
          <form
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box flexBox>
              <FormInput label="From" required>
                <InputField
                  placeholder="From"
                  name="from"
                  type="date"
                  value={moment(date.from).format('YYYY-MM-DD')}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setValue('from', e.target.value)
                    moment(date.to).isBefore(e.target.value) &&
                      setValue(
                        'to',
                        moment(e.target.value)
                          .add(2, 'days')
                          .format('YYYY-MM-DD')
                      )
                  }}
                  // min={moment().format('YYYY-MM-DD')}
                />
              </FormInput>
              <FormInput label="To" required>
                <InputField
                  placeholder="To"
                  name="to"
                  type="date"
                  value={moment(date.to).format('YYYY-MM-DD')}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    moment(date.from).isBefore(e.target.value) &&
                      setValue('to', e.target.value)
                  }}
                  min={
                    date.from
                      ? moment(date.from).add(1, 'days').format('YYYY-MM-DD')
                      : moment().format('YYYY-MM-DD')
                  }
                />
              </FormInput>
            </Box>

            {/* TAB BUTTONS */}
            <Box
              flexBox
              style={{
                border: '1px solid #e1e1e1',
                borderRadius: 4,
                alignSelf: 'flex-start',
              }}
              columnGap={0}
            >
              <Box
                style={{
                  borderRight: '1px solid #e1e1e1',
                  padding: '5px 10px',
                  paddingRight: 10,
                  cursor: 'pointer',
                  background:
                    type === 'room_booking' ? colors.light.primary300 : 'none',
                  color: type === 'room_booking' ? colors.light.white : 'black',
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                  fontSize: 14,
                  fontWeight: 700,
                }}
                onClick={() => changeTypeHandler('room_booking')}
              >
                Room booking
              </Box>
              <Box
                style={{
                  padding: '5px 10px',
                  cursor: 'pointer',
                  background:
                    type === TYPE.orders ? colors.light.primary300 : 'none',
                  color: type === TYPE.orders ? colors.light.white : 'black',
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                  fontSize: 14,
                  fontWeight: 700,
                }}
                onClick={() => changeTypeHandler('orders')}
              >
                Orders
              </Box>
            </Box>
          </form>

          <Box flexBox>
            <Card containerStyle={{ marginTop: 20 }}>
              <Box flexBox vertical alCenter>
                <Image
                  link={salesIcon}
                  style={{ height: 60, objectFit: 'contain' }}
                />

                <Title
                  style={{
                    color: colors.light.black200,
                    fontSize: 16,
                    alignSelf: 'flex-start',
                  }}
                >
                  {type === TYPE.roomBooking ? 'Booking' : 'Orders'} Revenue :
                  &nbsp;
                  <Paragraph style={{ fontSize: 18 }}>
                    Rs{' '}
                    {formatPrice(
                      type === TYPE.roomBooking
                        ? dashboard.bookingRevenue
                        : dashboard.orderRevenue
                    )}
                  </Paragraph>
                </Title>

                {/* TOTAL REVENUE */}
                <Title
                  style={{
                    alignSelf: 'flex-start',
                    color: colors.light.black200,
                    fontSize: 12,
                    marginTop: '-15px',
                  }}
                >
                  Total Revenue: &nbsp;
                  <Paragraph style={{ fontSize: 12 }}>
                    Rs {formatPrice(dashboard.totalRevenue)}
                  </Paragraph>
                </Title>
              </Box>
            </Card>
            <Card containerStyle={{ marginTop: 20 }}>
              <Box flexBox vertical alCenter>
                <Image
                  link={orderIcon}
                  style={{ height: 60, objectFit: 'contain' }}
                />

                <Title
                  size="medium"
                  style={{ color: colors.light.black200, fontSize: 16 }}
                >
                  Total {type === TYPE.roomBooking ? 'Bookings' : 'Orders'} :
                  &nbsp;
                  <Paragraph style={{ fontSize: 18 }}>
                    {formatPrice(
                      type === TYPE.roomBooking
                        ? dashboard.bookingCount
                        : dashboard.orderCount
                    )}
                  </Paragraph>
                </Title>
              </Box>
            </Card>
          </Box>

          {/* PIE CHART SECTION */}
          <Card containerStyle={{ marginTop: 20 }}>
            <PieChartComponent
              startDate={date.from}
              endDate={date.to}
              type={type}
            />
          </Card>
        </Box>

        {/* LATEST ORDERS SECTION */}
        <Box flex={1} flexBox vertical columnGap={20}>
          <LatestRoomBookingListComponent />
          <LatestOrderComponent />
        </Box>
      </Box>
    </CompWrapper>
  )
}

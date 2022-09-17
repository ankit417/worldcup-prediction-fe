import { Button } from '@mui/material'
import moment from 'moment'
import React, { useEffect } from 'react'
import { ActiveLink } from 'react-auth-navigation'
import {
  BsArrowBarRight,
  BsArrowRight,
  BsClockHistory,
  BsFillHouseDoorFill,
} from 'react-icons/bs'
import { FaBed } from 'react-icons/fa'
import { MdAttachMoney } from 'react-icons/md'

import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../../../../../modules'
import { getLatestRoomBookings } from '../../../../../redux'
import { chipStatus } from '../../../../../utils/chipStatus'
import { formatPrice } from '../../../../../utils/formatPrice'
import {
  ActivityIndicator,
  Box,
  Card,
  // Chip,
  Paragraph,
  Title,
} from '../../../../common'
import { Hr } from '../../../../common/hr/hr.generic'
import { CommonChip } from '../../../../components/commonChip'

function LatestRoomBookingListComp() {
  const dispatch = useDispatch()
  const { latestRoomBookingListLoading, latestRoomBookingList } = useSelector(
    (state: any) => state.dashboard
  )

  useEffect(() => {
    dispatch(getLatestRoomBookings())
  }, [dispatch])
  return (
    <Card noPadding>
      <Box p={20}>
        <Title style={{ color: colors.light.black200, fontSize: 16 }}>
          Latest Room Bookings
        </Title>
      </Box>
      <Hr />
      <Box
        style={{
          height: 450,
          padding: 20,
          overflowY: 'scroll',
          paddingTop: 0,
        }}
      >
        {<ActivityIndicator animating={latestRoomBookingListLoading} />}
        {!latestRoomBookingListLoading &&
          latestRoomBookingList.map((el: any) => {
            const startDate = moment(el.booking_detail.checkin)
            const endDate = moment(el.booking_detail.checkout)
            const diff = endDate.diff(startDate, 'days')
            console.log(diff)

            return (
              <Box key={el.booking_detail.id}>
                <Box pt={10} pb={10}>
                  {/* LEFT */}
                  <Box>
                    <Box>
                      {/* <Chip
                        style={{
                          background: el.booking_detail.is_active
                            ? colors.light.red100
                            : colors.light.orange,
                          marginLeft: 'auto',
                          display: 'block',
                          width: 'max-content',
                          marginBottom: 4,
                        }}
                      >
                        {el.booking_detail.is_active ? 'Active' : 'Advance'}
                      </Chip> */}
                      {el.booking_detail.is_active ? (
                        <CommonChip
                          style={{
                            marginLeft: 'auto',
                            display: 'block',
                            width: 'max-content',
                            marginBottom: 4,
                          }}
                          {...chipStatus.active}
                        />
                      ) : el.booking_detail.is_checked_out ? (
                        <CommonChip
                          style={{
                            marginLeft: 'auto',
                            display: 'block',
                            width: 'max-content',
                            marginBottom: 4,
                          }}
                          {...chipStatus.checkedOut}
                        />
                      ) : (
                        <CommonChip
                          style={{
                            marginLeft: 'auto',
                            display: 'block',
                            width: 'max-content',
                            marginBottom: 4,
                          }}
                          {...chipStatus.advance}
                        />
                      )}
                      <Title
                        style={{
                          fontSize: 14,
                          display: 'flex',
                          marginBottom: 10,
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}
                      >
                        <BsFillHouseDoorFill
                          style={{ marginBottom: 4, marginRight: 6 }}
                          color={colors.light.grey}
                        />
                        <Paragraph style={{ fontWeight: 800 }}>
                          Booked By : &nbsp;
                        </Paragraph>
                        <Paragraph style={{ fontSize: 13 }}>
                          {el.customer_detail.name}
                        </Paragraph>
                      </Title>

                      {/* <Chip
                        style={{
                          background: el.booking_detail.is_active
                            ? colors.light.red100
                            : '',
                        }}
                      >
                        {el.booking_detail.is_active ? 'Active' : 'Reserved'}
                      </Chip> */}
                    </Box>

                    <Title
                      style={{
                        fontSize: 14,
                        display: 'flex',
                        marginBottom: 10,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <FaBed
                        style={{ marginBottom: 4, marginRight: 6 }}
                        color={colors.light.grey}
                      />
                      <Paragraph style={{ fontWeight: 600, fontSize: 12 }}>
                        No. of Rooms : &nbsp;
                      </Paragraph>
                      <Paragraph style={{ fontSize: 13 }}>
                        {el.room_list.length}
                      </Paragraph>
                    </Title>
                    {/* <Paragraph
                      style={{
                        display: 'block',
                        marginBottom: 5,
                        marginLeft: 20,
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${
                            el.booking_detail.description ||
                            '<b>New room booked !!!</b>'
                          }`,
                        }}
                      />
                    </Paragraph> */}

                    <Box style={{ color: colors.light.black100 }}>
                      <Title
                        style={{
                          fontSize: 14,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          marginBottom: 6,
                        }}
                      >
                        <BsClockHistory
                          style={{ marginBottom: 4, marginRight: 6 }}
                          color={colors.light.grey}
                        />
                        <Paragraph style={{ fontWeight: 600, fontSize: 12 }}>
                          Booked for :&nbsp;
                        </Paragraph>
                        <Box flexBox vertical rowGap={1}>
                          <Paragraph>
                            {diff} {diff === 1 ? 'day' : 'days'}
                          </Paragraph>
                          <Paragraph style={{ fontSize: 12 }}>
                            ( {el.booking_detail.checkin} to{' '}
                            {el.booking_detail.checkout} )
                          </Paragraph>
                        </Box>
                      </Title>
                      {/* <Title
                        style={{
                          fontSize: 14,
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          color: colors.light.black200,
                        }}
                      >
                        <BsClockHistory
                          style={{ marginBottom: 4, marginRight: 6 }}
                          color={colors.light.grey}
                        />
                        <Paragraph style={{ fontWeight: 700, fontSize: 12 }}>
                          Checkout Date :&nbsp;
                        </Paragraph>

                        <Paragraph style={{ fontSize: 12 }}>
                          {el.booking_detail.checkout}
                        </Paragraph>
                      </Title> */}
                    </Box>

                    <Box flexBox jSpace alCenter style={{ marginTop: 10 }}>
                      <Title>
                        <Box
                          flexBox
                          alCenter
                          columnGap={6}
                          style={{ color: colors.light.black200 }}
                        >
                          <MdAttachMoney />
                          Rs {formatPrice(el.booking_detail.net_total)}
                        </Box>
                      </Title>
                      <ActiveLink
                        to={`/hotel/booking/${el.booking_detail.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button
                          color="secondary"
                          size="small"
                          style={{ textTransform: 'none' }}
                          variant="outlined"
                          endIcon={<BsArrowRight size={14} />}
                        >
                          View
                        </Button>
                      </ActiveLink>
                    </Box>
                  </Box>

                  {/* RIGHT */}
                  {/*<Paragraph style={{ width: 'max-content' }}>
                      Rs {formatPrice(el.booking_detail.total_price)}
												</Paragraph>*/}
                </Box>
                <Hr />
              </Box>
            )
          })}
      </Box>
      <Hr />
      <Box flexBox jCenter alCenter mt={20} mb={20}>
        {latestRoomBookingList.length !== 0 ? (
          <ActiveLink
            to="/hotel"
            style={{
              color: colors.light.primary300,
              textDecoration: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              fontSize: 14,
            }}
          >
            <p>View all bookings</p>

            <BsArrowBarRight />
          </ActiveLink>
        ) : (
          ''
        )}
      </Box>
    </Card>
  )
}

export const LatestRoomBookingListComponent = React.memo(
  LatestRoomBookingListComp
)

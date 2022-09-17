import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { ActiveLink } from 'react-auth-navigation'
import { BsArrowBarRight, BsArrowRight } from 'react-icons/bs'
import { MdAttachMoney, MdOutlineFastfood, MdPaid } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../../../../../modules'
import { getLatestOrders } from '../../../../../redux'
import { chipStatus } from '../../../../../utils/chipStatus'
import { formatPrice } from '../../../../../utils/formatPrice'
import {
  ActivityIndicator,
  Box,
  Card,
  Paragraph,
  Title,
} from '../../../../common'
import { Hr } from '../../../../common/hr/hr.generic'
import { CommonChip } from '../../../../components/commonChip'

function LatestOrderComp() {
  const dispatch = useDispatch()
  const dashboard = useSelector((state: any) => state.dashboard)

  useEffect(() => {
    dispatch(getLatestOrders())
  }, [dispatch])
  return (
    <Card noPadding>
      <Box p={20}>
        <Title style={{ color: colors.light.black200, fontSize: 16 }}>
          Latest Orders
        </Title>
      </Box>
      <Hr />
      <Box style={{ height: 390, padding: 20, overflowY: 'scroll' }}>
        {<ActivityIndicator animating={dashboard.latestOrderListLoading} />}
        {!dashboard.latestOrderListLoading &&
          dashboard.latestOrderList.map((el: any) => {
            return (
              <Box key={el.orders.id}>
                <Box pt={10} pb={10}>
                  <Box>
                    {/* TITLE */}
                    <Title
                      style={{
                        fontSize: 14,
                        display: 'flex',
                        marginBottom: 10,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <MdOutlineFastfood
                        style={{ marginBottom: 4, marginRight: 6 }}
                        color={colors.light.grey}
                      />
                      <Paragraph style={{ fontWeight: 600 }}>
                        Name : &nbsp;
                      </Paragraph>
                      <Paragraph style={{ fontSize: 13 }}>
                        {el.orders.name}
                      </Paragraph>
                    </Title>
                    {/* DESCRIPTION */}
                    <Paragraph
                      style={{
                        display: 'block',
                        marginBottom: 5,
                        marginLeft: 20,
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: el.orders.description,
                        }}
                      />
                    </Paragraph>
                    {/* PAID STATUS */}
                    <Title
                      style={{
                        fontSize: 14,
                        display: 'flex',
                        marginBottom: 10,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: 5,
                      }}
                    >
                      <MdPaid
                        style={{ marginBottom: 4, marginRight: 6 }}
                        color={colors.light.grey}
                      />
                      <Paragraph style={{ fontWeight: 600 }}>
                        Paid Status : &nbsp;
                      </Paragraph>
                      <Paragraph style={{ fontSize: 13 }}>
                        {/* <Chip
                          style={{
                            background: el.orders.is_paid
                              ? colors.light.green
                              : colors.light.red100,
                          }}
                        >
                          {el.orders.is_paid ? 'Paid' : 'Not Paid'}
                        </Chip> */}
                        {el.orders.is_paid ? (
                          <CommonChip {...chipStatus.paid} />
                        ) : (
                          <CommonChip {...chipStatus.notPaid} />
                        )}
                      </Paragraph>
                    </Title>
                    <Box flexBox jSpace alCenter style={{ marginTop: 10 }}>
                      <Title>
                        <Box
                          flexBox
                          alCenter
                          columnGap={6}
                          style={{ color: colors.light.black200 }}
                        >
                          <MdAttachMoney />
                          Rs {formatPrice(el.orders.net_total)}
                        </Box>
                      </Title>
                      <ActiveLink
                        to={`/order/${el.orders.id}/view`}
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
                  {/* <Paragraph style={{ display: 'block', fontWeight: 500 }}>
                      Rs {formatPrice(el.orders.total_price)}
                    </Paragraph> */}
                </Box>
                <Hr />
              </Box>
            )
          })}
      </Box>
      <Hr />
      <Box flexBox jCenter alCenter mt={20} mb={20}>
        {dashboard.latestOrderList.length !== 0 ? (
          <ActiveLink
            to="/order"
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
            <p>View all orders</p>

            <BsArrowBarRight />
          </ActiveLink>
        ) : (
          ''
        )}
      </Box>
    </Card>
  )
}

export const LatestOrderComponent = React.memo(LatestOrderComp)

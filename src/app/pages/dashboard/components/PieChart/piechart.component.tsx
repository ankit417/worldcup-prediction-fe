import { Box, Paragraph, Title } from '../../../../common'
import { PieChart, Pie, Cell } from 'recharts'
import React, { useEffect, useState } from 'react'
import { RenderActiveShape, data } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { getPayments } from '../../../../../redux'
import { colors } from '../../../../../modules'
import { PaymentListComponent } from '../PaymentList/paymentList.component'

interface PieChartProps {
  startDate: string
  endDate: string
  type: string
}

export function PieChartComp(props: PieChartProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const { type } = props
  const dispatch = useDispatch()
  const dashboard = useSelector((state: any) => state.dashboard)

  useEffect(() => {
    dispatch(getPayments(props.startDate, props.endDate, type))
  }, [props.startDate, props.endDate, dispatch, type])
  data[0].value = dashboard.payments.cash === 0 ? 0 : dashboard.payments.cash
  data[1].value =
    dashboard.payments.fonepay === 0 ? 0 : dashboard.payments.fonepay
  data[2].value = dashboard.payments.card === 0 ? 0 : dashboard.payments.card

  // data[0].value = '1'
  // data[1].value = '1'
  // data[2].value = '1'

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  // PIE CHART SECTOR CLICKED HANDLER
  const onSectorClickedHandler = (e: any) => {
    setPaymentMethod(e.name.toLowerCase())
  }

  return (
    <Box flexBox vertical>
      <Title style={{ fontSize: 16, color: colors.light.black200 }}>
        Payments
      </Title>
      <Box flexBox jSpace>
        {/* LEFT SECTION */}
        <Box flexBox>
          <Box flexBox alCenter columnGap={5}>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: data[0].color,
                display: 'block',
                borderRadius: 2,
              }}
            ></div>
            <Paragraph>Cash</Paragraph>
          </Box>

          <Box flexBox alCenter columnGap={5}>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: data[1].color,
                display: 'block',
                borderRadius: 2,
              }}
            ></div>
            <Paragraph>Fonepay</Paragraph>
          </Box>

          <Box flexBox alCenter columnGap={5}>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: data[2].color,
                display: 'block',
                borderRadius: 2,
              }}
            ></div>
            <Paragraph>Card</Paragraph>
          </Box>
        </Box>
      </Box>
      <Box flex={1} flexBox jCenter>
        <PieChart width={480} height={260}>
          <Pie
            activeIndex={activeIndex}
            activeShape={RenderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            onClick={onSectorClickedHandler}
          >
            {data.map((entry: any, id: number) => {
              return <Cell key={id} fill={entry.color} />
            })}
          </Pie>
        </PieChart>
      </Box>

      <Box>
        <PaymentListComponent
          startDate={props.startDate}
          endDate={props.endDate}
          type={type}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </Box>
    </Box>
  )
}

export const PieChartComponent = React.memo(PieChartComp)

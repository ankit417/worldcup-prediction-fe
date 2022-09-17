// import moment from 'moment'
// import { ChangeEvent, Dispatch } from 'react'
// import { MdCancel } from 'react-icons/md'
// // import { useDispatch } from 'react-redux'
// import { Modal } from 'react-uicomp'
// import { useFormInput } from 'use-form-input'
// import { colors } from '../../../../../../modules'

// import {
//   ActivityIndicator,
//   Box,
//   Button,
//   FormInput,
//   Grid,
//   InputField,
//   Title,
// } from '../../../../../common'

// // MARK: - AddGroupModal
// export const BookingInputFormModal = ({
//   visible,
//   setVisible,
//   onSubmit,
// }: {
//   visible: boolean
//   setVisible: Dispatch<React.SetStateAction<boolean>>
//   onSubmit: (arg: any) => void
// }) => {
//   //   const dispatch = useDispatch()

//   const [data, { setValue, onChange, clear }] = useFormInput({
//     name: '',
//     // startDate: '',
//     // endDate: '',
//     point: '',
//     isFinal: '',
//   })

//   const onSubmitHandler = (e: any) => {
//     e.preventDefault()
//     const { name, point, isFinal } = data
//     // const { name, startDate, endDate, point } = data
//     const requestBody = {
//       name,
//       //   startDate,
//       //   endDate,
//       point,
//       isFinal,
//     }

//     // dispatch({ type: AVAILABLE_ROOM_LIST.CLEAR })
//     onSubmit(requestBody)
//     clear()
//   }
//   return (
//     <Modal visible={visible}>
//       <Box flexBox alCenter jSpace style={{ width: '20vw' }}>
//         <Title size="small">Add Group</Title>
//         <Box
//           onClick={() => {
//             //   dispatch({ type: AVAILABLE_ROOM_LIST.CLEAR })
//             setVisible(false)
//           }}
//           style={{ cursor: 'pointer' }}
//         >
//           <MdCancel size={20} color={colors.light.red} />
//         </Box>
//       </Box>
//       <Box mt={20}>
//         <form onSubmit={onSubmitHandler}>
//           <Box flexBox>
//             <Box flex={2}>
//               <Box flexBox vertical rowGap={20}>
//                 <Grid.Container lg={1} md={2} sm={1}>
//                   <FormInput label="Name" required>
//                     <InputField
//                       placeholder="Name"
//                       name="name"
//                       value={data.name}
//                       onChange={onChange}
//                       type="text"
//                       required
//                     />
//                   </FormInput>
//                 </Grid.Container>

//                 {/* <Grid.Container lg={1} md={2} sm={1}>
//                   <FormInput label="Start date" required>
//                     <InputField
//                       placeholder="Start Date"
//                       name="startDate"
//                       type="date"
//                       value={moment(data.startDate).format('YYYY-MM-DD')}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                         setValue('startDate', e.target.value)
//                         moment(data.endDate).isBefore(e.target.value) &&
//                           setValue('endDate', e.target.value)
//                       }}
//                       min={moment().format('YYYY-MM-DD')}
//                     />
//                   </FormInput>
//                 </Grid.Container> */}
//                 {/* <Grid.Container lg={1} md={2} sm={1}>
//                   <FormInput label="End date" required>
//                     <InputField
//                       placeholder="End Date"
//                       name="endDate"
//                       type="date"
//                       value={moment(data.endDate).format('YYYY-MM-DD')}
//                       onChange={onChange}
//                       min={
//                         data.startDate
//                           ? moment(data.startDate)
//                               .add(1, 'days')
//                               .format('YYYY-MM-DD')
//                           : moment().format('YYYY-MM-DD')
//                       }
//                     />
//                   </FormInput>
//                 </Grid.Container> */}

//                 <Grid.Container lg={1} md={2} sm={1}>
//                   <FormInput label="Point per match">
//                     <InputField
//                       placeholder="Point per match"
//                       name="point"
//                       value={data.point}
//                       onChange={onChange}
//                       type="number"
//                     />
//                   </FormInput>
//                 </Grid.Container>

//                 {/* <Box style={{ height: 50 }} /> */}

//                 <Box flexBox jEnd alCenter>
//                   <ActivityIndicator animating={false}>
//                     <Button title="Submit" type="submit" />
//                   </ActivityIndicator>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>
//         </form>
//       </Box>
//     </Modal>
//   )
// }

export const Test = () => {
  return <div>Dummy</div>
}

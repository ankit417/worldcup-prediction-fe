import { SelectGame, SelectTeam } from '.'
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  group: any
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, group, ...other } = props
  // console.l
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index &&
        (group.user_select === 0 ? (
          <SelectGame groupId={group.id} />
        ) : (
          <SelectTeam groupId={group.id} />
        ))}
    </div>
  )
}

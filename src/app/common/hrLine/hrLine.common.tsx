interface HrLineProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number
}
const Hrline = ({ gap }: HrLineProps) => {
  return (
    <div
      className="hrLine"
      style={{ marginTop: gap ?? 5, marginBottom: gap ?? 5 }}
    />
  )
}

export { Hrline }

interface Props {
  progress: number;
}
export const ProgressBar : React.FC<Props> = ({progress}) => {
  const barStyle = {
    width: `${progress}%`
  }
  return (
      <div className="bar-holder">
        <div className="bar" style={barStyle}>
          {/* <span className="progress_text">{progress}</span> */}
        </div>
      </div>
  )
}